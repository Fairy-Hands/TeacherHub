import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teacher Hub",
  description: "MVP SaaS para professores particulares de inglês.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

