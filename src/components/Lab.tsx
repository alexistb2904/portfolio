"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import type { PortfolioCopy } from "@/content/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LabItem = PortfolioCopy["lab"]["items"][number];

function LabAsset({ item }: { item: LabItem }) {
	if (item.image) {
		const src = typeof item.image.src === "string" ? item.image.src : item.image.src.src;
		return (
			<figure className="lab-asset lab-asset-image">
				<img src={src} alt={item.image.alt} loading="lazy" decoding="async" />
			</figure>
		);
	}

	return null;
}

export function Lab() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!root.current) return;
			const compactViewport = window.matchMedia("(max-width: 720px)").matches;

			const heading = root.current.querySelectorAll(".lab-heading > *");
			const drawers = root.current.querySelectorAll(".lab-drawer-reveal");
			gsap.set(heading, { y: 55, autoAlpha: 0 });
			gsap.set(drawers, compactViewport ? { y: 24, autoAlpha: 0 } : { yPercent: 75, autoAlpha: 0 });

			ScrollTrigger.create({
				trigger: ".lab-heading",
				start: "top 77%",
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
				trigger: ".lab-drawers",
				start: "top 74%",
				once: true,
				onEnter: () =>
					gsap.to(drawers, {
						...(compactViewport ? { y: 0 } : { yPercent: 0 }),
						autoAlpha: 1,
						duration: compactViewport ? 0.55 : 0.95,
						stagger: compactViewport ? 0.08 : 0.13,
						ease: "power4.out",
					}),
			});
		},
		{ scope: root }
	);

	return (
		<section ref={root} id="lab" className="lab-section" aria-labelledby="lab-title" data-cursor-tone="bone">
			<div className="page-shell">
				<header className="lab-heading">
					<div className="section-cue section-cue-light">
						<span>{copy.lab.index}</span>
						<p>{copy.lab.label}</p>
					</div>
					<h2 id="lab-title">
						{copy.lab.title.split("\n").map((line) => (
							<span key={line}>{line}</span>
						))}
					</h2>
					<p>{copy.lab.intro}</p>
				</header>

				<div className="lab-drawers">
					{copy.lab.items.map((item, index) => (
						<div key={item.code} className="lab-drawer-reveal">
							<article className={`lab-drawer drawer-tone-${index + 1}`}>
								<div className="lab-drawer-handle">
									<span>{item.code}</span>
								</div>
								<LabAsset item={item} />
								<h3>{item.title}</h3>
								<p>{item.text}</p>
								{item.actions?.length ? (
									<div className="lab-actions">
										{item.actions.slice(0, 2).map((action) => (
											<a
												key={action.href}
												href={action.href}
												target={action.external ? "_blank" : undefined}
												rel={action.external ? "noreferrer" : undefined}
												data-cursor-label="OPEN">
												{action.label}
												<ArrowUpRight aria-hidden="true" />
											</a>
										))}
									</div>
								) : null}
								<small>{item.note}</small>
							</article>
						</div>
					))}
				</div>

				<aside className="lab-appendix">
					<span>{copy.lab.appendix.label}</span>
					<h3>{copy.lab.appendix.title}</h3>
					<p>{copy.lab.appendix.text}</p>
					<strong aria-hidden="true"></strong>
				</aside>
			</div>
		</section>
	);
}
