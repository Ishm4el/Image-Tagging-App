/*
  Warnings:

  - You are about to drop the column `legth` on the `Letter` table. All the data in the column will be lost.
  - Added the required column `length` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "legth",
ADD COLUMN     "length" SMALLINT NOT NULL;
