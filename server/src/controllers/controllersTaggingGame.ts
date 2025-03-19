import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { decodeToken, signToken } from "../utility/jwtHandler";
import { Jwt, JwtPayload } from "jsonwebtoken";

const confirmCoord = async (req: Request, res: Response) => {
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
};

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

const confirmVictory = async (req: Request, res: Response) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const tokens: Array<string> = req.body.tokens;
  const levelToken: string = req.body.levelToken;
  const decodedLevelToken: string | JwtPayload = decodeToken(levelToken);
  console.log("decodedLevelToken: ", decodedLevelToken);

  let victory = true;
  tokens.forEach((token) => {
    const decodedToken = decodeToken(token);
    const payload: verifyVictory | undefined = isPayload(decodedToken)
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
    currentTime - (isLevelToken(decodedLevelToken) ? decodedLevelToken.iat : 0);

  const format = new Date(intervalCalc * 1000);
  const minutes = "0" + format.getMinutes();
  const seconds = "0" + format.getSeconds();
  const toRecord = minutes.substring(-2) + ":" + seconds.substring(-2);

  const row = await prisma.score.create({
    data: {
      endTime: new Date(currentTime * 1000),
      startTime: new Date(
        (isLevelToken(decodedLevelToken) ? decodedLevelToken.iat : 0) * 1000
      ),
      score: toRecord,
      // to change based on userinput
      userName: "PLACEHOLDER",
      leveltitle: isLevelToken(decodedLevelToken)
        ? decodedLevelToken.levelTitle
        : "ERROR",
    },
  });

  res.json({ victory, row });
};

const start = (req: Request, res: Response) => {
  const token = signToken({ levelTitle: req.body.levelTitle });
  res.json(token);
};

export { confirmCoord, confirmVictory, start };
