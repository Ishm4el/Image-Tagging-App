import { Router } from "express";
import * as controllerTaggingGame from "../controllers/controllersTaggingGame";

const routerTaggingGame: Router = Router();

// routerTaggingGame.get("start_time", );
// routerTaggingGame.get("validate_completion", );

routerTaggingGame.post("/confirm_coord", controllerTaggingGame.confirmCoord);
routerTaggingGame.post("/confirm_victory", controllerTaggingGame.confirmVictory)

export default routerTaggingGame;
