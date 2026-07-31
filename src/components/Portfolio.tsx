"use client";

import type { Locale } from "@/lib/locale";
import { LanguageProvider, useLanguage } from "./LanguageProvider";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { ProjectShowcase } from "./ProjectShowcase";
import { Profile } from "./Profile";
import { Capabilities } from "./Capabilities";
import { Lab } from "./Lab";
import { Journey } from "./Journey";
import { Contact } from "./Contact";
import { Preloader } from "./Preloader";
import { SmoothScroll } from "./SmoothScroll";
import { StageCursor } from "./StageCursor";

function PortfolioContent() {
	const { copy } = useLanguage();

	return (
		<>
			<a className="skip-link" href="#main-content">
				{copy.skip}
			</a>
			<Preloader />
			<SmoothScroll />
			<StageCursor />
			<Navigation />
			<main id="main-content">
				<Hero />
				<ProjectShowcase />
				<Profile />
				<Capabilities />
				<Lab />
				<Journey />
				<Contact />
			</main>
		</>
	);
}

export function Portfolio({ initialLocale }: { initialLocale: Locale }) {
	return (
		<LanguageProvider initialLocale={initialLocale}>
			<PortfolioContent />
		</LanguageProvider>
	);
}
