import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACE AI Tutor — CAET Certification Study Companion",
  description:
    "Your AI-powered study partner for CAET avionics certification. Conversational tutoring, adaptive practice, and scenario-based learning.",
  keywords: ["CAET", "avionics", "certification", "AI tutor", "study", "ACE"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-bg-navy text-text-light min-h-screen">
        {children}
      </body>
    </html>
  );
}
