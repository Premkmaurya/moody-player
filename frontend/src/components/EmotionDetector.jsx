import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

import { Loader2, ScanFace } from "lucide-react";

const EmotionDetector = () => {
  const videoRef = useRef();

  const [isDetecting, setIsDetecting] = useState(false);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
      "/models/tiny_face_detector",
    );
    await faceapi.nets.faceExpressionNet.loadFromUri("/models/face_expression");
  };

  const detectEmotion = () => {
    setIsDetecting(true);
    setMood(null);
    async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        console.log("Detected Expressions:", expressions);

        const mood = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b,
        );

        setIsDetecting(false);
        setMood(mood);
        console.log("User Mood:", mood);
      }
    };
  };

  return (
    <>
      <div className="relative bg-zinc-900 border border-zinc-800/80 rounded-[2rem] p-6 min-h-[350px] flex flex-col items-center justify-center overflow-hidden shadow-xl">
        <video ref={videoRef} autoPlay muted width="400" height="300" />
        {/* Detect Button (Positioned bottom right just like the sketch) */}
        <button
          onClick={detectEmotion}
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
