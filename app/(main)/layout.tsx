import { cookies } from "next/headers";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { FoldersProvider } from "@/components/FoldersContext";
import { LinksProvider } from "@/components/LinksContext";
import type { Folder, LinkItem } from "@/app/_lib/mock-data";
import { createClient } from "@/utils/supabase/server";

export default async function MainLayout({
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

  const { data: linksData } = await supabase
    .from("links")
    .select("id, url, title, description, thumbnail_url, folder_id")
    .order("id", { ascending: true });

  const links: LinkItem[] = (linksData ?? []).map((row) => ({
    id: String(row.id),
    folderId: row.folder_id !== null ? String(row.folder_id) : "",
    title: row.title ?? "",
    url: row.url,
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
  }));

  return (
    <FoldersProvider initialFolders={folders}>
      <LinksProvider initialLinks={links}>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 px-6 pt-10 pb-6">{children}</main>
        </div>
      </LinksProvider>
    </FoldersProvider>
  );
}
