import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ProductProvider } from './components/ProductContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </QueryClientProvider>
  </StrictMode>
);
