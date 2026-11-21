import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google sign-in starter",
  description: "Next.js with Google authentication",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
