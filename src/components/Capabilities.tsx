"use client";

import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Capabilities() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!root.current) return;

			const heading = root.current.querySelectorAll(".capabilities-heading > *");
			const rows = root.current.querySelectorAll(".capability-row");
			gsap.set(heading, { y: 60, autoAlpha: 0 });
			gsap.set(rows, { clipPath: "inset(0 100% 0 0)" });

			ScrollTrigger.create({
				trigger: ".capabilities-heading",
				start: "top 76%",
				once: true,
				onEnter: () =>
					gsap.to(heading, {
						y: 0,
						autoAlpha: 1,
						duration: 0.85,
						stagger: 0.1,
						ease: "power4.out",
					}),
			});
			ScrollTrigger.create({
				trigger: ".capabilities-list",
				start: "top 76%",
				once: true,
				onEnter: () =>
					gsap.to(rows, {
						clipPath: "inset(0 0% 0 0)",
						duration: 0.85,
						stagger: 0.12,
						ease: "power4.inOut",
					}),
			});
		},
		{ scope: root }
	);

	return (
		<section ref={root} className="capabilities-section" aria-labelledby="capabilities-title" data-cursor-tone="bone">
			<div className="page-shell">
				<header className="capabilities-heading">
					<div className="section-cue section-cue-dark">
						<p>{copy.capabilities.label}</p>
					</div>
					<h2 id="capabilities-title">
						{copy.capabilities.title.split("\n").map((line) => (
							<span key={line}>{line}</span>
						))}
					</h2>
				</header>

				<div className="capabilities-list">
					{copy.capabilities.groups.map((group, index) => (
						<article key={group.number} className={`capability-row capability-row-${index + 1}`}>
							<span className="capability-number">{group.number}</span>
							<h3>{group.title}</h3>
							<p>{group.text}</p>
							<small>{group.tools}</small>
							<ArrowDownRight aria-hidden="true" />
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
