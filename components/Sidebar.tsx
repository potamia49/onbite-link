"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useFolders } from "@/components/FoldersContext";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";
import type { Folder } from "@/app/_lib/mock-data";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { folders, removeFolder, renameFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

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

  async function handleConfirmEdit(name: string) {
    if (!folderToEdit) return;
    await renameFolder(folderToEdit.id, name);
    setFolderToEdit(null);
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
                className={`nav-item block rounded-md px-3 py-2 pr-14 text-left text-sm font-medium ${
                  isActive ? "nav-item-active" : "text-[var(--text-sub)]"
                }`}
              >
                {folder.name}
              </Link>
              <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFolderToEdit(folder);
                  }}
                  aria-label={`${folder.name} 폴더 수정`}
                  className="rounded-md p-1 text-[var(--text-sub)] hover:text-[var(--text)]"
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
                    <path d="M16.862 3.487a2 2 0 0 1 2.828 2.828L8.5 17.5l-4 1 1-4 11.362-11.013Z" />
                    <path d="M15 5l4 4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFolderToDelete(folder);
                  }}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="rounded-md p-1 text-[var(--text-sub)] hover:text-[var(--text)]"
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
      {folderToEdit && (
        <EditFolderModal
          initialName={folderToEdit.name}
          onClose={() => setFolderToEdit(null)}
          onSave={handleConfirmEdit}
        />
      )}
    </aside>
  );
}
