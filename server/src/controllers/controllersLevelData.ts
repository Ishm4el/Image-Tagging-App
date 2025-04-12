import { Request, RequestHandler, Response } from "express";
import prisma from "../../prisma/prisma";
import asyncHandler from "express-async-handler";

const getStages: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const rows = await prisma.levels.findMany({
      orderBy: { title: "asc" },
      include: { scoreboard: { orderBy: { score: "desc" }, take: 1 } },
    });
    return res.json(rows);
  }
);

const getStagesOnly: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const rows = await prisma.levels.findMany({ orderBy: { title: "asc" } });
    return res.json(rows);
  }
);

const getBasicStage: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const levelName = req.params.stage.replace("_", " ");
    const row = await prisma.letter.findMany({
      where: { leveltitle: levelName },
    });
    return res.json(row);
  }
);

const getStageScoreboard: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const levelTitle: string = req.params.stage.replace("_", " ");
    const levelData = await prisma.levels.findUnique({
      where: { title: levelTitle },
      include: {
        scoreboard: { orderBy: [{ score: "asc" }, { createdAt: "desc" }] },
      },
    });
    console.log("in getStageScoreboard\nPrinting levelData: ", levelData);

    res.json(levelData);
  }
);

export { getStages, getStagesOnly, getBasicStage, getStageScoreboard };
