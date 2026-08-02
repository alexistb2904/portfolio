import type { Metadata } from "next";
import { content } from "@/content/content";
import type { Locale } from "@/lib/locale";
import { getLocalizedPath } from "@/lib/routes";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexistb2904.vercel.app").replace(/\/$/, "");

type SeoCopy = {
	title: string;
	description: string;
	ogTitle: string;
	ogDescription: string;
	personJobTitle: string;
	websiteDescription: string;
	breadcrumb: string;
};

const seoCopy: Record<Locale, SeoCopy> = {
	fr: {
		title: "Développeur full-stack à Paris | Alexis Thierry-Bellefond",
		description: "Portfolio d'Alexis Thierry-Bellefond, développeur full-stack à Paris. Applications web et mobiles avec React, TypeScript, Node.js et React Native.",
		ogTitle: "Alexis Thierry-Bellefond - Développeur full-stack",
		ogDescription: "Applications web, mobiles et logicielles conçues de l'interface au déploiement.",
		personJobTitle: "Développeur full-stack",
		websiteDescription: "Portfolio d'un développeur full-stack basé à Paris.",
		breadcrumb: "Accueil",
	},
	en: {
		title: "Full-Stack Web Developer in Paris | Alexis Thierry-Bellefond",
		description:
			"Portfolio of Alexis Thierry-Bellefond, a full-stack developer in Paris building web and mobile applications with React, TypeScript, Node.js and React Native.",
		ogTitle: "Alexis Thierry-Bellefond - Full-Stack Developer",
		ogDescription: "Web, mobile and software products built from interface to deployment.",
		personJobTitle: "Full-Stack Developer",
		websiteDescription: "Portfolio of a full-stack developer based in Paris.",
		breadcrumb: "Home",
	},
};

export function absoluteUrl(path: string) {
	return new URL(path, `${siteUrl}/`).toString();
}

export function getPageMetadata(locale: Locale): Metadata {
	const copy = seoCopy[locale];
	const path = getLocalizedPath(locale);
	const url = absoluteUrl(path);
	const alternateLocale = locale === "fr" ? "en" : "fr";

	return {
		title: copy.title,
		description: copy.description,
		robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
		alternates: {
			canonical: path,
			languages: {
				fr: getLocalizedPath("fr"),
				en: getLocalizedPath("en"),
				"x-default": "/",
			},
		},
		openGraph: {
			type: "website",
			url,
			siteName: "Alexis Thierry-Bellefond",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			alternateLocale: alternateLocale === "fr" ? "fr_FR" : "en_US",
			title: copy.ogTitle,
			description: copy.ogDescription,
			images: [{ url: absoluteUrl(`${path}/social-image`), width: 1200, height: 630, alt: copy.ogTitle }],
		},
		twitter: {
			card: "summary_large_image",
			title: copy.ogTitle,
			description: copy.ogDescription,
			images: [absoluteUrl(`${path}/social-image`)],
		},
	};
}

export function getPortfolioStructuredData(locale: Locale) {
	const copy = seoCopy[locale];
	const portfolio = content[locale];
	const path = getLocalizedPath(locale);
	const pageUrl = absoluteUrl(path);

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": `${siteUrl}/#person`,
				name: "Alexis Thierry-Bellefond",
				url: pageUrl,
				jobTitle: copy.personJobTitle,
				address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
				sameAs: ["https://github.com/alexistb2904", "https://www.linkedin.com/in/alexistb/"],
			},
			{
				"@type": "WebSite",
				"@id": `${siteUrl}/#website`,
				url: pageUrl,
				name: "Alexis Thierry-Bellefond",
				inLanguage: locale,
				description: copy.websiteDescription,
			},
			{
				"@type": "WebPage",
				"@id": `${pageUrl}#webpage`,
				url: pageUrl,
				name: copy.title,
				inLanguage: locale,
				isPartOf: { "@id": `${siteUrl}/#website` },
				about: { "@id": `${siteUrl}/#person` },
				description: copy.description,
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [{ "@type": "ListItem", position: 1, name: copy.breadcrumb, item: pageUrl }],
			},
			{
				"@type": "ItemList",
				name: portfolio.work.title.replace("\n", " "),
				itemListElement: portfolio.work.projects.map((project, index) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "CreativeWork",
						name: project.title,
						description: project.description,
						image: absoluteUrl(typeof project.images[0]?.src === "string" ? project.images[0].src : "/logo.svg"),
					},
				})),
			},
		],
	};
}
