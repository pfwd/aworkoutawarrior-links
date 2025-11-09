import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SponsorPage from "./components/SponsorPage";
import FundraisingPage from "./components/FundraisingPage";
import EventDetailPage from "./components/EventDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/fundraising" element={<FundraisingPage />} />
        <Route path="/fundraising/:eventId" element={<EventDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
