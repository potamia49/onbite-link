"use client";

import Link from "next/link";
import { useState } from "react";
import { useFolders } from "@/components/FoldersContext";
import NewFolderModal from "@/components/NewFolderModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addFolder } = useFolders();

  return (
    <header className="nav-bar sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] px-4">
      <span className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-secondary rounded-md px-4 py-2 text-sm font-medium"
        >
          + 새 폴더
        </button>
        <Link
          href="/new"
          className="btn-primary rounded-md px-4 py-2 text-sm font-medium"
        >
          + 새 링크
        </Link>
      </div>
      {isModalOpen && (
        <NewFolderModal
          onClose={() => setIsModalOpen(false)}
          onCreate={(name) => {
            addFolder(name);
            setIsModalOpen(false);
          }}
        />
      )}
    </header>
  );
}
