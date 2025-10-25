import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { LocationProvider } from "./context/LocationContext";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import Topluluk from "./pages/Topluluk";
import "./assets/styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <LocationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/topluluk" element={<Topluluk />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
