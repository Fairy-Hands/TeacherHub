"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function createStudent(formData: FormData) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return { error: "Você precisa estar autenticado para criar alunos." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const level = String(formData.get("level") ?? "B1");
  const goal = String(formData.get("goal") ?? "").trim();
  const weeklyFrequency = Number(formData.get("weeklyFrequency") ?? 1);
  const lessonPrice = Number(formData.get("lessonPrice") ?? 0);
  const note = String(formData.get("notes") ?? "").trim();

  if (!name) {
    return { error: "Informe o nome do aluno." };
  }

  await prisma.student.create({
    data: {
      userId: session.user.id,
      name,
      email: email || null,
      phone: phone || null,
      level: level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2",
      goal: goal || null,
      weeklyFrequency: Number.isNaN(weeklyFrequency) ? null : weeklyFrequency,
      lessonPrice: Number.isNaN(lessonPrice) ? null : lessonPrice,
      notes: note || null,
    },
  });

  revalidatePath("/students");
  revalidatePath("/");

  return { success: true };
}

