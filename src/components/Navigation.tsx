"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { siteBrand } from "@/config/brand";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Navigation() {
	const { copy, locale, toggleLocale } = useLanguage();
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

	const switchLanguage = () => {
		const label = root.current?.querySelector(".language-face");
		if (label && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.fromTo(label, { rotateX: -90 }, { rotateX: 0, duration: 0.45, ease: "back.out(1.4)" });
		}
		toggleLocale();
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => ScrollTrigger.refresh());
		});
	};

	return (
		<header ref={root} className={`site-header ${menuOpen ? "is-open" : ""}`}>
			<span ref={progress} className="scroll-progress" aria-hidden="true" />

			<a className="brand" href="#top" aria-label="ATB - Alexis Thierry-Bellefond - home">
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
					<small>Alternant Développeur Full-stack / {new Date().getFullYear()}</small>
				</span>
			</a>

			<nav className="desktop-nav" aria-label="Primary navigation">
				{copy.nav.map((item, index) => (
					<a key={item.href} href={item.href}>
						<span>{(index + 1).toString().padStart(2, "0")}</span>
						{item.label}
					</a>
				))}
			</nav>

			<nav className="header-socials" aria-label="External profiles">
				<a href="https://github.com/alexistb2904" target="_blank" rel="noreferrer" aria-label="GitHub — opens in a new tab" data-cursor-label="GITHUB">
					<Github aria-hidden="true" />
				</a>
				<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noreferrer" aria-label="LinkedIn — opens in a new tab" data-cursor-label="LINKEDIN">
					<Linkedin aria-hidden="true" />
				</a>
			</nav>

			<div className="header-actions">
				<button
					className="language-switch"
					type="button"
					onClick={switchLanguage}
					aria-label={`${locale.toUpperCase()} / ${copy.language.short} - ${copy.language.switchTo}`}>
					<span className="language-face">
						{locale.toUpperCase()} / {copy.language.short}
					</span>
				</button>
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
