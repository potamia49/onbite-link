"use client";

import LinkGrid from "@/components/LinkGrid";
import { useLinks } from "@/components/LinksContext";

export default function Home() {
  const { links } = useLinks();

  return <LinkGrid links={links} />;
}
