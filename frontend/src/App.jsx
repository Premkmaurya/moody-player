import React from "react";
import AppRoute from "./routes/AppRoute";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <AppRoute />
    </>
  );
};

export default App;
