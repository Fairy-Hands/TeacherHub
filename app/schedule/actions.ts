"use server";

import { addWeeks } from "date-fns";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LessonMode } from "@prisma/client";

export async function createLesson(formData: FormData) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return { error: "Você precisa estar autenticado." };
  }

  const studentId = String(formData.get("studentId") ?? "");
  const startsAt = String(formData.get("startsAt") ?? "");
  const durationMinutes = Number(formData.get("durationMinutes") ?? 60);
  const mode = String(formData.get("mode") ?? "ONLINE");
  const meetingLink = String(formData.get("meetingLink") ?? "").trim();
  const recurrenceEnabled = String(formData.get("recurrenceEnabled") ?? "") === "on";
  const recurrenceCount = Number(formData.get("recurrenceCount") ?? 0);

  if (!studentId || !startsAt) {
    return { error: "Selecione um aluno e informe data e horário." };
  }

  const baseStartsAt = new Date(startsAt);
  const count = recurrenceEnabled ? Math.max(1, recurrenceCount || 1) : 1;

  const lessonData = Array.from({ length: count }, (_, index) => ({
    userId: session.user.id,
    studentId,
    startsAt: addWeeks(baseStartsAt, index),
    durationMinutes: Number.isNaN(durationMinutes) ? 60 : durationMinutes,
    mode: mode === "IN_PERSON" ? LessonMode.IN_PERSON : LessonMode.ONLINE,
    meetingLink: meetingLink || null,
    status: "SCHEDULED" as const,
    recurrenceRule: recurrenceEnabled ? `RRULE:FREQ=WEEKLY;COUNT=${count}` : null,
    recurrenceUntil: recurrenceEnabled && count > 1 ? addWeeks(baseStartsAt, count - 1) : null,
  }));

  await prisma.lesson.createMany({
    data: lessonData,
  });

  revalidatePath("/schedule");
  revalidatePath("/");

  return { success: true };
}
