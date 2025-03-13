/*
  Warnings:

  - The primary key for the `Letter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Letter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Letter" DROP CONSTRAINT "Letter_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Letter_pkey" PRIMARY KEY ("leveltitle", "letter");
