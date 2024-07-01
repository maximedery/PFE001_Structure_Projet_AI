-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "workingDays" SET DEFAULT ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday']::"WorkingDay"[];
