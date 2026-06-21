"use client";

import { createContext, useContext, useState } from "react";
import type { LinkItem } from "@/app/_lib/mock-data";
import { createClient } from "@/utils/supabase/client";

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
  addLink: (input: NewLinkInput) => Promise<void>;
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

  async function addLink(input: NewLinkInput) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: input.url,
        title: input.title,
        description: input.description,
        thumbnail_url: input.thumbnail || null,
        folder_id: Number(input.folderId),
      })
      .select()
      .single();

    if (error || !data) {
      throw error;
    }

    const link: LinkItem = {
      id: String(data.id),
      folderId: String(data.folder_id),
      title: data.title ?? "",
      url: data.url,
      description: data.description ?? "",
      thumbnail: data.thumbnail_url ?? undefined,
    };
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
