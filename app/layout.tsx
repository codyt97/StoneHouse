import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stone House Marble & Granite",
  description: "Luxury stone surfaces, fabrication, and installation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
