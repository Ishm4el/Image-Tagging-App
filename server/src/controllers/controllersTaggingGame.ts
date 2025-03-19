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
    const token = signToken({ letter: userInput.letter, found: true });
    res.json({ found: true, token });
  } else res.json({ found: false });
};

interface verifyVictory extends JwtPayload {
  letter: string;
  found: boolean;
}

const isPayload = (token: string | JwtPayload): token is verifyVictory => {
  return (token as JwtPayload).iat !== undefined;
};

const confirmVictory = (req: Request, res: Response) => {
  const tokens: Array<string> = req.body.tokens;
  console.log("req.body: ", req.body);
  let victory = false;
  tokens.forEach((token) => {
    const decodedToken = decodeToken(token);
    const payload: verifyVictory | undefined = isPayload(decodedToken)
      ? decodedToken
      : undefined;
    if (payload && payload.found === false) {
      res.json({ victory });
      return;
    }
  });

  victory = true;
  res.json({ victory });
};

export { confirmCoord, confirmVictory };
