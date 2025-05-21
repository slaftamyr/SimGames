import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import XO from "./components/gamesPages/XO";
import Safrgt from "./components/gamesPages/Safrgt";
 
import RPS from "./components/gamesPages/RPS";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/xo" element={<XO />} />
        <Route path="/safrgt" element={<Safrgt />} />
     
        <Route path="/RPS" element={<RPS />} />
      </Routes>
    </Router>
  );
}

export default App;
