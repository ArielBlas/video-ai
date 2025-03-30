"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

const Topic = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
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
                  onClick={() => setSelectedTopic(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea placeholder="Enter your topic" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Topic;
