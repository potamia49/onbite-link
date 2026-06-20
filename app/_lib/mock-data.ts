export type Folder = {
  id: string;
  name: string;
};

export type LinkItem = {
  id: string;
  folderId: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "reading", name: "읽을거리" },
];

export const links: LinkItem[] = [
  {
    id: "1",
    folderId: "dev",
    title: "Next.js Docs",
    url: "nextjs.org",
    description: "Next.js 공식 문서",
  },
  {
    id: "2",
    folderId: "dev",
    title: "MDN Web Docs",
    url: "developer.mozilla.org",
    description: "웹 표준 기술 문서",
  },
  {
    id: "3",
    folderId: "design",
    title: "Dribbble",
    url: "dribbble.com",
    description: "디자인 레퍼런스 모음",
  },
  {
    id: "4",
    folderId: "design",
    title: "Figma",
    url: "figma.com",
    description: "협업 디자인 툴",
  },
  {
    id: "5",
    folderId: "reading",
    title: "Velog",
    url: "velog.io",
    description: "개발자 블로그 플랫폼",
  },
  {
    id: "6",
    folderId: "reading",
    title: "GeekNews",
    url: "news.hada.io",
    description: "기술/스타트업 소식",
  },
];
