import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddSong from "../pages/AddSong";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-song" element={<AddSong />} />
    </Routes>
  );
};

export default AppRoute;
