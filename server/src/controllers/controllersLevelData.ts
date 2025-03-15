import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: { letter: { length: true, x: true, y: true } },
});

const getStages = async (req: Request, res: Response): Promise<any> => {
  console.log(req);
  const rows = await prisma.levels.findMany({
    orderBy: { title: "asc" },
    include: { scoreboard: { orderBy: { score: "desc" }, take: 1 } },
  });
  return res.json(rows);
};

const getBasicStage = async (req: Request, res: Response): Promise<any> => {
  const levelName = req.params.stage.replace("_", " ");
  const row = await prisma.letter.findMany({
    where: { leveltitle: levelName },
    omit: { leveltitle: true },
  });
  return res.json(row);
};

export { getStages, getBasicStage };
