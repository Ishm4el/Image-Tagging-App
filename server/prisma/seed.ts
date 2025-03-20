import { PrismaClient } from "@prisma/client";
import levelsData from "./levelsConfig";
const prisma = new PrismaClient();
  
async function main() {
  levelsData.map(async (level) => {
    const toAlter = {
      difficulty: level.difficulty,
      title: level.title,
      letters: {
        createMany: {
          data: level.letters,
        },
      },
    };

    await prisma.levels.upsert({
      where: { title: level.title },
      update: toAlter,
      create: toAlter,
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
