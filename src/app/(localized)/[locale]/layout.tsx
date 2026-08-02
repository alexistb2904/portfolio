import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { anybody, geologica } from "@/app/fonts";
import { getPageMetadata, getPortfolioStructuredData, siteUrl } from "@/lib/seo";
import { isLocale, supportedLocales } from "@/lib/routes";
import "../../globals.css";

type LocaleLayoutProps = Readonly<{ children: React.ReactNode; params?: Promise<{ locale: string }> }>;

export function generateStaticParams() {
	return supportedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
	const { locale = "en" } = (await params) ?? {};
	if (!isLocale(locale)) return {};

	return {
		metadataBase: new URL(siteUrl),
		icons: { icon: "/logo.svg" },
		manifest: `/${locale}/manifest.webmanifest`,
		...getPageMetadata(locale),
	};
}

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#090909",
	width: "device-width",
	initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale = "" } = (await params) ?? {};
	if (!isLocale(locale)) notFound();

	const structuredData = getPortfolioStructuredData(locale);

	return (
		<html lang={locale} className="dark">
			<body className={`${anybody.variable} ${geologica.variable}`}>
				{children}
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			</body>
		</html>
	);
}
