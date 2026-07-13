import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Plus Jakarta Sans - Body text (más carácter que Inter)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Montserrat - Headings (bold, moderna)
const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// JetBrains Mono - Para códigos
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mi Proceso — Justicia Tucumán",
  description: "Seguí tu causa judicial sin llamar, sin ir al tribunal y sin revivir el trauma - Hackathon Norte Potencia",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${montserrat.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}