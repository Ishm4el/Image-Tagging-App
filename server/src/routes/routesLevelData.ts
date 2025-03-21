import { Router } from "express";
import * as controllerLeveldata from "../controllers/controllersLevelData";
const routerLevelData: Router = Router();

routerLevelData.get("/stages", controllerLeveldata.getStages);
routerLevelData.get("/only_stages", controllerLeveldata.getStagesOnly);
routerLevelData.get("/basic/:stage", controllerLeveldata.getBasicStage);
routerLevelData.get(
  "/scoreboard/:stage",
  controllerLeveldata.getStageScoreboard
);

export default routerLevelData;
