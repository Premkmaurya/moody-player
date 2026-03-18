import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const EmotionDetector = () => {
  const videoRef = useRef();
  const canvasRef = useRef(null);
  const { fetchSong } = useAuth();

  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    loadModels();
    startVideo();
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;

      videoRef.current.onplay = () => {
        console.log("Video started");
      };
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const startDetection = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    faceapi.matchDimensions(canvas, displaySize);
    // 🔴 HARD GUARD (most important)
      if (!video || video.readyState !== 4 || video.videoWidth === 0) return;

      const moodCounts = {};
      try {
        for (let i = 0; i < 10; i++) {
          const detections = await faceapi
            .detectAllFaces(
              video,
              new faceapi.TinyFaceDetectorOptions({
                inputSize: 160,
                scoreThreshold: 0.5,
              }),
            )
            .withFaceExpressions();

          if (detections.length > 0) {
            const expressions = detections[0].expressions;

            const mood = Object.keys(expressions).reduce((a, b) =>
              expressions[a] > expressions[b] ? a : b,
            );

            moodCounts[mood] = (moodCounts[mood] || 0) + 1;
          }

          // small delay between frames
          await new Promise((res) => setTimeout(res, 150));
        }

        // 🔥 find most frequent mood
        const finalMood = Object.keys(moodCounts).reduce((a, b) =>
          moodCounts[a] > moodCounts[b] ? a : b,
        );

        console.log("Final Mood:", finalMood);

        await fetchSong(finalMood);
      } catch {
        console.log("skip frame");
      }
  };

  return (
    <>
      <div className="relative bg-zinc-900 border border-zinc-800/80 rounded-4xl min-h-[250px] flex flex-col items-center justify-center overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          className="w-full h-[50vh] object-cover"
          autoPlay
          muted
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* Detect Button (Positioned bottom right just like the sketch) */}
        <button
          onClick={startDetection}
          disabled={isDetecting}
          className={`absolute bottom-6 right-6 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 z-20 ${
            isDetecting
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
          }`}
        >
          {isDetecting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Analyzing
            </>
          ) : (
            "detect"
          )}
        </button>
      </div>
    </>
  );
};

export default EmotionDetector;
