import { fileURLToPath } from "node:url";

/**
 * Dev-harness Next config. `npm run dev` runs Next against this directory;
 * the template itself lives in ../src and is what `cutiepage build` ships —
 * nothing in dev/ ends up in the package.
 */
const assetsDir = fileURLToPath(new URL("../assets", import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  // The SDK ships TypeScript source; let Next compile it.
  transpilePackages: ["@cutiepage/template-sdk"],
  env: { CUTIEPAGE_ASSETS_DIR: assetsDir },
};

export default nextConfig;
