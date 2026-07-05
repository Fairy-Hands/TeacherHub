import { PrismaClient, LessonMode, LessonStatus, PaymentStatus, StudentLevel } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "fairyhands.contato@gmail.com" },
    update: {},
    create: {
      name: "Jonas",
      email: "fairyhands.contato@gmail.com",
      passwordHash: hashPassword("teacherhub123"),
    },
  });

  const ana = await prisma.student.upsert({
    where: {
      id: "seed-student-ana",
    },
    update: {},
    create: {
      id: "seed-student-ana",
      userId: user.id,
      name: "Ana Souza",
      email: "ana@email.com",
      phone: "+55 11 99999-9999",
      level: StudentLevel.B2,
      goal: "Business English and interviews",
      weeklyFrequency: 2,
      lessonPrice: 180,
      notes: "Prefers classes after 18h.",
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        userId: user.id,
        studentId: ana.id,
        startsAt: new Date(),
        durationMinutes: 60,
        mode: LessonMode.ONLINE,
        status: LessonStatus.SCHEDULED,
        meetingLink: "https://meet.google.com/example",
      },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        userId: user.id,
        studentId: ana.id,
        competence: "2026-07",
        amount: 720,
        dueDate: new Date(),
        status: PaymentStatus.PENDING,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
