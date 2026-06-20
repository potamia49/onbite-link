"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/app/_lib/mock-data";
import { useLinks } from "@/components/LinksContext";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const router = useRouter();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl || !folderId || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(trimmedUrl)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "오픈그래프 정보를 가져오지 못했습니다.");
      }

      addLink({
        folderId,
        url: data.url,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
      });

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "오픈그래프 정보를 가져오지 못했습니다."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="input-field rounded-md px-3 py-2 text-base"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folderId"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folderId"
          name="folderId"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="input-field rounded-md px-3 py-2 text-base"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-2 self-start rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        {isSubmitting ? "확인 중..." : "확인"}
      </button>
    </form>
  );
}
