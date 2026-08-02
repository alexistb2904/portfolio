import type { Locale } from "@/lib/locale";

export const supportedLocales = ["fr", "en"] as const satisfies readonly Locale[];

export const localizedRoutes = {
	home: { fr: "/fr", en: "/en" },
} as const;

export type LocalizedRoute = keyof typeof localizedRoutes;

export function isLocale(value: string): value is Locale {
	return supportedLocales.includes(value as Locale);
}

export function getLocalizedPath(locale: Locale, route: LocalizedRoute = "home") {
	return localizedRoutes[route][locale];
}

/**
 * Maps an existing localized URL to its equivalent. The current portfolio has
 * one localized page; keeping this in one place makes future localized routes
 * explicit instead of scattering string replacements through components.
 */
export function getAlternatePath(pathname: string, targetLocale: Locale) {
	const sourceLocale = pathname.split("/")[1];

	if (!isLocale(sourceLocale)) return getLocalizedPath(targetLocale);

	const matchingRoute = (Object.keys(localizedRoutes) as LocalizedRoute[]).find(
		(route) => localizedRoutes[route][sourceLocale] === pathname
	);

	return matchingRoute ? getLocalizedPath(targetLocale, matchingRoute) : getLocalizedPath(targetLocale);
}
