/*
  Warnings:

  - You are about to drop the `_TaskPredecessor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskPredecessor" DROP CONSTRAINT "_TaskPredecessor_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskPredecessor" DROP CONSTRAINT "_TaskPredecessor_B_fkey";

-- DropTable
DROP TABLE "_TaskPredecessor";

-- CreateTable
CREATE TABLE "TaskHierarchy" (
    "predecessorId" TEXT NOT NULL,
    "successorId" TEXT NOT NULL,

    CONSTRAINT "TaskHierarchy_pkey" PRIMARY KEY ("predecessorId","successorId")
);

-- AddForeignKey
ALTER TABLE "TaskHierarchy" ADD CONSTRAINT "TaskHierarchy_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskHierarchy" ADD CONSTRAINT "TaskHierarchy_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
