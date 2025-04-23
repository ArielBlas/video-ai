"use client";
import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionComposition = ({ videoData }) => {
  const captions = videoData?.captionJson;
  const fps = useVideoConfig();
  const imageList = videoData?.images;
  const frame = useCurrentFrame();

  useEffect(() => {
    if (videoData) {
      getDurationFrame();
    }
  }, [videoData]);

  const getDurationFrame = () => {
    const totalDuration = captions[captions.length - 1]?.end * fps;
    // setDurationInFrame(totalDuration);
    return totalDuration;
  };

  const getCurrentCaption = () => {
    const currentTime = frame / 30;
    const currentCaption = captions?.find(
      (caption) => caption.start <= currentTime && caption.end >= currentTime
    );

    return currentCaption ? currentCaption.word : "";
  };

  return (
    <div>
      <AbsoluteFill>
        {imageList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList.length;
          const duration = getDurationFrame();

          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

          return (
            <>
              <Sequence
                key={index}
                from={startTime}
                durationInFrames={duration}
                name={`Image ${index}`}
              >
                <AbsoluteFill></AbsoluteFill>
                <Img
                  src={item}
                  alt="image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                  }}
                />
              </Sequence>
            </>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          bottom: 50,
          top: undefined,
          height: 150,
        }}
      >
        <h2>{getCurrentCaption()}</h2>
      </AbsoluteFill>

      {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
    </div>
  );
};

export default RemotionComposition;
