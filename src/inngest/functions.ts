import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";

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
    const { script, topic, title, caption, videoStyle, voice } = event?.data;
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
    // Generate Images using AI
    // Save All Data to DB

    return GenerateCaptions;
  }
);
