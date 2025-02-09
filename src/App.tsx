import ErrorBoundary from './components/ErrorBoundary.tsx';

import FallbackPage from './components/UI/FallbackPage.tsx';
import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
const App = () => {
  return (
    <ErrorBoundary fallback={<FallbackPage />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
