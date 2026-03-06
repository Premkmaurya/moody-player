import React, { useState } from "react";
import { Music2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ListOfMusic = () => {
  const playlist = [
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: true }, // The 3rd item is highlighted in your sketch!
    { id: 4, active: false },
    { id: 5, active: false },
  ];
  const { isPlaying } = useAuth();
  return (
    <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800/80 rounded-[2rem] p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Music2 size={20} className="text-indigo-400" />
        <h3 className="font-bold text-lg text-zinc-200">Up Next</h3>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-2">
        {playlist.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 group
                  ${
                    item.active
                      ? "bg-zinc-800 border border-zinc-700 shadow-lg"
                      : "bg-transparent border border-transparent hover:bg-zinc-800/50"
                  }`}
          >
            {/* Avatar Circle */}
            <div
              className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center transition-colors
                  ${item.active ? "bg-indigo-500" : "bg-zinc-800 group-hover:bg-zinc-700"}
                `}
            >
              {item.active && isPlaying ? (
                <div className="w-4 h-4 bg-white rounded-sm animate-pulse"></div> // Fake EQ box
              ) : null}
            </div>

            {/* Text Bars */}
            <div className="flex flex-col gap-2 flex-1">
              <div
                className={`h-3 rounded-full ${item.active ? "bg-zinc-300 w-[80%]" : "bg-zinc-600 w-[70%]"}`}
              ></div>
              <div
                className={`h-2 rounded-full ${item.active ? "bg-zinc-500 w-[50%]" : "bg-zinc-700 w-[40%]"}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfMusic;
