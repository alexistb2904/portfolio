import { cookies, headers } from "next/headers";

export type Locale = "en" | "fr";

/** Used only by the temporary redirect at `/`; localized documents never vary by IP or browser language. */
export async function getRequestLocale(): Promise<Locale> {
	const cookieStore = await cookies();
	const savedLocale = cookieStore.get("portfolio-locale")?.value;

	if (savedLocale === "fr" || savedLocale === "en") {
		return savedLocale;
	}

	const headerStore = await headers();
	const acceptedLanguages = headerStore.get("accept-language") ?? "";
	const primaryLanguage = acceptedLanguages.split(",")[0]?.trim().toLowerCase();

	return primaryLanguage?.startsWith("fr") ? "fr" : "en";
}
