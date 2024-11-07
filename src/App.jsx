// src/App.js
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from './Pages/HomePage';
import ConfirmationPage from './Pages/ConfirmationPage';
import MainLayout from './Layouts/MainLayout';
import { ProductProvider } from './components/ProductContext';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} /> {/* HomePage Route */}
        <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Confirmation Route */}
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;
