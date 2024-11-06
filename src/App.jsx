// App.js
import { 
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from "./Pages/HomePage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import MainLayout from "./Layouts/MainLayout";

const queryClient = new QueryClient();

function App() {

  const addProduct = async (newJob) => {
    await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })
    .then(res => res.json())
    .then(console.log);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/confirm" element={<ConfirmationPage addProductSubmit={addProduct} />} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
