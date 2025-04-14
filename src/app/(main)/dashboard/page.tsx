import React from "react";
import VideoList from "./_components/VideoList";

const Dashboard = () => {
  return (
    <div>
      <h3 className="font-bold text-3xl">My Videos</h3>
      <VideoList />
    </div>
  );
};

export default Dashboard;
