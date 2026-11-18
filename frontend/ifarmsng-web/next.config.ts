import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Production: static export (./out), served by the Rust backend.
// Development: `next dev` on :3001 proxies /api/* to the Rust server on :3000,
// so the browser sees one origin and no CORS setup is needed.
const nextConfig: NextConfig = isDev
  ? {
      async rewrites() {
        const api = process.env.RUST_API_URL ?? "http://127.0.0.1:3000";
        return [{ source: "/api/:path*", destination: `${api}/api/:path*` }];
      },
    }
  : {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    };

export default nextConfig;
