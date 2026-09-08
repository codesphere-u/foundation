import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://pay.pesapal.com\" \"https://cybqa.pesapal.com\")",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://pay.pesapal.com https://cybqa.pesapal.com; frame-src 'self' https://pay.pesapal.com https://cybqa.pesapal.com; base-uri 'self'; form-action 'self';",
  },
];

const nextConfig: NextConfig = {
  // Dev-only: allow LAN phone preview + 127.0.0.1 (not covered by "localhost").
  // Without this, Next blocks /_next/* with Origin headers and client components never hydrate —
  // so only SSR links like Donate work and the hamburger stays dead.
  allowedDevOrigins: ["127.0.0.1", "192.168.1.5"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
