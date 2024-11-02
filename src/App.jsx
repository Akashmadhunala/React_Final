import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom"

import HomePage from "./Pages/HomePage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import MainLayout from "./Layouts/MainLayout";

function App() {

  const addProduct=async(newJob)=>{
    const res=await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })
    .then(res => res.json())
    .then(console.log);
  }

  const router=createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path="/confirm" element={<ConfirmationPage addProductSubmit={addProduct} />}/>
    </Route>
    )
  );  
  
  return <RouterProvider router={router}/>
}

export default App;
