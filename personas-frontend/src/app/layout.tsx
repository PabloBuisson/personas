import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

// Default metadata for all pages
export const metadata: Metadata = {
  title: {
    template: "%s | Personas",
    default: "Personas",
  },
  description:
    "Create and manage personas at ease. Perfect for user research, storytelling, character creation, creativity, writing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " p-6 md:p-8 min-h-screen"}>
        <header>
          <Link className="text-lg" href={"/"}>
            Personas
          </Link>
        </header>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
