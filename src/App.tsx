import React from "react";
import { Route, Routes } from "react-router-dom";
import { Events } from "./screens/Events/Events";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
