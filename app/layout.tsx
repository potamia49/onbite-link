import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { FoldersProvider } from "@/components/FoldersContext";
import { LinksProvider } from "@/components/LinksContext";
import { links, type Folder } from "./_lib/mock-data";
import { createClient } from "@/utils/supabase/server";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("folders")
    .select("id, name")
    .order("id", { ascending: true });

  const folders: Folder[] = (data ?? []).map((row) => ({
    id: String(row.id),
    name: row.name,
  }));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FoldersProvider initialFolders={folders}>
          <LinksProvider initialLinks={links}>
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 px-6 pt-10 pb-6">{children}</main>
            </div>
          </LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
