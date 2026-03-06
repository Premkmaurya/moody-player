import React,{useState} from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Disc3,
} from "lucide-react";

const Player = () => {
      const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="bg-zinc-900 border border-zinc-800/80 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
      {/* Left: Big Image Circle */}
      <div className="relative shrink-0">
        <div
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-950 border-4 border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-[10s] ease-linear ${isPlaying ? "animate-[spin_10s_linear_infinite]" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"></div>
          <Disc3 size={48} className="text-zinc-700" />
          {/* Center hole of the vinyl/record */}
          <div className="absolute w-8 h-8 bg-zinc-900 rounded-full border-2 border-zinc-800"></div>
        </div>
      </div>

      {/* Right: Info and Controls (Stacked vertically) */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 w-full">
        {/* Fake Text Bars (Equalizer/Track Info) */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
          <div className="w-full h-4 bg-zinc-700 rounded-full"></div>
          <div className="w-[80%] h-3 bg-zinc-800 rounded-full"></div>
          <div className="w-[60%] h-2 bg-zinc-800/50 rounded-full"></div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-6">
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <SkipBack size={24} fill="currentColor" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
