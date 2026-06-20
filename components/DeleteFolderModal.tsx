"use client";

import { createPortal } from "react-dom";

export default function DeleteFolderModal({
  folderName,
  onClose,
  onConfirm,
}: {
  folderName: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-base font-semibold text-[var(--text)]">
          폴더 삭제
        </h2>
        <p className="text-sm text-[var(--text-sub)]">
          {`'${folderName}' 폴더를 삭제하시겠습니까?`}
        </p>
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
            onClick={onConfirm}
            className="btn-primary rounded-md px-4 py-2 text-sm font-medium"
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
