import { startOfMonth } from "date-fns";
import { prisma } from "@/lib/prisma";

type DashboardSnapshot = {
  todayLessons: number;
  upcomingLessons: number;
  students: number;
  monthLessons: number;
  monthRevenue: number;
  pendingPayments: number;
  todayLessonRows: Array<{
    id: string;
    studentName: string;
    startsAt: Date;
    durationMinutes: number;
    mode: string;
    status: string;
  }>;
  studentRows: Array<{
    id: string;
    name: string;
    level: string;
    weeklyFrequency: number | null;
    goal: string | null;
    nextLesson: Date | null;
  }>;
  pendingPaymentRows: Array<{
    id: string;
    studentName: string;
    competence: string;
    amount: string;
    dueDate: Date;
    status: string;
  }>;
};

export async function getDashboardSnapshot(userId: string): Promise<DashboardSnapshot> {
  const monthStart = startOfMonth(new Date());
  const [todayLessons, upcomingLessons, students, monthLessons, payments, pendingPayments] =
    await Promise.all([
      prisma.lesson.findMany({
        where: {
          userId,
          startsAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
        include: { student: { select: { name: true } } },
        orderBy: { startsAt: "asc" },
      }),
      prisma.lesson.findMany({
        where: {
          userId,
          startsAt: { gte: new Date() },
        },
        include: { student: { select: { name: true } } },
        orderBy: { startsAt: "asc" },
        take: 8,
      }),
      prisma.student.count({ where: { userId } }),
      prisma.lesson.count({
        where: {
          userId,
          status: "COMPLETED",
          startsAt: { gte: monthStart },
        },
      }),
      prisma.payment.findMany({
        where: {
          userId,
          status: "PAID",
          paidAt: { gte: monthStart },
        },
        select: { amount: true },
      }),
      prisma.payment.findMany({
        where: {
          userId,
          status: { in: ["PENDING", "OVERDUE"] },
        },
        include: { student: { select: { name: true } } },
        orderBy: { dueDate: "asc" },
        take: 8,
      }),
    ]);

  const studentRows = await prisma.student.findMany({
    where: { userId },
    orderBy: { name: "asc" },
    take: 6,
    include: {
      lessons: {
        where: { startsAt: { gte: new Date() } },
        orderBy: { startsAt: "asc" },
        take: 1,
      },
    },
  });

  return {
    todayLessons: todayLessons.length,
    upcomingLessons: upcomingLessons.length,
    students,
    monthLessons,
    monthRevenue: payments.reduce((total, payment) => total + Number(payment.amount), 0),
    pendingPayments: pendingPayments.length,
    todayLessonRows: todayLessons.map((lesson) => ({
      id: lesson.id,
      studentName: lesson.student.name,
      startsAt: lesson.startsAt,
      durationMinutes: lesson.durationMinutes,
      mode: lesson.mode,
      status: lesson.status,
    })),
    studentRows: studentRows.map((student) => ({
      id: student.id,
      name: student.name,
      level: student.level,
      weeklyFrequency: student.weeklyFrequency,
      goal: student.goal,
      nextLesson: student.lessons[0]?.startsAt ?? null,
    })),
    pendingPaymentRows: pendingPayments.map((payment) => ({
      id: payment.id,
      studentName: payment.student.name,
      competence: payment.competence,
      amount: Number(payment.amount).toFixed(2),
      dueDate: payment.dueDate,
      status: payment.status,
    })),
  };
}

