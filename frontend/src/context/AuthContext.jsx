import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playersSong, setPlayersSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [mood, setMood] = useState(null);

  // For navigation after login/logout
  const navigate = useNavigate();

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/profile",
        {
          withCredentials: true, // Include cookies for authentication
        },
      );

      setUser(response.data);
    } catch (err) {
      //   console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials,
        {
          withCredentials: true, // Include cookies
        },
      );

      setUser(response.data);
      console.log(response.data);
      navigate("/");
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData,
        {
          withCredentials: true, // Include cookies
        },
      );

      setUser(response.data);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true, // Include cookies
        },
      );

      setUser(null);
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const addSong = async (songData) => {
    try {
      await axios.post("http://localhost:3000/api/songs/add", songData, {
        withCredentials: true, // Include cookies for authentication
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to add song" };
    }
  };

  const fetchSong = async (mood) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/songs/get",
        {
          params: { mood },
          withCredentials: true, // Include cookies for authentication
        },
      );
      setSongs(response.data);
    } catch (error) {
      return console.log(error);
    }
  };

  const skipSong = (direction) => {
    if (songs.length === 0) return;

    // 1. Find current index
    const currentIndex = songs.findIndex((s) => s._id === playersSong?._id);

    // 2. Calculate next index (with wrap-around logic)
    let nextIndex;
    if (direction === "forward") {
      nextIndex = (currentIndex + 1) % songs.length;
    } else {
      nextIndex = (currentIndex - 1 + songs.length) % songs.length;
    }

    const nextSong = songs[nextIndex];

    // 3. Update active state in the list (for UI consistency)
    const updatedSongs = songs.map((song, index) => ({
      ...song,
      active: index === nextIndex,
    }));

    setSongs(updatedSongs);
    setPlayersSong(nextSong);
    setIsPlaying(true); // Auto-play the next song
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isPlaying,
    setIsPlaying,
    playersSong,
    setPlayersSong,
    songs,
    setSongs,
    addSong,
    fetchSong,
    skipSong,
    mood,
    setMood,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
