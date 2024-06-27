import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create WorkSpaces
  const workSpace1 = await prisma.workSpace.create({
    data: {
      name: "WorkSpace One",
      start: new Date("2024-01-01"),
      end: new Date("2024-12-31"),
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
  });

  const workSpace2 = await prisma.workSpace.create({
    data: {
      name: "WorkSpace Two",
      start: new Date("2024-01-01"),
      end: new Date("2024-12-31"),
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: "Project Alpha",
      color: "#FF5733",
      workspaceId: workSpace1.id, // Associate with WorkSpace One
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Project Beta",
      color: "#33FF57",
      workspaceId: workSpace2.id, // Associate with WorkSpace Two
    },
  });

  // Create Tasks for Project Alpha
  const task1 = await prisma.task.create({
    data: {
      name: "Task 1",
      projectId: project1.id,
      workspaceId: workSpace1.id, // Associate with WorkSpace One
      start: new Date("2024-06-10"),
      end: new Date("2024-06-10"),
      manHours: 240,
      cost: 100.0,
      importance: "high",
      weatherEffect: "none",
    },
  });

  const task2 = await prisma.task.create({
    data: {
      name: "Task 2",
      projectId: project1.id,
      workspaceId: workSpace1.id, // Associate with WorkSpace One
      start: new Date("2024-06-11"),
      end: new Date("2024-06-11"),
      manHours: 240,
      cost: 150.0,
      importance: "medium",
      weatherEffect: "slight",
    },
  });

  // Create Tasks for Project Beta
  const task3 = await prisma.task.create({
    data: {
      name: "Task 3",
      projectId: project2.id,
      workspaceId: workSpace2.id, // Associate with WorkSpace Two
      start: new Date("2024-06-12"),
      end: new Date("2024-06-12"),
      manHours: 240,
      cost: 200.0,
      importance: "low",
      weatherEffect: "significant",
    },
  });

  const task4 = await prisma.task.create({
    data: {
      name: "Task 4",
      projectId: project2.id,
      workspaceId: workSpace2.id, // Associate with WorkSpace Two
      start: new Date("2024-06-13"),
      end: new Date("2024-06-13"),
      manHours: 240,
      cost: 250.0,
      importance: "asap",
      weatherEffect: "impossible",
    },
  });

  // Create TaskHierarchy relationships for Project Alpha
  await prisma.taskHierarchy.create({
    data: {
      predecessorId: task1.id,
      successorId: task2.id,
    },
  });

  // Create TaskHierarchy relationships for Project Beta
  await prisma.taskHierarchy.create({
    data: {
      predecessorId: task3.id,
      successorId: task4.id,
    },
  });
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
