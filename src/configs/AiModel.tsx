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

//   const result = await chatSession.sendMessage("");
