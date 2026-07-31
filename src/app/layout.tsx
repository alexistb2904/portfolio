import type { Metadata, Viewport } from "next";
import { Anybody, Geologica } from "next/font/google";
import { getRequestLocale } from "@/lib/locale";
import "./globals.css";

const anybody = Anybody({
	subsets: ["latin"],
	weight: "variable",
	axes: ["wdth"],
	variable: "--font-anybody",
	display: "swap",
});

const geologica = Geologica({
	subsets: ["latin"],
	weight: "variable",
	variable: "--font-geologica",
	display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexistb2904.vercel.app";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Alexis Thierry-Bellefond - Creative Developer & Engineer",
		template: "%s - Alexis Thierry-Bellefond",
	},
	description: "Creative full-stack developer building web, mobile and software products - from interface to runtime.",
	keywords: ["Alexis Thierry-Bellefond", "creative developer", "full-stack developer", "software engineer", "React", "Next.js", "React Native", "Paris"],
	authors: [{ name: "Alexis Thierry-Bellefond", url: siteUrl }],
	creator: "Alexis Thierry-Bellefond",
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "en_US",
		alternateLocale: "fr_FR",
		url: siteUrl,
		siteName: "Alexis Thierry-Bellefond",
		title: "Alexis - Creative Developer & Engineer",
		description: "Full-stack developer creating web, mobile and software products - from interface to runtime.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Alexis - Creative Developer & Engineer",
		description: "Full-stack developer creating web, mobile and software products.",
	},
	icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#090909",
	width: "device-width",
	initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const locale = await getRequestLocale();

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Alexis Thierry-Bellefond",
		url: siteUrl,
		jobTitle: "Creative Full-Stack Developer",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Paris",
			addressCountry: "FR",
		},
		sameAs: ["https://github.com/alexistb2904", "https://www.linkedin.com/in/alexistb/"],
		alumniOf: [
			{ "@type": "CollegeOrUniversity", name: "EPITA" },
			{ "@type": "EducationalOrganization", name: "Campus Montsouris" },
		],
	};

	return (
		<html lang={locale} className="dark" suppressHydrationWarning>
			<body className={`${anybody.variable} ${geologica.variable}`}>
				{children}
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			</body>
		</html>
	);
}
