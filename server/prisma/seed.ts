import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const now = new Date();

async function main() {
  const level = await prisma.levels.upsert({
    where: { title: "level 1" },
    update: {},
    create: {
      difficulty: "EASY",
      title: "level 1",
      letters: {
        createMany: {
          data: [
            { letter: "g", length: 100, x: 101, y: 102 },
            { letter: "i", length: 100, x: 101, y: 102 },
            { letter: "t", length: 100, x: 101, y: 102 },
          ],
        },
      },
      scoreboard: {
        create: {
          endTime: now,
          score: "00:00",
          startTime: now,
          userName: "Test Name",
        },
      },
    },
  });
  console.log({ level   });
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
