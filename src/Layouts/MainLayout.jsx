import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


//Boilerplate layout which is added to every page

export default function MainLayout() {
  return (
    <>
        <Outlet/>
        <ToastContainer/>
    </>
  )
}
