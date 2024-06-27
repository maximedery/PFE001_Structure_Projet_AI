/*
  Warnings:

  - You are about to drop the column `duration` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "duration",
ADD COLUMN     "manHours" DOUBLE PRECISION;
