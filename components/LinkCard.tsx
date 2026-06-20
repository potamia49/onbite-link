import type { LinkItem } from "@/app/_lib/mock-data";

export default function LinkCard({ link }: { link: LinkItem }) {
  const href = /^https?:\/\//i.test(link.url) ? link.url : `https://${link.url}`;
  const displayUrl = link.url.replace(/^https?:\/\//i, "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col overflow-hidden rounded-lg border border-[var(--border)]"
    >
      {link.thumbnail ? (
        <img
          src={link.thumbnail}
          alt={link.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-[var(--hover-bg)] text-2xl font-semibold text-[var(--text-sub)]">
          {link.title.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col gap-1 px-4 py-3">
        <p className="truncate text-sm font-semibold text-[var(--text)]">
          {link.title}
        </p>
        <p className="truncate text-xs text-[var(--text-sub)]">{displayUrl}</p>
        <p className="truncate text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
      </div>
    </a>
  );
}
