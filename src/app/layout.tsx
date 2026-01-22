import "./globals.css";
import TopNav from "@/components/TopNav";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Fireboard",
  description: "텔레그램 이벤트를 한 곳에 모은 대시보드",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Fireboard",
    description: "텔레그램 이벤트를 한 번에 보고, 버튼 한 번에 참여",
    url: siteUrl,
    siteName: "Fireboard",
    type: "website",
    images: [{ url: "/og-default.svg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-neutral-50 text-neutral-900">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
