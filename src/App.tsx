import React, { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ColonyClientProvider } from "./providers/ColonyClientProvider/ColonyClientProvider";
import { EventsList } from "./screens/EventsList/EventsList";

const ErrorScreen = () => <span>Error</span>;

const LoadingScreen = () => <span>Loading</span>;

const App: FC = () => (
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <ColonyClientProvider>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<EventsList />} />
        </Routes>
      </Suspense>
    </ColonyClientProvider>
  </ErrorBoundary>
);

export default App;
