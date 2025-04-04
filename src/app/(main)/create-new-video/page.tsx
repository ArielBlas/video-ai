"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState<Record<string, string>>();

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div>
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-auto">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />

          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />

          {/* Voice */}
          <Voice onHandleInputChange={onHandleInputChange} />

          {/* Captions */}
          <Captions onHandleInputChange={onHandleInputChange} />

          <Button className="w-full mt-5">
            <WandSparkles /> Generate Video
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
