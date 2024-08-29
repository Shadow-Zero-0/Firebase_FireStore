import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import Signup from "./pages/sign-up";
import Signin from "./pages//sign-in";
import About from "./pages/About";
import Error from './pages/error';
import Mission from "./pages/Mission";
import Forgetpassword from './pages/Forgetpassword';
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./datadarkmode";
import Firsttask from './pages/firsttask';
import './i18n';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  }, {
    path: "/Firsttask/:id",
    element: <Firsttask />,
  },
  {
    path: "/Forgetpassword",
    element: <Forgetpassword />,
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
  {
    path: "/Mission",
    element: <Mission />,
  },
  {
    path: "/About",
    element: <About />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <React.StrictMode>
      <ThemeProvider>
      <HelmetProvider>
           <RouterProvider router={router} />
      </HelmetProvider>
     
      </ThemeProvider>
  </React.StrictMode>

  
);

reportWebVitals();
