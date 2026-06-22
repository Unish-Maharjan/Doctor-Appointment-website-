import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./pages/Services";

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
  ]);

  return (
  <RouterProvider router={router} />
  )
  ;
}

export default App;