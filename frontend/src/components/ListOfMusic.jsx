import React, { useState } from "react";
import { Music2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ListOfMusic = () => {
  const { isPlaying, songs } = useAuth();



  return (
    <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800/80 rounded-[2rem] p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Music2 size={20} className="text-indigo-400" />
        <h3 className="font-bold text-lg text-zinc-200">Up Next</h3>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-2">
        {songs.map((item, index) => (
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
              <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover rounded-full" />
            </div>

            {/* Text Bars */}
            <div className="flex flex-col w-full">
              <div
                className={`w-full font-bold text-lg tracking-tighter`}
              >{item.title} </div>
              <div
                className={`w-full tracking-tighter`}
              >{item.artist} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfMusic;