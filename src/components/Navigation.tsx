"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { siteBrand } from "@/config/brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Navigation() {
	const { copy, locale } = useLanguage();
	const [menuOpen, setMenuOpen] = useState(false);
	const root = useRef<HTMLElement>(null);
	const progress = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		document.body.classList.toggle("menu-open", menuOpen);
		return () => document.body.classList.remove("menu-open");
	}, [menuOpen]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	useEffect(() => {
		const mobileViewport = window.matchMedia("(max-width: 1020px)");
		const closeOnDesktop = () => {
			if (!mobileViewport.matches) setMenuOpen(false);
		};

		mobileViewport.addEventListener("change", closeOnDesktop);
		return () => mobileViewport.removeEventListener("change", closeOnDesktop);
	}, []);

	useGSAP(
		() => {
			if (!progress.current) return;
			gsap.fromTo(
				progress.current,
				{ scaleX: 0 },
				{
					scaleX: 1,
					ease: "none",
					scrollTrigger: {
						trigger: document.documentElement,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.2,
					},
				}
			);
		},
		{ scope: root }
	);

	return (
		<header ref={root} className={`site-header ${menuOpen ? "is-open" : ""}`}>
			<span ref={progress} className="scroll-progress" aria-hidden="true" />

			<a className="brand" href="#top" aria-label={copy.brand.homeLabel}>
				<span className={`brand-logo-slot${siteBrand.logoSrc ? " has-custom-logo" : ""}`} aria-hidden="true">
					{siteBrand.logoSrc ? (
						<Image src={siteBrand.logoSrc} alt="" width={35} height={35} sizes="35px" />
					) : (
						<>
							<i>LOGO</i>
							<b />
						</>
					)}
				</span>
				<span className="brand-lockup">
					<strong>Alexis Thierry-Bellefond </strong>
					<small>
						{copy.brand.role} / {new Date().getFullYear()}
					</small>
				</span>
			</a>

			<nav className="desktop-nav" aria-label={copy.brand.primaryNavigation}>
				{copy.nav.map((item, index) => (
					<a key={item.href} href={item.href}>
						<span>{(index + 1).toString().padStart(2, "0")}</span>
						{item.label}
					</a>
				))}
			</nav>

			<nav className="header-socials" aria-label={copy.brand.externalProfiles}>
				<a href="https://github.com/alexistb2904" target="_blank" rel="noreferrer" aria-label={`GitHub - ${copy.brand.newTab}`} data-cursor-label="GITHUB">
					<Github aria-hidden="true" />
				</a>
				<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noreferrer" aria-label={`LinkedIn - ${copy.brand.newTab}`} data-cursor-label="LINKEDIN">
					<Linkedin aria-hidden="true" />
				</a>
			</nav>

			<div className="header-actions">
				<LanguageSwitcher locale={locale} label={copy.language.selector} />
				<button
					className="menu-toggle"
					type="button"
					onClick={() => setMenuOpen((value) => !value)}
					aria-expanded={menuOpen}
					aria-controls="mobile-navigation"
					aria-label={menuOpen ? copy.menu.close : copy.menu.open}>
					{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
				</button>
			</div>

			<div id="mobile-navigation" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
				<div className="mobile-machine-word" aria-hidden="true">
					INDEX
				</div>
				<nav aria-label="Mobile navigation">
					{copy.nav.map((item, index) => (
						<a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
							<span>{(index + 1).toString().padStart(2, "0")}</span>
							<strong>{item.label}</strong>
							<ArrowUpRight aria-hidden="true" />
						</a>
					))}
				</nav>
				<div className="mobile-menu-footer">
					<span>Alexis Thierry-Bellefond</span>
					<div className="mobile-menu-socials">
						<a href="https://github.com/alexistb2904" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
							GitHub <ArrowUpRight aria-hidden="true" />
						</a>
						<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
							LinkedIn <ArrowUpRight aria-hidden="true" />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}
