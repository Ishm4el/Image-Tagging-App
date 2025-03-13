import express, { Express, Request, Response } from "express";
import dotevn from "dotenv";
import { log } from "console";
import cors from "cors";

dotevn.config({ path: "../.env" });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Database Password: `, process.env.DATABASE_PASSWORD);
});
