"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 px-4 py-6 dark:border-zinc-800">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
            pathname === "/"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
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
              className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
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
