import React from "react";
import SortingVis from "./SortingVis/SortingVis";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <SortingVis></SortingVis>      
    </div>
  );
}

export default App;
