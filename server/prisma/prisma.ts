import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: { letter: { length: true, x: true, y: true } },
});

export default prisma;
