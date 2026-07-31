"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import AXALOGO from "../../public/axa_logo.webp";
import EPITALOGO from "../../public/epita.webp";
import MLCLOGO from "../../public/mlc92.webp";
import ACADLOGO from "../../public/paris.png";
import campusmontsouris from "../../public/campus.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function getLogoMark(organization: string) {
	if (organization.includes("AXA")) return AXALOGO;
	if (organization.includes("MyLuxuryCar")) return MLCLOGO;
	if (organization.includes("EPITA")) return EPITALOGO;
	if (organization.includes("Académie")) return ACADLOGO;
	if (organization.includes("Campus Montsouris")) return campusmontsouris;
	return "CMS";
}

export function Journey() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!root.current) return;

			const heading = root.current.querySelectorAll(".journey-heading > *");
			gsap.set(heading, { y: 55, autoAlpha: 0 });

			ScrollTrigger.create({
				trigger: ".journey-heading",
				start: "top 78%",
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
			gsap.utils.toArray<HTMLElement>(".journey-entry").forEach((entry, index) => {
				const entryChildren = Array.from(entry.children);
				const stamp = entry.querySelector(".journey-stamp");
				const finalRotation = entry.classList.contains("entry-education") ? -4 : 4;
				gsap.set(entryChildren, { y: 30, autoAlpha: 0 });
				gsap.set(stamp, { rotate: finalRotation + (index % 2 === 0 ? -16 : 16), scale: 0.7 });

				ScrollTrigger.create({
					trigger: entry,
					start: "top 84%",
					once: true,
					onEnter: () =>
						gsap.to(entryChildren, {
							y: 0,
							autoAlpha: 1,
							duration: 0.7,
							stagger: 0.06,
							ease: "power3.out",
						}),
				});
				ScrollTrigger.create({
					trigger: entry,
					start: "top 82%",
					once: true,
					onEnter: () =>
						gsap.to(stamp, {
							rotate: finalRotation,
							scale: 1,
							duration: 0.75,
							ease: "back.out(1.8)",
						}),
				});
			});
		},
		{ scope: root }
	);

	return (
		<section ref={root} id="journey" className="journey-section" aria-labelledby="journey-title" data-cursor-tone="ink">
			<div className="page-shell journey-shell">
				<header className="journey-heading">
					<div className="section-cue section-cue-dark">
						<span>{copy.journey.index}</span>
						<p>{copy.journey.label}</p>
					</div>
					<h2 id="journey-title">
						{copy.journey.title.split("\n").map((line) => (
							<span key={line}>{line}</span>
						))}
					</h2>
					<p>{copy.journey.intro}</p>
				</header>

				<div className="journey-log">
					{copy.journey.items.map((item, index) => {
						const firstOfType = index === 0 || copy.journey.items[index - 1]?.type !== item.type;
						return (
							<article key={`${item.organization}-${item.dates}`} className={`journey-entry entry-${item.type}`}>
								<div className="journey-type">{firstOfType ? (item.type === "experience" ? copy.journey.experienceLabel : copy.journey.educationLabel) : ""}</div>
								<time>{item.dates}</time>
								<div
									className={`journey-logo-slot ${item.organization.toLocaleLowerCase().includes("campus") || item.organization.toLocaleLowerCase().includes("epita") ? "radius" : ""}`}
									aria-hidden="true">
									<Image src={getLogoMark(item.organization)} alt="" width={70} height={70} />
								</div>
								<div className="journey-role">
									<h3>{item.organization}</h3>
									<strong>{item.role}</strong>
									<p>{item.description}</p>
								</div>
								<span className="journey-stamp" aria-hidden="true">
									{(index + 1).toString().padStart(2, "0")}
								</span>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
