"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Toast({
  message,
  onClose,
  variant = "error",
}: {
  message: string;
  onClose: () => void;
  variant?: "error" | "success";
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = variant === "success" ? "var(--success)" : "var(--error)";

  return createPortal(
    <div
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg"
      style={{ backgroundColor: bgColor }}
    >
      {message}
    </div>,
    document.body
  );
}
