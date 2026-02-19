import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Authentification from "./pages/Authentification";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Authentification loginMode={true} />} />
        <Route
          path="/signup"
          element={<Authentification loginMode={false} />}
        />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
