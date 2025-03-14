import { PrismaClient } from "@prisma/client";
import levelsData from "./levelsConfig";
const prisma = new PrismaClient();

const now = new Date();

async function main() {
  levelsData.map(async (level) => {
    await prisma.levels.upsert({
      where: { title: level.title },
      update: {},
      create: {
        difficulty: level.difficulty,
        title: level.title,
        letters: {
          createMany: {
            data: level.letters,
          },
        },
        // !!! SCOREBOARD - SHOULDN'T HAVE ENTRIES
        scoreboard: {
          create: {
            endTime: now,
            score: level.highscore,
            startTime: now,
            userName: "Test Name",
          },
        },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
