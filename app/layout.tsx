import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { FoldersProvider } from "@/components/FoldersContext";
import { folders } from "./_lib/mock-data";
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
  title: "한입 링크",
  description: "북마크 관리 서비스 한입 링크",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FoldersProvider initialFolders={folders}>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 px-6 pt-10 pb-6">{children}</main>
          </div>
        </FoldersProvider>
      </body>
    </html>
  );
}
