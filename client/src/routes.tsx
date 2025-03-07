import App from "./App";
import stagesLevelsArray from "./levelsConfig";
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
        children: [
          {
            index: true,
            element: <Stages levels={stagesLevelsArray} />,
          },
          { path: "Level_1", element: <Level_1 /> },
        ],
      },
    ],
  },
];

export default routes;
