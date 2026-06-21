"use client";

import { createContext, useContext, useState } from "react";
import type { Folder } from "@/app/_lib/mock-data";
import { createClient } from "@/utils/supabase/client";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState(initialFolders);

  async function addFolder(name: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name })
      .select()
      .single();

    if (error || !data) {
      throw error;
    }

    const folder: Folder = { id: String(data.id), name: data.name };
    setFolders((prev) => [...prev, folder]);
  }

  function removeFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  async function renameFolder(id: string, name: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id);

    if (error) {
      throw error;
    }

    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
    );
  }

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, removeFolder, renameFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
