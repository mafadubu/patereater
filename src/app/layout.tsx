import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gjgygrbb.vercel.app"),
  title: "책 먹는 편집자 | 포트폴리오",
  description: "IT·실용 편집자 나준섭의 포트폴리오 사이트입니다.",
  openGraph: {
    title: "책 먹는 편집자 | 포트폴리오",
    description: "IT·실용 편집자 나준섭의 포트폴리오 사이트입니다.",
    url: "https://gjgygrbb.vercel.app",
    siteName: "책 먹는 편집자",
    images: [
      {
        url: "https://gjgygrbb.vercel.app/images/uploaded_media_3_1769245889002.png",
        width: 1200,
        height: 630,
        alt: "책 먹는 편집자 프로필 사진",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "책 먹는 편집자 | 포트폴리오",
    description: "IT·실용 편집자 나준섭의 포트폴리오 사이트입니다.",
    images: ["https://gjgygrbb.vercel.app/images/uploaded_media_3_1769245889002.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
