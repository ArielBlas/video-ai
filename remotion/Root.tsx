import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import RemotionComposition from "./../src/app/_components/RemotionComposition";

const videoData = {
  audioUrl: "",
  captionJson: {},
  images: [],
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="videoRender"
        component={RemotionComposition}
        durationInFrames={Number(
          (
            videoData?.captionJson[videoData?.captionJson.length - 1]?.end * 30
          ).toFixed(0)
        )}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          videoData: videoData,
        }}
      />
    </>
  );
};
