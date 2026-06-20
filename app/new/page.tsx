"use client";

import NewLinkForm from "@/components/NewLinkForm";
import { useFolders } from "@/components/FoldersContext";

export default function NewLinkPage() {
  const { folders } = useFolders();

  return <NewLinkForm folders={folders} />;
}
