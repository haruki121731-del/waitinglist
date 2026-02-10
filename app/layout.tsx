import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lore-Anchor | あなたの作品をAIが守る",
  description:
    "イラストレーター・漫画家のための自動防衛システム。無断転載・不正学習を検知し、ワンクリックで権利保護。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}