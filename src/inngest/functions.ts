import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "@/configs/AiModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 30 seconds video : script: {script}
  - Just Give specifing image prompt depends on the story line
  - do not give camera angle image prompt
  - Follow the following schema and return JSON data (Max 4-5 Images)
  - [
    {
      imagePrompt: ''
      sceneContent: '<Script Content>'
    }
  ]`;

export const helloWorld = inngest.createFunction(
  { id: "Hello World" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return {
      message: `Hello ${event.data.email}`,
    };
  }
);

const BASE_URL = "https://aigurulab.tech";

export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice, recordId } =
      event?.data;
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    // Generate Audio File MP3
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      const result = await axios.post(
        `${BASE_URL}/api/text-to-speech`,
        {
          input: script,
          voice: voice,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return result.data.audio;
    });

    // Generate Captions
    const GenerateCaptions = await step.run("generateCaptions", async () => {
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
      const { result, error } = deepgram.listen.prerecorded.transcribeUrl(
        {
          url: GenerateAudioFile,
        },
        {
          model: "nova-3",
        }
      );

      return result.results?.channels[0]?.alternatives[0]?.words;
    });

    // Generate Image Prompt from Script
    const GenerateImagePrompts = await step.run(
      "generateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script);
        const result = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const resp = JSON.parse(result.response.text());

        return resp;
      }
    );

    // Generate Images using AI
    const GenerateImages = await step.run("generateImages", async () => {
      let images = [];
      images = await Promise.all(
        GenerateImagePrompts.map(async (element) => {
          const result = await axios.post(
            `${BASE_URL}/api/generate-image`,
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl",
              aspectRatio: "1:1",
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          return result.data.image;
        })
      );

      return images;
    });

    // Save All Data to DB
    const UpdateDB = await step.run("updateDB", async () => {
      const result = await convex.mutation(api.videoData.UpdateVideoData, {
        recordId: recordId,
        audioUrl: GenerateAudioFile,
        captionJson: GenerateCaptions,
        images: GenerateImages,
      });

      return result;
    });

    const RenderVideo = await step.run("renderVideo", async () => {
      const services = await getServices({
        region: "us-east1",
        compatibleOnly: true,
      });

      const serviceName = services[0].serviceName;

      const result = await renderMediaOnCloudrun({
        serviceName,
        region: "us-east1",
        serveUrl: process.env.?.GCP_SERVE_URL,
        composition: "videoRender",
        inputProps: {},
        codec: "h264",
      });

      if (result.type === "success") {
        console.log(result.bucketName);
        console.log(result.renderId);
      }

      return result.publicUrl;
    });

    return "Executed Successfully!";
  }
);
