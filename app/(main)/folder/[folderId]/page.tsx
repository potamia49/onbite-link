"use client";

import { useParams } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { useLinks } from "@/components/LinksContext";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { links } = useLinks();
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return <LinkGrid links={folderLinks} />;
}
