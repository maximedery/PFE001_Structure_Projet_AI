/*
  Warnings:

  - Made the column `nbOfEmployees` on table `Workspace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "nbOfEmployees" SET NOT NULL,
ALTER COLUMN "nbOfEmployees" SET DEFAULT 1;
