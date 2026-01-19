import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spielplatzcheck Mainz | Finde den perfekten Spielplatz",
  description:
    "Entdecke über 180 Spielplätze in Mainz. Mit Karte, Filteroptionen und Bewertungen – finde den perfekten Spielplatz für deine Kinder!",
  keywords: ["Spielplatz", "Mainz", "Kinder", "Familie", "Outdoor", "Spielen"],
  openGraph: {
    title: "Spielplatzcheck Mainz",
    description: "Finde den perfekten Spielplatz für deine Familie",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="font-body antialiased bg-gradient-to-b from-primary-50 to-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
