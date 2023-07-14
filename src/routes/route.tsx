import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Allbooks from "../pages/Allbooks";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import App from "../App";
import SingleBookPage from "../pages/SingleBookPage";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <Allbooks />,
      },
      {
        path: "/book-details/:id",
        element: <SingleBookPage />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "/add-new-book",
        element: <AddBook />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
