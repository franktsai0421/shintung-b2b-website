import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tan-dong-pro.franktsai0421.chatgpt.site"),
  title: "SHIN TUNG VIETNAM CO., LTD · Cổng đặt hàng ONSPA",
  description:
    "Cổng đặt hàng đại lý, câu chuyện thương hiệu, tin tức và hồ sơ chất lượng của Công ty TNHH Shin Tung Việt Nam.",
  openGraph: {
    title: "SHIN TUNG VIETNAM CO., LTD",
    description: "ONSPA · Work with Passion · Đặt hàng và hồ sơ chất lượng",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SHIN TUNG VIETNAM CO., LTD · Work with Passion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIN TUNG VIETNAM CO., LTD",
    description: "ONSPA · Work with Passion · Đặt hàng và hồ sơ chất lượng",
    images: ["/og.png"],
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
