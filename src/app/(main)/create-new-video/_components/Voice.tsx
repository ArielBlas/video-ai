import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const voiceOptions = [
  {
    value: "af_sarah",
    name: "🇺🇸 Sarah (Female)",
  },
  {
    value: "af_sky",
    name: "🇺🇸 Sky (Female)",
  },
  {
    value: "am_adam",
    name: "🇺🇸 Adam (Male)",
  },
  {
    value: "am_echo",
    name: "🇺🇸 Echo (Male)",
  },
  {
    value: "am_eric",
    name: "🇺🇸 Eric (Male)",
  },
  {
    value: "am_fenrir",
    name: "🇺🇸 Fenrir (Male)",
  },
  {
    value: "am_liam",
    name: "🇺🇸 Liam (Male)",
  },
  {
    value: "am_michael",
    name: "🇺🇸 Michael (Male)",
  },
  {
    value: "am_onyx",
    name: "🇺🇸 Onyx (Male)",
  },
];

interface VoiceProps {
  onHandleInputChange: (fieldName: string, fieldValue: string) => void;
}

const Voice = ({ onHandleInputChange }: VoiceProps) => {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  return (
    <div className="mt-5">
      <h2>Video Voice</h2>
      <p className="text-sm text-gray-400">Select voice for your video</p>

      <ScrollArea className="h-[150px] w-full">
        <div className="grid grid-cols-2 gap-3">
          {voiceOptions.map((voice, index) => (
            <h2
              className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white rounded-lg hover:border ${selectedVoice === voice.name ? "border" : ""}`}
              onClick={() => {
                setSelectedVoice(voice.name);
                onHandleInputChange("voice", voice.name);
              }}
              key={index}
            >
              {voice.name}
            </h2>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Voice;
