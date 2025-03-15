import { Router } from "express";
import * as controllerLeveldata from "../controllers/controllersLevelData";
const routerLevelData: Router = Router();

routerLevelData.get("/stages", controllerLeveldata.getStages);
routerLevelData.get("/basic/:stage", controllerLeveldata.getBasicStage);

export default routerLevelData;
