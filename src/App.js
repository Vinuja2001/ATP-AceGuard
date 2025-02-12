import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TennisCoach from "./components/tennisCoach";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import Navbar from "./components/navbar";

function App() {
  return (
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<TennisCoach />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
