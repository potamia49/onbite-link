"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-[var(--error)] px-4 py-3 text-sm font-medium text-white shadow-lg">
      {message}
    </div>,
    document.body
  );
}
