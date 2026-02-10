import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lore-Anchor",
  description: "イラストレーター・漫画家のための自動防衛システム。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}