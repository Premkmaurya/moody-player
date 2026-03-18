import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const EmotionDetector = () => {
  const videoRef = useRef();
  const canvasRef = useRef(null);
  const { setMood, fetchSong } = useAuth();

  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
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

    startVideo();

    faceapi.matchDimensions(canvas, displaySize);

    // 🔴 HARD GUARD (most important)
    if (
      !video ||
      video.readyState !== 4 ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    )
      return;

    try {
      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 224, // 🔥 reduce size = more stable
            scoreThreshold: 0.5,
          }),
        )
        .withFaceExpressions();

      // 🔴 EXTRA SAFETY (skip broken detections)
      if (!detections || !detections.length) return;

      if (!detections[0].detection || !detections[0].detection.box) return;

      if (detections && detections.length > 0) {
        const expressions = detections[0].expressions;

        // Find the expression with the highest confidence score
        const mood = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b,
        );

        console.log("Detected mood:", mood);
      }

      const resized = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);
    } catch (err) {
      // 🔴 THIS LINE SAVES YOUR APP
      console.log("⚠️ skipped bad frame");
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
