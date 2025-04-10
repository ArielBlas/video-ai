import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GENERATE_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `
                Write a two different script for 30 seconds video on Topic: Kids Story,
                * Do not add Scene Description
                * Do not add Anything in Braces. Just return the plain story in text
                * Give me response in JSON format and follow the schema
                {
                    scripts: [
                        {
                            content: "string",
                        }
                    ]
                }
            `,
        },
      ],
    },
  ],
});

export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `
                Generate Image prompt of {style} style with all details for each scene for 30 seconds video : script: {script}
                - Just Give specifing image prompt depends on the story line
                - do not give camera angle image prompt
                - Follow the following schema and return JSON data (Max 4-5 Images)
                [
                  {
                    imagePrompt: ''
                    sceneContent: '<Script Content>'
                  }
                ]
            `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `
                {
                  imagePrompt: ''
                  sceneContent: '<Script Content>'
                }
            `,
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("");
