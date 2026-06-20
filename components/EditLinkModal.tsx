"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { Folder } from "@/app/_lib/mock-data";

export default function EditLinkModal({
  folders,
  initialFolderId,
  initialTitle,
  initialDescription,
  onClose,
  onSave,
}: {
  folders: Folder[];
  initialFolderId: string;
  initialTitle: string;
  initialDescription: string;
  onClose: () => void;
  onSave: (input: { folderId: string; title: string; description: string }) => void;
}) {
  const [folderId, setFolderId] = useState(initialFolderId);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  function handleSubmit() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !folderId) return;
    onSave({ folderId, title: trimmedTitle, description: description.trim() });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-base font-semibold text-[var(--text)]">
          링크 수정
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="edit-link-folder"
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
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-title"
              className="text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="edit-link-title"
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="링크 제목을 입력하세요"
              className="input-field rounded-md px-3 py-2 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-description"
              className="text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-link-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="링크 설명을 입력하세요"
              rows={3}
              className="input-field rounded-md px-3 py-2 text-base"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary rounded-md px-4 py-2 text-sm font-medium"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="btn-primary rounded-md px-4 py-2 text-sm font-medium"
          >
            저장
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
