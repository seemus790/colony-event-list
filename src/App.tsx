import React from "react";
import { Route, Routes } from "react-router-dom";
import { ColonyClientProvider } from "./providers/ColonyClientProvider/ColonyClientProvider";
import { EventsList } from "./screens/EventsList/EventsList";

function App() {
  return (
    <div>
      <ColonyClientProvider>
        <Routes>
          <Route path="/" element={<EventsList />} />
        </Routes>
      </ColonyClientProvider>
    </div>
  );
}

export default App;
