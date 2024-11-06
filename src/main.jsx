// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ProductContextProvider } from './ProductContext'; // Import ProductContext

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </StrictMode>
);
