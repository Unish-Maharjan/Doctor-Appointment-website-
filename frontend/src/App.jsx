import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import DoctorsPage from "./pages/DoctorsPage";
import Contact from "./pages/Contact";
import NewsPage from "./pages/Newspage";
import Appointment from "./pages/Appointment";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header/><Home/><Footer/></>,
    },
    {
      path: "/home",
      element: <><Header/><Home/><Footer/></>,
    },
    {
      path: "/about",
      element: <><Header/><About/><Footer/></>,
    },
    {
      path: "/services",
      element: <><Header/><Services/><Footer/></>,
    },
    {
      path: "/doctors",
      element: <><Header/><DoctorsPage/><Footer/></>,
    },
    {
      path: "/contact",
      element: <><Header/><Contact/><Footer/></>,
    },
    {
      path: "/news",
      element: <><Header/><NewsPage/><Footer/></>,
    },
    {
      path: "/appointment",
      element: <><Header/><Appointment/><Footer/></>,
    },
    {
      path: "/signin",
      element: <><Header/><Signup/><Footer/></>,
    },
  ]);

  return (
  <RouterProvider router={router} />
  )
  ;
}

export default App;