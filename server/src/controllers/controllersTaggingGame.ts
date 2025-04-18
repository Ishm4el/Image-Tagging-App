import { Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../../prisma/prisma";
import { decodeToken, signToken } from "../utility/jwtHandler";
import { JwtPayload } from "jsonwebtoken";

const confirmCoord: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userInput: {
      x: number;
      y: number;
      letter: string;
      levelTitle: string;
    } = req.body;
    console.log(userInput);
    const row = await prisma.letter.findUnique({
      where: {
        leveltitle_letter: {
          letter: userInput.letter,
          leveltitle: userInput.levelTitle,
        },
      },
      select: { length: true, x: true, y: true },
    });
    console.log(row);

    if (
      row &&
      userInput.x >= row.x &&
      userInput.x <= row.x + row.length &&
      userInput.y >= row.y &&
      userInput.y <= row.y + row.length
    ) {
      // console.log("within box");
      const token = signToken({
        letter: userInput.letter,
        found: true,
        levelTitle: userInput.levelTitle,
      });
      res.json({ found: true, token });
    } else res.json({ found: false });
  }
);

interface verifyVictory extends JwtPayload {
  letter: string;
  found: boolean;
  levelTitle: string;
}

interface verifyLevelToken extends JwtPayload {
  levelTitle: string;
  iat: number;
}

const isPayload = (token: string | JwtPayload): token is verifyVictory => {
  return (token as JwtPayload).iat !== undefined;
};

const isLevelToken = (
  token: string | JwtPayload
): token is verifyLevelToken => {
  return (token as JwtPayload).iat !== undefined;
};

const confirmVictory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const tokens: Array<string> = req.body.tokens;
    const levelToken: string = req.body.levelToken;
    const decodedLevelToken: string | JwtPayload | undefined =
      decodeToken(levelToken);

    if (!decodedLevelToken) {
      res.status(498).json({ error: "Token has expired" });
      return;
    }
    console.log("decodedLevelToken: ", decodedLevelToken);

    let victory = true;
    tokens.forEach((token) => {
      const decodedToken = decodeToken(token);
      if (!decodedToken) {
        res.status(498).json({ error: "Token has expired" });
        return;
      }

      const payload: verifyVictory | undefined = isPayload(decodedToken!)
        ? decodedToken
        : undefined;
      if (
        payload &&
        (payload.found === false ||
          (typeof decodedLevelToken === "object" &&
            decodedLevelToken.levelTitle !== payload.levelTitle))
      ) {
        victory = false;
      }
    });

    const intervalCalc =
      currentTime -
      (isLevelToken(decodedLevelToken) ? decodedLevelToken.iat : 0);

    const format = new Date(intervalCalc * 1000);
    const minutes = "0" + format.getMinutes();
    const seconds = "0" + format.getSeconds();
    const toRecord =
      minutes.substring(seconds.length - 2) +
      ":" +
      seconds.substring(seconds.length - 2);
    const finalToken = signToken({
      endTime: new Date(currentTime * 1000),
      startTime: new Date(
        (isLevelToken(decodedLevelToken) ? decodedLevelToken.iat : 0) * 1000
      ),
      score: toRecord,
      leveltitle: isLevelToken(decodedLevelToken)
        ? decodedLevelToken.levelTitle
        : "ERROR",
    });

    res.json({ victory, finalToken, yourScore: toRecord });
  }
);

const start: RequestHandler = (req: Request, res: Response) => {
  const token = signToken({ levelTitle: req.body.levelTitle });
  res.json(token);
};

interface finalToken extends verifyLevelToken {
  endTime: Date;
  score: string;
}

const complete: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const finalToken = decodeToken(req.body.finalToken) as finalToken;
    if (!finalToken) {
      res.status(498).json({ error: "Token has expired" });
      return;
    }
    const userName = req.body.userName;

    const row = await prisma.score.create({
      data: {
        endTime: finalToken.endTime,
        startTime: new Date(finalToken.iat * 1000),
        score: finalToken.score,
        userName: userName,
        leveltitle: finalToken.leveltitle,
      },
    });

    const title: string = finalToken.leveltitle;
    console.log("title: ", title);

    // determine user's ranking
    const leaderBoardPlacement = await prisma.levels.findUnique({
      where: { title: title },
      include: {
        scoreboard: { orderBy: [{ score: "asc" }, { createdAt: "desc" }] },
      },
    });

    console.log("row.id: ", row.id);
    const scoreboard = leaderBoardPlacement?.scoreboard;

    const indexOfUserScore = scoreboard?.findIndex((e) => e.id === row.id)! + 1;

    // console.log("indexOfUserScore: ", indexOfUserScore);
    console.log("leaderBoardPlacement: ", leaderBoardPlacement);

    res.json({ done: true, row, indexOfUserScore });
  }
);

export { confirmCoord, confirmVictory, start, complete };
