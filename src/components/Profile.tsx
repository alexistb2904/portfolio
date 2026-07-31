"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Profile() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!root.current) return;

			const headline = root.current.querySelectorAll(".profile-headline span");
			const content = root.current.querySelectorAll(".method-content > *");
			const layers = root.current.querySelectorAll(".method-layer");
			gsap.set(headline, { yPercent: 110 });
			gsap.set(content, { y: 45, autoAlpha: 0 });
			gsap.set(layers, { xPercent: (index) => (index % 2 === 0 ? -90 : 90), autoAlpha: 0 });

			ScrollTrigger.create({
				trigger: ".profile-headline",
				start: "top 78%",
				once: true,
				onEnter: () =>
					gsap.to(headline, {
						yPercent: 0,
						duration: 1,
						stagger: 0.12,
						ease: "power4.out",
					}),
			});
			ScrollTrigger.create({
				trigger: ".method-content",
				start: "top 76%",
				once: true,
				onEnter: () =>
					gsap.to(content, {
						y: 0,
						autoAlpha: 1,
						duration: 0.75,
						stagger: 0.1,
						ease: "power3.out",
					}),
			});
			ScrollTrigger.create({
				trigger: ".method-machine",
				start: "top 72%",
				once: true,
				onEnter: () =>
					gsap.to(layers, {
						xPercent: 0,
						autoAlpha: 1,
						duration: 1.05,
						stagger: 0.09,
						ease: "power4.out",
					}),
			});
		},
		{ scope: root }
	);

	return (
		<section ref={root} id="profile" className="profile-section" aria-labelledby="profile-title" data-cursor-tone="bone">
			<div className="page-shell">
				<div className="section-cue section-cue-light">
					<span>{copy.profile.index}</span>
					<p>{copy.profile.label}</p>
				</div>

				<h2 id="profile-title" className="profile-headline">
					<span>{copy.profile.headlineA}</span>
					<span>{copy.profile.headlineB}</span>
				</h2>

				<div className="method-layout">
					<div className="method-machine" aria-hidden="true">
						{["SURFACE", "LOGIC", "DATA", "RUNTIME"].map((layer, index) => (
							<div key={layer} className={`method-layer method-layer-${index + 1}`}>
								<span>0{index + 1}</span>
								<strong>{layer}</strong>
								<i />
							</div>
						))}
					</div>

					<div className="method-content">
						<div className="profile-copy">
							{copy.profile.paragraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>

						<ol className="principles-list">
							{copy.profile.principles.map((principle, index) => (
								<li key={principle}>
									<span>{(index + 1).toString().padStart(2, "0")}</span>
									<p>{principle}</p>
								</li>
							))}
						</ol>

						<div className="profile-metric">
							<span>{copy.profile.metricLabel}</span>
							<strong>{copy.profile.metricValue}</strong>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
