import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nailscape Studio — Nail Art Booking & Management",
  description: "Reservasi perawatan kuku eksklusif di Nailscape Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
