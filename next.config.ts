import type { NextConfig } from "next";

/**
 * Trevona – statischer Export.
 * `npm run build` erzeugt den Ordner `out/`, der auf jedem Webhosting
 * (z. B. Hostpoint, Infomaniak, Netlify, Vercel) hochgeladen werden kann.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
