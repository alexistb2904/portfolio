import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getLocalizedPath, supportedLocales } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
	return supportedLocales.map((locale) => ({
		url: absoluteUrl(getLocalizedPath(locale)),
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 1,
		alternates: {
			languages: {
				fr: absoluteUrl(getLocalizedPath("fr")),
				en: absoluteUrl(getLocalizedPath("en")),
			},
		},
	}));
}
