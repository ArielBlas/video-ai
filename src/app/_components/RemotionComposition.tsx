import React, { useEffect } from "react";
import { useVideoConfig } from "remotion";

const RemotionComposition = ({ videoData, setDurationInFrame }) => {
  const captions = videoData?.captionJson;

  const fps = useVideoConfig();

  useEffect(() => {
    if (videoData) {
      getDurationFrame();
    }
  }, [videoData]);

  const getDurationFrame = () => {
    const totalDuration = captions[captions.length - 1]?.end * fps;
    setDurationInFrame(totalDuration);
  };

  return <div>RemotionComposition</div>;
};

export default RemotionComposition;
