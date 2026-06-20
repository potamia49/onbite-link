import type { LinkItem } from "@/app/_lib/mock-data";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={`https://${link.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col overflow-hidden rounded-lg border border-[var(--border)]"
    >
      <div className="flex aspect-video items-center justify-center bg-[var(--hover-bg)] text-2xl font-semibold text-[var(--text-sub)]">
        {link.title.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col gap-1 px-4 py-3">
        <p className="truncate text-sm font-semibold text-[var(--text)]">
          {link.title}
        </p>
        <p className="truncate text-xs text-[var(--text-sub)]">{link.url}</p>
        <p className="truncate text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
      </div>
    </a>
  );
}
