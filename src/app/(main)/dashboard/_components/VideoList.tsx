"use client";
import { Button } from "@/components/ui/button";
import { useConvex } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { useAuthContext } from "@/app/provider";

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      GetUserVideoList();
    }
  }, [user]);

  const GetUserVideoList = async () => {
    const result = await convex.query(api.videoData.GetUserVideos, {
      userId: user?.id,
    });
    setVideoList(result);
  };

  return (
    <div>
      {videoList.length > 0 && (
        <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
          <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
          <h2 className="text-gray-400 text-lg">
            You dont have any video created. Create new one
          </h2>
          <Link href="/create-new-video">
            <Button>+ Create new video</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoList;
