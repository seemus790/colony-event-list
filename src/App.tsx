import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ColonyClientProvider } from "./providers/ColonyClientProvider/ColonyClientProvider";
import { EventsList } from "./screens/EventsList/EventsList";

const App: FC = () => {
  return (
    <div>
      <ColonyClientProvider>
        <Suspense fallback="Loading">
          <Routes>
            <Route path="/" element={<EventsList />} />
          </Routes>
        </Suspense>
      </ColonyClientProvider>
    </div>
  );
};

export default App;
