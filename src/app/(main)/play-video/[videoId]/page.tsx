import React from "react";
import RemotionPlayer from "../_components/RemotionPlayer";
import VideoInfo from "../_components/VideoInfo";

const PlayVideo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        {/* Remotion Player */}
        <RemotionPlayer />
      </div>
      <div>
        {/* Video Information  */}
        <VideoInfo />
      </div>
    </div>
  );
};

export default PlayVideo;
