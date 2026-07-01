import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDetail from "./pages/DoctorDetail";
import Contact from "./pages/Contact";
import NewsPage from "./pages/Newspage";
import NewsDetail from "./pages/NewsDetail";
import Appointment from "./pages/Appointment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admindashboard";
import Adminroute from "./components/Adminroute";

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
      path: "/doctors/:id",
      element: <><Header/><DoctorDetail/><Footer/></>,
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
      path: "/news/:id",
      element: <><Header/><NewsDetail/><Footer/></>,
    },
    {
      path: "/appointment",
      element: <><Header/><Appointment/><Footer/></>,
    },
    {
      path: "/signup",
      element: <><Header/><Signup/><Footer/></>,
    },
    {
      path: "/login",
      element: <><Header/><Login/><Footer/></>,
    },
    {
      path: "/dashboard",
      element: (
        <Adminroute>
          <AdminDashboard/>
        </Adminroute>
      ),
    }
  ]);

  return (
  <RouterProvider router={router} />
  )
  ;
}

export default App;