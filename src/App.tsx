import React from "react";
import { Route, Routes } from "react-router-dom";
import { ColonyClientProvider } from "./providers/ColonyClientProvider/ColonyClientProvider";
import { Events } from "./screens/Events/Events";

function App() {
  return (
    <div>
      <ColonyClientProvider>
        <Routes>
          <Route path="/" element={<Events />} />
        </Routes>
      </ColonyClientProvider>
    </div>
  );
}

export default App;
