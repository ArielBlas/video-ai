"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import axios from "axios";

const sugesstions = [
  "Historic Story",
  "Kids Story",
  "Movie Stories",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "Tech Breakthroughs",
  "True Crime Stories",
  "Fantasy Adventures",
  "Science Experiments",
  "Motivational Stories",
];

interface TopicProps {
  onHandleInputChange: (field: string, value: string) => void;
}

const Topic = ({ onHandleInputChange }: TopicProps) => {
  const [selectedTopic, setSelectedTopic] = useState();
  const [selectedScriptIndex, setSelectedScriptIndex] = useState();
  const [scripts, setScripts] = useState();
  const [loading, setLoading] = useState(false);

  const GenerateScript = async () => {
    setLoading(true);
    setSelectedScriptIndex(null);
    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectedTopic,
      });
      setScripts(result.data.scripts);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-1">Project Title</h2>
      <Input placeholder="Enter project title" />

      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">Select topic for your video</p>

        <Tabs defaultValue="sugesstion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="sugesstion">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="sugesstion">
            <div className="flex flex-wrap gap-2">
              {sugesstions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`${selectedTopic === suggestion ? "bg-secondary" : ""}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Enter your topic"
                onChange={(event) =>
                  onHandleInputChange("topic", event.target.value)
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        {scripts.length > 0 && (
          <div className="mt-3">
            <h2>Select the Script</h2>
            <div className="grid grid-cols-2 gap-5 mt-1">
              {scripts.map((items, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer ${selectedScriptIndex === index ? "border-white bg-secondary" : ""}`}
                  onClick={() => {
                    setSelectedScriptIndex(index);
                    onHandleInputChange("script", items.content);
                  }}
                >
                  <p className="line-clamp-4 text-sm text-gray-300">
                    {items.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!scripts && (
        <Button
          className="mt-3"
          size="sm"
          disabled={loading}
          onClick={GenerateScript}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SparklesIcon />
          )}
          Generate Script
        </Button>
      )}
    </div>
  );
};

export default Topic;
