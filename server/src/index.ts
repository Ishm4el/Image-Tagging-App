import express, { Express, Request, Response } from "express";
import dotevn from "dotenv";
import cors from "cors";
import routerLevelData from "./routes/routesLevelData";
import routerTaggingGame from "./routes/routesTaggingGame";

dotevn.config({ path: "../.env" });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/levels", routerLevelData);
app.use("/tagging_game", routerTaggingGame);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Database Password: `, process.env.DATABASE_PASSWORD);
});
