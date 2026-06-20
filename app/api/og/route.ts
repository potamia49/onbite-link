import { NextRequest, NextResponse } from "next/server";

function extractMetaContent(html: string, key: string): string | undefined {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return undefined;
}

function extractTitleTag(html: string): string | undefined {
  return html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let targetUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = `https://${targetUrl}`;
  }

  let normalizedUrl: URL;
  try {
    normalizedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "유효하지 않은 URL입니다." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(normalizedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://onebite-link)",
      },
    });
    const html = await response.text();

    const title =
      extractMetaContent(html, "og:title") ||
      extractTitleTag(html) ||
      normalizedUrl.hostname;
    const description =
      extractMetaContent(html, "og:description") ||
      extractMetaContent(html, "description") ||
      "";
    const rawImage = extractMetaContent(html, "og:image") || "";

    let thumbnail = "";
    if (rawImage) {
      try {
        thumbnail = new URL(rawImage, normalizedUrl).toString();
      } catch {
        thumbnail = "";
      }
    }

    return NextResponse.json({
      title: decodeHtmlEntities(title),
      description: decodeHtmlEntities(description),
      thumbnail,
      url: normalizedUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "오픈그래프 정보를 가져오지 못했습니다." },
      { status: 502 }
    );
  }
}
