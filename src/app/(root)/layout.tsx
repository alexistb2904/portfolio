import type { Metadata, Viewport } from "next";
import { anybody, geologica } from "@/app/fonts";
import { siteUrl } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	robots: { index: false, follow: true },
	icons: {
		icon: [
			{ url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
		],
		apple: [{ url: "/icon-180x180.png", sizes: "180x180", type: "image/png" }],
		other: [{ rel: "icon", url: "/icon-512x512.webp", sizes: "512x512", type: "image/webp" }],
	},
};

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#090909",
	width: "device-width",
	initialScale: 1,
};

export default function RedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="dark">
			<body className={`${anybody.variable} ${geologica.variable}`}>{children}</body>
		</html>
	);
}
