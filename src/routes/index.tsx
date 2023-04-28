import { createBrowserRouter } from "react-router-dom";
import { Register } from "components/auth/Register";
import { Login } from "components/auth/Login";
import { Layout } from "components/Layout";
import * as UI_ROUTES from "./constants";
import { Dashboard } from "components/Dashboard";
import { Comments } from "components/Comments";
import { Profile } from "components/Profile";
import { Users } from "components/Users";

export const router = createBrowserRouter([
  { path: UI_ROUTES.ROOT, element: <Login /> },
  { path: UI_ROUTES.REGISTER, element: <Register /> },
  { path: UI_ROUTES.LOGIN, element: <Login /> },
  {
    path: UI_ROUTES.PROTECTED,
    element: <Layout />,
    children: [
      {
        path: UI_ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: UI_ROUTES.USERS,
        element: <Users />,
      },
      {
        path: UI_ROUTES.PROFILE,
        element: <Profile />,
      },
      {
        path: UI_ROUTES.COMMENTS,
        element: <Comments />,
      },
    ],
  },
]);
