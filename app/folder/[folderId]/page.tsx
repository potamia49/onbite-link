import LinkGrid from "@/components/LinkGrid";
import { links } from "../../_lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return <LinkGrid links={folderLinks} />;
}
