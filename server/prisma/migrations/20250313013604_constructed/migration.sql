/*
  Warnings:

  - You are about to drop the `Scoreboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropTable
DROP TABLE "Scoreboard";

-- CreateTable
CREATE TABLE "Levels" (
    "title" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "score" TEXT NOT NULL,
    "leveltitle" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Letter" (
    "id" TEXT NOT NULL,
    "x" SMALLINT NOT NULL,
    "y" SMALLINT NOT NULL,
    "legth" SMALLINT NOT NULL,
    "letter" CHAR(1) NOT NULL,
    "leveltitle" TEXT NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Levels_title_key" ON "Levels"("title");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_leveltitle_fkey" FOREIGN KEY ("leveltitle") REFERENCES "Levels"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_leveltitle_fkey" FOREIGN KEY ("leveltitle") REFERENCES "Levels"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
