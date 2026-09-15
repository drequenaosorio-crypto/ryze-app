import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RYZE - La Nueva Era",
  description: "Sé el primero en entrar. La plataforma donde tu estilo es tu poder. 🔥",
  openGraph: {
    title: "RYZE - La Nueva Era",
    description: "Sé el primero en entrar. La plataforma donde tu estilo es tu poder. Únete ahora.",
    url: "https://www.ryzeofficial-app.com",
    siteName: "RYZE",
    images: [
      {
        url: "https://www.ryzeofficial-app.com/ryze-og.jpg",
        width: 1200,
        height: 630,
        alt: "RYZE",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RYZE - La Nueva Era",
    description: "Sé el primero en entrar. La plataforma donde tu estilo es tu poder.",
    images: ["https://www.ryzeofficial-app.com/ryze-og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
