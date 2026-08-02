import type { Metadata, Viewport } from "next";
import { anybody, geologica } from "@/app/fonts";
import { siteUrl } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	robots: { index: false, follow: true },
	icons: { icon: "/logo.svg" },
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
