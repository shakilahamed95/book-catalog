import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Allbooks from "../pages/Allbooks";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/all-books",
    element: <Allbooks />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
