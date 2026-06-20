"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFolders } from "@/components/FoldersContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { folders } = useFolders();

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
            <Link
              key={folder.id}
              href={href}
              className={`nav-item rounded-md px-3 py-2 text-left text-sm font-medium ${
                isActive ? "nav-item-active" : "text-[var(--text-sub)]"
              }`}
            >
              {folder.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
