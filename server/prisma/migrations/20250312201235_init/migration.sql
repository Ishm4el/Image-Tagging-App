-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "score" TEXT NOT NULL,
    "stage" INTEGER NOT NULL,

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);
