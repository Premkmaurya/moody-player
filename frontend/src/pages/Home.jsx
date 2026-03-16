import React, { useState } from "react";
import EmotionDetector from "../components/EmotionDetector";
import ListOfMusic from "../components/ListOfMusic";
import Player from "../components/Player";
import { Menu, X } from "lucide-react"; // Using Lucide for icons

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 flex items-center justify-center font-sans text-zinc-100 overflow-x-hidden">
      {/* 1. Hamburger / Close Button (Mobile Only) */}
      <button
        onClick={toggleMenu}
        className="fixed top-5 right-5 z-50 p-2 rounded-md lg:hidden"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* 2. Main Content Area */}
        <div
          className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-300 ${
            isMenuOpen
              ? "blur-md -translate-x-10 scale-[0.98] lg:blur-none lg:translate-x-0 lg:scale-100"
              : ""
          }`}
        >
          <EmotionDetector />
          <Player />
        </div>

        {/* 3. Responsive ListOfMusic Sidebar */}
        <div
          className={`
          /* Mobile Styles */
          fixed top-0 right-0 h-full w-80 bg-zinc-900/95 backdrop-blur-xl z-40 p-6 transform transition-transform duration-300 ease-in-out shadow-2xl
          /* Desktop Styles */
          lg:static lg:w-full lg:h-auto lg:bg-transparent lg:p-0 lg:translate-x-0 lg:shadow-none
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <ListOfMusic />
        </div>

        {/* 4. Background Overlay (Optional: closes menu when clicking outside) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </div>
    </div>
  );
};

export default Home;