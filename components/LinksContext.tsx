"use client";

import { createContext, useContext, useState } from "react";
import type { LinkItem } from "@/app/_lib/mock-data";

type NewLinkInput = {
  folderId: string;
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
};

type EditLinkInput = {
  folderId: string;
  title: string;
  description: string;
};

type LinksContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, input: EditLinkInput) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState(initialLinks);

  function addLink(input: NewLinkInput) {
    const link: LinkItem = { id: `link-${Date.now()}`, ...input };
    setLinks((prev) => [...prev, link]);
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  function updateLink(id: string, input: EditLinkInput) {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...input } : link))
    );
  }

  return (
    <LinksContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
