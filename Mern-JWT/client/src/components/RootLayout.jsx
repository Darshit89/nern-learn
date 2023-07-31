import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./ErrorBoundaryFallback";

function RootLayout() {
  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        // onError={logError}
        onReset={() => window.location.reload}
      >
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reset</button>
    </div>
  );
}

export default RootLayout;
