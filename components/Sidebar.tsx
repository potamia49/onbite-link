"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useFolders } from "@/components/FoldersContext";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import type { Folder } from "@/app/_lib/mock-data";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { folders, removeFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  function handleConfirmDelete() {
    if (!folderToDelete) return;
    const isViewingDeletedFolder =
      pathname === `/folder/${folderToDelete.id}`;
    removeFolder(folderToDelete.id);
    setFolderToDelete(null);
    if (isViewingDeletedFolder) {
      router.push("/");
    }
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] px-4 py-6">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className={`nav-item rounded-md px-3 py-2 text-left text-sm font-medium ${
            pathname === "/"
              ? "nav-item-active"
              : "text-[var(--text-sub)]"
          }`}
        >
          ALL
        </Link>
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;
          return (
            <div key={folder.id} className="group relative">
              <Link
                href={href}
                className={`nav-item block rounded-md px-3 py-2 pr-8 text-left text-sm font-medium ${
                  isActive ? "nav-item-active" : "text-[var(--text-sub)]"
                }`}
              >
                {folder.name}
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFolderToDelete(folder);
                }}
                aria-label={`${folder.name} 폴더 삭제`}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-sub)] opacity-0 transition-opacity hover:text-[var(--text)] group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                  <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
          );
        })}
      </nav>
      {folderToDelete && (
        <DeleteFolderModal
          folderName={folderToDelete.name}
          onClose={() => setFolderToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </aside>
  );
}
