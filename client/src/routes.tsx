import App from "./App";
import type { RouteObject } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import About from "./routes/About";
import Stages from "./routes/Stages";
import Level_1 from "./routes/levels/Level_1";
type Highscore = `${string & { __brand: "\\d{2}:\\d{2}:\\d{2}" }}`;
type CardLevelDescriptionProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  href: string;
  thumbnailLink: string;
  highscore: Highscore;
};
const stagesLevelsArray: Array<CardLevelDescriptionProps> = [
  {
    difficulty: "Easy",
    href: "Level_1",
    title: "Level 1",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00" as Highscore,
  },
  {
    difficulty: "Easy" as "Easy",
    href: "Level_1",
    title: "Level 1",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00" as Highscore,
  },
  {
    difficulty: "Easy" as "Easy",
    href: "Level_1",
    title: "Level 1",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00" as Highscore,
  },
  {
    difficulty: "Easy" as "Easy",
    href: "Level_1",
    title: "Level 1",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00" as Highscore,
  },
  {
    difficulty: "Easy" as "Easy",
    href: "Level_1",
    title: "Level 1",
    thumbnailLink: "A_Thumbnail_Link",
    highscore: "00:00:00" as Highscore,
  },
];

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
