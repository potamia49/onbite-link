import type { LinkItem } from "@/app/_lib/mock-data";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={`https://${link.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="flex aspect-video items-center justify-center bg-zinc-100 text-2xl font-semibold text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600">
        {link.title.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col gap-1 px-4 py-3">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {link.title}
        </p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {link.url}
        </p>
        <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
          {link.description}
        </p>
      </div>
    </a>
  );
}
