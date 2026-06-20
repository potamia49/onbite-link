import Link from "next/link";

export default function Header() {
  return (
    <header className="nav-bar sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] px-4">
      <span className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </span>
      <Link
        href="/new"
        className="btn-primary rounded-md px-4 py-2 text-sm font-medium"
      >
        + 새 링크
      </Link>
    </header>
  );
}
