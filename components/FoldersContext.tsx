"use client";

import { createContext, useContext, useState } from "react";
import type { Folder } from "@/app/_lib/mock-data";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
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

  function addFolder(name: string) {
    const folder: Folder = { id: `folder-${Date.now()}`, name };
    setFolders((prev) => [...prev, folder]);
  }

  function removeFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  function renameFolder(id: string, name: string) {
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
