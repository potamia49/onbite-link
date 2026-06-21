"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

export default function NewFolderModal({
  onClose,
  onCreate,
  isSubmitting,
}: {
  onClose: () => void;
  onCreate: (name: string) => void;
  isSubmitting: boolean;
}) {
  const [name, setName] = useState("");

  function handleSubmit() {
    if (isSubmitting) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed);
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
          새 폴더
        </h2>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="folder-name"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="input-field rounded-md px-3 py-2 text-base"
          />
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
            disabled={!name.trim() || isSubmitting}
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
