export function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h3>{error.message}</h3>
      <pre>{error.stack}</pre>
    </div>
  );
}
