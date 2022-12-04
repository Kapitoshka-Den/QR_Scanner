import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Headers/Header";
import Navbar from "./Components/Headers/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import QrScanner from "./Pages/QrScanner/QrScanner";
import QrGenerator from "./Pages/QrGenerator/QrGenerator";

function App() {
  return (
    <>
      <Navbar />
      <div className="App"></div>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/qrscanner" element={<QrScanner/>}/>
        <Route path="/qrgenerate" element={<QrGenerator/>}/>
      </Routes>
    </>
  );
}

export default App;
