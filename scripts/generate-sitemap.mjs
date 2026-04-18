import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");
const siteUrl = (env.VITE_SITE_URL || "https://alexistb2904.vercel.app").replace(/\/$/, "");
const now = new Date().toISOString();

const urls = [
	{
		loc: `${siteUrl}/`,
		changefreq: "weekly",
		priority: "1.0",
	},
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
	)
	.join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(process.cwd(), "public", "robots.txt"), robots, "utf8");
