"use client";

import { useRef, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function HeroWord({ className, children }: { className: string; children: string }) {
	return (
		<span className={`hero-word ${className}`} aria-hidden="true">
			<span className="hero-word-inner">
				{Array.from(children).map((letter, index) => (
					<span className="hero-letter" key={`${letter}-${index}`}>
						{letter === " " ? "\u00a0" : letter}
					</span>
				))}
			</span>
		</span>
	);
}

export function Hero() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!root.current) return;
			const compactViewport = window.matchMedia("(max-width: 720px)").matches;

			const eyebrow = root.current.querySelectorAll(".hero-eyebrow > *");
			const words = root.current.querySelectorAll(".hero-word-inner");
			const letters = root.current.querySelectorAll(".hero-letter");
			const blades = root.current.querySelectorAll(".machine-blade");
			const details = root.current.querySelectorAll(".hero-intro, .hero-actions, .hero-meta, .hero-scroll");

			gsap.set(eyebrow, { y: 24, autoAlpha: 0 });
			if (compactViewport) {
				gsap.set(letters, { y: 30, rotate: 3, autoAlpha: 0 });
			} else {
				gsap.set(words, { xPercent: 14, autoAlpha: 0 });
			}
			if (blades.length) gsap.set(blades, { xPercent: 55, rotate: 14, autoAlpha: 0 });
			gsap.set(details, { y: 28, autoAlpha: 0 });

			const createDesktopScroll = () => {
				if (compactViewport) return;

				gsap.to(".hero-word-a", {
					fontVariationSettings: '"wdth" 68',
					xPercent: -3,
					ease: "none",
					scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 },
				});
				gsap.to(".hero-word-b", {
					fontVariationSettings: '"wdth" 145',
					xPercent: 5,
					ease: "none",
					scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 },
				});
				gsap.to(".hero-word-c", {
					fontVariationSettings: '"wdth" 80',
					xPercent: -6,
					ease: "none",
					scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 },
				});
			};

			const startIntro = () => {
				const intro = gsap.timeline({ delay: 0.1, defaults: { ease: "power4.out" }, onComplete: createDesktopScroll });
				intro
					.to(eyebrow, { y: 0, autoAlpha: 1, duration: compactViewport ? 0.45 : 0.65, stagger: 0.08 })
					.to(
						compactViewport ? letters : words,
						compactViewport ? { y: 0, rotate: 0, autoAlpha: 1, duration: 0.5, stagger: 0.035 } : { xPercent: 0, autoAlpha: 1, duration: 0.95, stagger: 0.1 },
						"-=0.35"
					);

				if (blades.length) {
					intro.to(blades, { xPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.95, stagger: 0.1 }, "-=0.85");
				}

				intro.to(details, { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08 }, blades.length ? "-=0.6" : "-=0.25");
			};

			if (document.body.classList.contains("is-ready")) {
				startIntro();
				return;
			}

			const observer = new MutationObserver(() => {
				if (!document.body.classList.contains("is-ready")) return;
				observer.disconnect();
				startIntro();
			});
			observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

			return () => observer.disconnect();
		},
		{ scope: root }
	);

	const moveMachine = (event: PointerEvent<HTMLElement>) => {
		if (!root.current) return;
		const bounds = root.current.getBoundingClientRect();
		const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
		const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
		root.current.style.setProperty("--machine-x", x.toFixed(3));
		root.current.style.setProperty("--machine-y", y.toFixed(3));
	};

	const resetMachine = () => {
		root.current?.style.setProperty("--machine-x", "0");
		root.current?.style.setProperty("--machine-y", "0");
	};

	return (
		<section ref={root} id="top" className="hero" aria-labelledby="hero-title" data-cursor-tone="bone" onPointerMove={moveMachine} onPointerLeave={resetMachine}>
			<div className="hero-topline page-shell">
				<p className="hero-eyebrow">
					<span>{copy.hero.eyebrow}</span>
				</p>
				<p>{copy.hero.location}</p>
			</div>

			<div className="hero-stage page-shell">
				<h1 id="hero-title" className="hero-title" aria-label={`${copy.hero.titleA} ${copy.hero.titleB} ${copy.hero.titleC}`}>
					<HeroWord className="hero-word-a">{copy.hero.titleA}</HeroWord>
					<HeroWord className="hero-word-b">{copy.hero.titleB}</HeroWord>
					<HeroWord className="hero-word-c">{copy.hero.titleC}</HeroWord>
				</h1>
			</div>

			<div className="hero-bottom page-shell">
				<div className="hero-meta">
					<span>Alexis Thierry-Bellfond / {new Date().getFullYear()}</span>
					<span>{copy.hero.discipline}</span>
				</div>
				<div className="hero-copy-block">
					<p className="hero-intro">{copy.hero.intro}</p>
					<div className="hero-actions">
						<a className="action-link action-link-light" href="#work" data-cursor-label="OPEN">
							{copy.hero.primary}
							<ArrowDownRight aria-hidden="true" />
						</a>
						<a className="action-link action-link-plain" href="#contact">
							{copy.hero.secondary}
							<ArrowUpRight aria-hidden="true" />
						</a>
					</div>
				</div>
				<a className="hero-scroll" href="#work" aria-label={copy.hero.scroll}>
					<span>{copy.hero.scroll}</span>
					<i aria-hidden="true" />
				</a>
			</div>
		</section>
	);
}
