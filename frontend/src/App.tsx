import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Authentification from "./pages/Authentification";
import { RootRedirect } from "./routes/RootRedirect";
import { PublicOnlyRoute } from "./routes/PublicOnlyRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Authentification loginMode={true} />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Authentification loginMode={false} />
            </PublicOnlyRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
