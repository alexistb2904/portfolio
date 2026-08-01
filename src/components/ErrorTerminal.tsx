"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";

type ErrorTerminalProps = {
	kind: "not-found" | "error";
	retry?: () => void;
	initialLocale?: Locale;
};

const copy = {
	fr: {
		"not-found": {
			code: "404",
			status: "ROUTE INTROUVABLE",
			title: "Mauvais\nchemin.",
			body: "Cette partie du portfolio n'existe pas ou elle a changé de place pendant que vous arriviez.",
			action: "Retour au portfolio",
			meta: "Module introuvable",
		},
		error: {
			code: "500",
			status: "ERREUR INTERNE",
			title: "La machine\na calé.",
			body: "Un incident temporaire a interrompu cette séquence. Relancez le module, ou revenez à l'accueil.",
			action: "Recharger la page",
			meta: "Incident détecté",
		},
		diagnostic: "Diagnostic",
		route: "Route demandée",
		home: "Accueil",
		switchTo: "Passer en anglais",
	},
	en: {
		"not-found": {
			code: "404",
			status: "ROUTE NOT FOUND",
			title: "Wrong\nturn.",
			body: "This part of the portfolio does not exist, or it moved while you were on your way here.",
			action: "Back to portfolio",
			meta: "Module not found",
		},
		error: {
			code: "500",
			status: "INTERNAL ERROR",
			title: "The machine\nstalled.",
			body: "A temporary incident interrupted this sequence. Restart the module, or return to the home page.",
			action: "Reload page",
			meta: "Incident detected",
		},
		diagnostic: "Diagnostic",
		route: "Requested route",
		home: "Home",
		switchTo: "Switch to French",
	},
} as const;

export function ErrorTerminal({ kind, retry, initialLocale }: ErrorTerminalProps) {
	const [pulse, setPulse] = useState(false);
	const [locale, setLocale] = useState<Locale>(() => {
		if (initialLocale) return initialLocale;
		return typeof document !== "undefined" && document.documentElement.lang === "fr" ? "fr" : "en";
	});
	const path = usePathname();
	const messages = copy[locale];
	const content = messages[kind];

	useEffect(() => {
		const timer = window.setInterval(() => setPulse((value) => !value), 1300);
		return () => window.clearInterval(timer);
	}, []);

	const toggleLocale = () => {
		const nextLocale = locale === "en" ? "fr" : "en";
		setLocale(nextLocale);
		document.documentElement.lang = nextLocale;
		document.cookie = `portfolio-locale=${nextLocale}; max-age=31536000; path=/; samesite=lax`;
	};

	return (
		<main className="error-terminal" aria-labelledby="error-title">
			<div className="error-terminal__grid" aria-hidden="true" />
			<div className="error-terminal__rail" aria-hidden="true">
				<span>ALEXIS THIERRY-BELLFOND</span>
				<span>PARIS — {locale.toUpperCase()}</span>
			</div>
			<button className="error-terminal__language" type="button" onClick={toggleLocale} aria-label={messages.switchTo}>
				{locale.toUpperCase()} / {locale === "en" ? "FR" : "EN"}
			</button>

			<section className="error-terminal__panel">
				<div className="error-terminal__stamp">
					<span className={pulse ? "is-pulsing" : ""} />
					{content.status}
				</div>

				<p className="error-terminal__code" aria-hidden="true">
					{content.code}
				</p>

				<div className="error-terminal__copy">
					<p className="error-terminal__index">ER//{kind === "not-found" ? "01" : "02"}</p>
					<h1 id="error-title">
						{content.title.split("\n").map((line) => (
							<span key={line}>{line}</span>
						))}
					</h1>
					<p>{content.body}</p>
				</div>

				<div className="error-terminal__actions">
					{retry ? (
						<button type="button" className="error-terminal__action error-terminal__action--primary" onClick={retry}>
							<RefreshCw aria-hidden="true" />
							{content.action}
						</button>
					) : (
						<Link className="error-terminal__action error-terminal__action--primary" href="/">
							<ArrowLeft aria-hidden="true" />
							{content.action}
						</Link>
					)}
					{retry && (
						<Link className="error-terminal__action" href="/">
							<ArrowLeft aria-hidden="true" />
							{messages.home}
						</Link>
					)}
				</div>
			</section>

			<aside className="error-terminal__diagnostic" aria-label={messages.diagnostic}>
				<div>
					<span>{messages.diagnostic}</span>
					<strong>{content.meta}</strong>
				</div>
				<div>
					<span>{messages.route}</span>
					<strong className="error-terminal__path">{path || "/"}</strong>
				</div>
			</aside>
		</main>
	);
}
