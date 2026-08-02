"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { getAlternatePath } from "@/lib/routes";

const languageNames: Record<Locale, string> = { fr: "Français", en: "English" };

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
	const pathname = usePathname();
	const targetLocale = locale === "fr" ? "en" : "fr";
	const targetPath = getAlternatePath(pathname, targetLocale);

	const preserveHash = (event: MouseEvent<HTMLAnchorElement>) => {
		document.cookie = `portfolio-locale=${targetLocale}; max-age=31536000; path=/; samesite=lax`;
		if (!window.location.hash || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

		event.preventDefault();
		window.location.assign(`${targetPath}${window.location.hash}`);
	};

	return (
		<nav className="language-switch" aria-label={label}>
			<Link href={targetPath} lang={targetLocale} onClick={preserveHash}>
				<span className="language-face">{languageNames[targetLocale]}</span>
			</Link>
		</nav>
	);
}
