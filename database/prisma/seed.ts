import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: "Project Alpha",
      color: "#FF5733",
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Project Beta",
      color: "#33FF57",
    },
  });

  // Create Tasks for Project Alpha
  const task1 = await prisma.task.create({
    data: {
      name: "Task 1",
      projectId: project1.id,
      start: new Date("2024-06-10T08:00:00Z"),
      end: new Date("2024-06-10T12:00:00Z"),
      duration: 240,
      cost: 100.0,
      importance: "high",
      weatherEffect: "none",
    },
  });

  const task2 = await prisma.task.create({
    data: {
      name: "Task 2",
      projectId: project1.id,
      start: new Date("2024-06-11T08:00:00Z"),
      end: new Date("2024-06-11T12:00:00Z"),
      duration: 240,
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
      start: new Date("2024-06-12T08:00:00Z"),
      end: new Date("2024-06-12T12:00:00Z"),
      duration: 240,
      cost: 200.0,
      importance: "low",
      weatherEffect: "significant",
    },
  });

  const task4 = await prisma.task.create({
    data: {
      name: "Task 4",
      projectId: project2.id,
      start: new Date("2024-06-13T08:00:00Z"),
      end: new Date("2024-06-13T12:00:00Z"),
      duration: 240,
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
