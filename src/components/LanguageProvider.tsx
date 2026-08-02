"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { content, type PortfolioCopy } from "@/content/content";
import type { Locale } from "@/lib/locale";

interface LanguageContextValue {
	locale: Locale;
	copy: PortfolioCopy;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
	const value = useMemo(() => ({ locale: initialLocale, copy: content[initialLocale] }), [initialLocale]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error("useLanguage must be used inside LanguageProvider");
	}

	return context;
}
