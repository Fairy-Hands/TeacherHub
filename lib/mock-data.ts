import type { LessonMode, LessonStatus, PaymentStatus, StudentLevel } from "@/lib/types";

export const dashboardStats = {
  todayLessons: 4,
  upcomingLessons: 8,
  students: 23,
  monthLessons: 41,
  monthRevenue: 6840,
  pendingPayments: 5,
};

export const students = [
  {
    id: "stu_01",
    name: "Ana Souza",
    level: "B2" as StudentLevel,
    goal: "Business English and interviews",
    weeklyFrequency: 2,
    nextLesson: "Today, 14:00",
    status: "Active",
  },
  {
    id: "stu_02",
    name: "Bruno Lima",
    level: "A2" as StudentLevel,
    goal: "Travel and confidence",
    weeklyFrequency: 1,
    nextLesson: "Tomorrow, 09:30",
    status: "Active",
  },
  {
    id: "stu_03",
    name: "Carla Martins",
    level: "C1" as StudentLevel,
    goal: "Fluency and conversation",
    weeklyFrequency: 3,
    nextLesson: "Thu, 18:00",
    status: "At risk",
  },
];

export const lessons = [
  {
    student: "Ana Souza",
    startsAt: "Today, 14:00",
    duration: "60 min",
    mode: "Online" as LessonMode,
    status: "Scheduled" as LessonStatus,
  },
  {
    student: "Bruno Lima",
    startsAt: "Today, 16:00",
    duration: "45 min",
    mode: "In person" as LessonMode,
    status: "Scheduled" as LessonStatus,
  },
  {
    student: "Carla Martins",
    startsAt: "Tomorrow, 09:30",
    duration: "60 min",
    mode: "Online" as LessonMode,
    status: "Completed" as LessonStatus,
  },
];

export const payments = [
  {
    student: "Ana Souza",
    competence: "2026-07",
    amount: 720,
    dueDate: "10 Jul",
    status: "Paid" as PaymentStatus,
  },
  {
    student: "Bruno Lima",
    competence: "2026-07",
    amount: 360,
    dueDate: "12 Jul",
    status: "Pending" as PaymentStatus,
  },
  {
    student: "Carla Martins",
    competence: "2026-07",
    amount: 960,
    dueDate: "05 Jul",
    status: "Overdue" as PaymentStatus,
  },
];

