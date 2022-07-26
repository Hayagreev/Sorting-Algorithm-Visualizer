import React from "react";
import SortingVis from "./SortingVis/SortingVis.jsx";
import Navbar from "./Navbar.jsx";
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
