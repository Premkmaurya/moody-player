import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Disc3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Player = () => {
  const audioRef = useRef(null);
  const { isPlaying, setIsPlaying, playersSong, skipSong } = useAuth();
  // Inside Player component
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, playersSong]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Handler for when the user moves the slider
  const handleSliderChange = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800/80 rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
      {/* Left: Big Image Circle */}
      <div className="relative shrink-0">
        <div
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-950 border-4 border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-[10s] ease-linear animate-[spin_10s_linear_infinite] will-change-transform ${!isPlaying ? "[animation-play-state:paused]" : ""}`}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <img
              src={playersSong?.coverImage}
              alt={playersSong?.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Center hole of the vinyl/record */}
          <div className="absolute w-8 h-8 bg-zinc-900 rounded-full border-2 border-zinc-800"></div>
        </div>
      </div>

      {/* Right: Info and Controls (Stacked vertically) */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 w-full">
        {/* Playback Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => skipSong("backward")}
            className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>

          <audio
            key={playersSong?.audioUrl}
            ref={audioRef}
            src={playersSong?.url}
            onTimeUpdate={handleTimeUpdate} // Link the progress
            onLoadedMetadata={handleLoadedMetadata} // Link the total length
            className="hidden"
          ></audio>

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

          <button
            onClick={() => skipSong("forward")}
            className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        {/* slider */}
        <div className="w-full flex flex-col gap-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-zinc-500 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
