import type { MetadataRoute } from "next";
import { isLocale } from "@/lib/routes";

export default async function manifest({ params }: { params?: Promise<{ locale: string }> } = {}): Promise<MetadataRoute.Manifest> {
	const { locale = "en" } = (await params) ?? {};
	const isFrench = isLocale(locale) && locale === "fr";

	return {
		name: isFrench ? "Alexis Thierry-Bellefond - Développeur full-stack" : "Alexis Thierry-Bellefond - Full-Stack Developer",
		short_name: "Alexis / ATB",
		description: isFrench
			? "Portfolio d'un développeur full-stack basé à Paris. Étudiant en informatique et en alternance chez AXA France."
			: "Portfolio of a full-stack developer based in Paris. Computer science student and apprentice at AXA France.",
		start_url: isFrench ? "/fr" : "/en",
		display: "standalone",
		background_color: "#090909",
		theme_color: "#090909",
		icons: [
			{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
			{ src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
			{ src: "/android-chrome-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
		],
	};
}
