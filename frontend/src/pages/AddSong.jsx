import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Music,
  Image as ImageIcon,
  Link2,
  FileText,
  User,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AddSong() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      title: "",
      artist: "",
      category: "",
      coverImage: "",
      songUrl: "",
      lyrics: "",
    },
  });

  // track selected category for styling
  const selectedCategory = watch("category");

  const categories = [
    {
      id: "happy",
      label: "Happy 😊",
      color: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
    },
    {
      id: "sad",
      label: "Sad 🌧️",
      color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    },
    {
      id: "angry",
      label: "Angry 🔥",
      color: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
    },
    {
      id: "excited",
      label: "Excited ✨",
      color:
        "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
    },
  ];

  const handleCategorySelect = (categoryId) => {
    setValue("category", categoryId, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Song Data Submitted:", data);
      setIsSubmitting(false);
      setSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        reset();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans text-slate-900">
      <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#0A1931] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Music size={200} />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <Sparkles className="text-indigo-300" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Upload Track
              </h1>
              <p className="text-slate-400 mt-1">
                Add a new song to your artist profile.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex flex-col gap-8"
        >
          {/* Grid for side-by-side inputs on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Music size={16} className="text-slate-400" /> Track Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="e.g. Midnight City"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1931]/20 focus:border-[#0A1931] transition-all"
              />
            </div>

            {/* Artist Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-slate-400" /> Artist Name
              </label>
              <input
                type="text"
                {...register("artist", { required: true })}
                placeholder="e.g. M83"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1931]/20 focus:border-[#0A1931] transition-all"
              />
            </div>
          </div>

          {/* Mood Category Selector */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">
              Mood / Category
            </label>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 
                    ${
                      selectedCategory === cat.id
                        ? `${cat.color} ring-2 ring-offset-2 ring-${cat.color.split("-")[1]}-400 scale-105 shadow-sm`
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {/* include a hidden input registered for validation */}
            <input
              type="hidden"
              {...register("category", { required: true })}
            />
          </div>

          {/* Grid for cover image and song URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-slate-400" /> Cover Image
                URL
              </label>
              <input
                type="url"
                {...register("coverImage", { required: true })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1931]/20 focus:border-[#0A1931] transition-all"
              />
            </div>

            {/* Song URL */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Link2 size={16} className="text-slate-400" /> Song Audio URL
              </label>
              <input
                type="url"
                {...register("songUrl", { required: true })}
                placeholder="https://example.com/audio.mp3"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1931]/20 focus:border-[#0A1931] transition-all"
              />
            </div>
          </div>

          {/* Lyrics Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" /> Lyrics
            </label>
            <textarea
              rows="5"
              placeholder="Enter track lyrics here..."
              {...register("lyrics")}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1931]/20 focus:border-[#0A1931] transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || success}
              className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center gap-2
                ${success ? "bg-emerald-500" : "bg-[#0A1931] hover:bg-slate-800 active:scale-95"}
                ${isSubmitting ? "opacity-80 cursor-wait" : ""}
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving Track...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={20} />
                  Added Successfully!
                </>
              ) : (
                "Add Song to Library"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
