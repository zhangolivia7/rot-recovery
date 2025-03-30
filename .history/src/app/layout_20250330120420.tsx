import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rot Recovery",
  description: "it's comeback time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Shanti&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}