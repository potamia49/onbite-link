"use client";

import { useState } from "react";
import type { LinkItem } from "@/app/_lib/mock-data";
import { useLinks } from "@/components/LinksContext";
import { useFolders } from "@/components/FoldersContext";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";

export default function LinkCard({ link }: { link: LinkItem }) {
  const { removeLink, updateLink } = useLinks();
  const { folders } = useFolders();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const href = /^https?:\/\//i.test(link.url) ? link.url : `https://${link.url}`;
  const displayUrl = link.url.replace(/^https?:\/\//i, "");

  return (
    <div className="group relative">
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsEditModalOpen(true);
        }}
        aria-label={`${link.title} 링크 수정`}
        className="absolute right-10 top-2 rounded-md bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
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
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        aria-label={`${link.title} 링크 삭제`}
        className="absolute right-2 top-2 rounded-md bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
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
      {isDeleteModalOpen && (
        <DeleteLinkModal
          linkTitle={link.title}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            removeLink(link.id);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && (
        <EditLinkModal
          folders={folders}
          initialFolderId={link.folderId}
          initialTitle={link.title}
          initialDescription={link.description}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(input) => {
            updateLink(link.id, input);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
