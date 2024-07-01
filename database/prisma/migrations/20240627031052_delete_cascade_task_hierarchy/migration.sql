-- DropForeignKey
ALTER TABLE "TaskHierarchy" DROP CONSTRAINT "TaskHierarchy_predecessorId_fkey";

-- DropForeignKey
ALTER TABLE "TaskHierarchy" DROP CONSTRAINT "TaskHierarchy_successorId_fkey";

-- AddForeignKey
ALTER TABLE "TaskHierarchy" ADD CONSTRAINT "TaskHierarchy_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskHierarchy" ADD CONSTRAINT "TaskHierarchy_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
