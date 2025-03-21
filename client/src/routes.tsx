import App from "./App";
import type { RouteObject } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import About from "./routes/About";
import Stages from "./routes/Stages";
import LevelFramework from "./components/LevelFramework";
import Scoreboards from "./routes/Scoreboards";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "About", element: <About /> },
      {
        path: "Stages",
        children: [
          {
            index: true,
            element: <Stages />,
          },
          { path: ":stage", element: <LevelFramework /> },
        ],
      },
      { path: "Scoreboards", element: <Scoreboards /> },
    ],
  },
];

export default routes;
