import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { decodeToken, signToken } from "../utility/jwtHandler";

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
    console.log("within box");
    const token = signToken({ letter: userInput.letter, found: true });
    res.json({ found: true, token });
  } else res.json({ found: false });
};

const confirmVictory = (req: Request, res: Response) => {
  const tokens = req.body.tokens;
  console.log(req.body);
  let victory = false;
  if (Array.isArray(tokens)) {
    tokens.forEach((token) => {
      const decoded = decodeToken(token);
      console.log(decoded);
    });
  } else res.json({ victory });
};

export { confirmCoord, confirmVictory };
