import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tân Đông Pro 新東經銷商訂貨網站",
  description: "Cổng đặt hàng dành riêng cho đại lý Tân Đông",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
