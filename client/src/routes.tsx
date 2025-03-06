import App from "./App";
import type { RouteObject } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import About from "./routes/About";
import Stages from "./routes/Stages";
import Level_1 from "./routes/levels/Level_1";
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
        element: <Stages />,
        children: [{ path: "level_1", element: <Level_1 /> }],
      },
    ],
  },
];

export default routes;
