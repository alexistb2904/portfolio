"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { content, type PortfolioCopy } from "@/content/content";
import type { Locale } from "@/lib/locale";

interface LanguageContextValue {
	locale: Locale;
	copy: PortfolioCopy;
	toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
	const [locale, setLocale] = useState<Locale>(initialLocale);

	const toggleLocale = useCallback(() => {
		setLocale((current) => {
			const nextLocale = current === "en" ? "fr" : "en";
			document.documentElement.lang = nextLocale;
			document.cookie = `portfolio-locale=${nextLocale}; max-age=31536000; path=/; samesite=lax`;
			return nextLocale;
		});
	}, []);

	const value = useMemo(() => ({ locale, copy: content[locale], toggleLocale }), [locale, toggleLocale]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error("useLanguage must be used inside LanguageProvider");
	}

	return context;
}
