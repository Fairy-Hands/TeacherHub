"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function registerUser(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    throw new Error("Preencha nome, e-mail e uma senha com pelo menos 8 caracteres.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Já existe uma conta com este e-mail.");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password),
    },
  });

  redirect("/login");
}
