import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;
  const rel = normalize(path.join("/"));
  const dir = process.env.CUTIEPAGE_ASSETS_DIR;
  if (!dir || rel.startsWith("..")) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const bytes = await readFile(join(dir, rel));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "content-type": TYPES[extname(rel).toLowerCase()] ?? "application/octet-stream",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
