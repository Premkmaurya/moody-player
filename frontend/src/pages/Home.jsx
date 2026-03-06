import React from "react";
import EmotionDetector from "../components/EmotionDetector";
import ListOfMusic from "../components/ListOfMusic";
import Player from "../components/Player";

const Home = () => {
  // Dummy playlist data based on your wireframe

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 flex items-center justify-center font-sans text-zinc-100">
      {/* Main Container - Max width controls how wide it gets on huge screens */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* TOP LEFT: Video / Detection Area */}
          <EmotionDetector />

          {/* BOTTOM LEFT: Player Area */}
          <Player />
        </div>
        <ListOfMusic />
      </div>
    </div>
  );
};

export default Home;
