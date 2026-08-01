"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { ProjectCarousel } from "./ProjectCarousel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectIndexPaths: Record<string, ReactNode> = {
	"01": (
		<>
			<path d="M16 28C16 15 24 8 38 8h18c14 0 22 7 22 20v164c0 13-8 20-22 20H38c-14 0-22-7-22-20V28Zm24 8c-5 0-8 3-8 8v132c0 5 3 8 8 8h14c5 0 8-3 8-8V44c0-5-3-8-8-8H40Z" />
			<path d="M112 45 150 8h24v204h-24V42l-23 22-15-19Z" />
		</>
	),
	"02": (
		<>
			<path d="M16 28C16 15 24 8 38 8h18c14 0 22 7 22 20v164c0 13-8 20-22 20H38c-14 0-22-7-22-20V28Zm24 8c-5 0-8 3-8 8v132c0 5 3 8 8 8h14c5 0 8-3 8-8V44c0-5-3-8-8-8H40Z" />
			<path d="M104 30c0-14 8-22 22-22h34c14 0 22 8 22 22v47c0 15-6 26-18 38l-34 35v34h52v28h-78V140l43-47c7-8 11-16 11-25V43c0-5-3-8-8-8h-16c-5 0-8 3-8 8v23h-26V30Z" />
		</>
	),
	"03": (
		<>
			<path d="M16 28C16 15 24 8 38 8h18c14 0 22 7 22 20v164c0 13-8 20-22 20H38c-14 0-22-7-22-20V28Zm24 8c-5 0-8 3-8 8v132c0 5 3 8 8 8h14c5 0 8-3 8-8V44c0-5-3-8-8-8H40Z" />
			<path d="M104 8h56c14 0 22 8 22 22v45c0 10-4 17-12 22 8 5 12 12 12 22v71c0 14-8 22-22 22h-34c-14 0-22-8-22-22v-36h26v23c0 5 3 8 8 8h16c5 0 8-3 8-8v-49c0-5-3-8-8-8h-28V92h28c5 0 8-3 8-8V43c0-5-3-8-8-8h-48V8Z" />
		</>
	),
};

export function ProjectShowcase() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!root.current) return;
      const compactViewport = window.matchMedia("(max-width: 720px)").matches;

			const workIntro = root.current.querySelectorAll(".work-intro > *");
			// Keep the section heading exposed to assistive technology before its reveal.
			gsap.set(workIntro, { y: 70, opacity: 0 });

			ScrollTrigger.create({
				trigger: ".work-intro",
				start: "top 78%",
				once: true,
				onEnter: () =>
					gsap.to(workIntro, {
						y: 0,
						opacity: 1,
						duration: 0.9,
						stagger: 0.1,
						ease: "power4.out",
					}),
			});

      gsap.utils.toArray<HTMLElement>(".project-article").forEach((article) => {
				const title = article.querySelector(".project-title");
				const carousel = article.querySelector(".project-carousel-wrap");
				const details = article.querySelectorAll(".project-copy > *");
				const number = article.querySelector(".project-giant-index");

        if (compactViewport) {
          gsap.set(title, { y: 28, autoAlpha: 0 });
          gsap.set(carousel, { y: 20, autoAlpha: 0 });
          gsap.set(details, { y: 18, autoAlpha: 0 });

          ScrollTrigger.create({
            trigger: article,
            start: "top 86%",
            once: true,
            onEnter: () => {
              const reveal = gsap.timeline({ defaults: { ease: "power3.out" } });
              reveal
                .to(title, { y: 0, autoAlpha: 1, duration: 0.55 })
                .to(carousel, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.3")
                .to(details, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5 }, "-=0.24");
            },
          });

          return;
        }

        gsap.set(title, { yPercent: 105 });
        gsap.set(carousel, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
        gsap.set(details, { y: 34, autoAlpha: 0 });

				ScrollTrigger.create({
					trigger: article,
					start: "top 72%",
					once: true,
					onEnter: () =>
						gsap.to(title, {
							yPercent: 0,
							duration: 1,
							ease: "power4.out",
						}),
				});
				ScrollTrigger.create({
					trigger: article,
					start: "top 68%",
					once: true,
					onEnter: () =>
						gsap.to(carousel, {
							clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
							duration: 1.15,
							ease: "power4.inOut",
						}),
				});
				ScrollTrigger.create({
					trigger: article,
					start: "top 62%",
					once: true,
					onEnter: () =>
						gsap.to(details, {
							y: 0,
							autoAlpha: 1,
							stagger: 0.06,
							duration: 0.7,
							ease: "power3.out",
						}),
				});
				gsap.fromTo(
					number,
					{ xPercent: -5 },
					{
						xPercent: 9,
						ease: "none",
						scrollTrigger: { trigger: article, start: "top bottom", end: "bottom top", scrub: 1 },
					}
				);
			});
		},
		{ scope: root }
	);

	return (
		<section ref={root} id="work" className="work-section" aria-labelledby="work-title" data-cursor-tone="bone">
			<header className="work-intro page-shell">
				<div className="section-cue section-cue-dark">
					<span>{copy.work.index}</span>
					<p>{copy.work.label}</p>
				</div>
				<h2 id="work-title">
					{copy.work.title.split("\n").map((line) => (
						<span key={line}>{line}</span>
					))}
				</h2>
				<p>{copy.work.intro}</p>
			</header>

			<div className="projects-sequence">
				{copy.work.projects.map((project) => (
					<article key={project.id} className={`project-article project-${project.visual}`}>
						<span className="project-giant-index" aria-hidden="true">
							<svg viewBox="0 0 200 220" focusable="false">
								{projectIndexPaths[project.index.slice(0, 2)]}
							</svg>
						</span>
						<header className="project-header page-shell">
							<div>
								<span>{project.index}</span>
								<p>{project.meta}</p>
							</div>
							<div className="project-title-mask">
								<h3 className="project-title">{project.title}</h3>
							</div>
						</header>

						<div className="project-stage page-shell">
							<div className="project-carousel-wrap">
								<ProjectCarousel
									project={project}
									previousLabel={copy.work.carousel.previous}
									nextLabel={copy.work.carousel.next}
									placeholderLabel={copy.work.carousel.placeholder}
									statusLabel={copy.work.carousel.status}
								/>
							</div>

							<div className="project-copy">
								<p className="project-kicker">{project.kicker}</p>
								<p className="project-description">{project.description}</p>
								<p className="project-outcome">
									<span>→</span>
									{project.outcome}
								</p>
								<p className="project-stack" aria-label={`${project.title} technologies`}>
									{project.stack.map((technology, index) => (
										<span key={technology}>
											{technology}
											{index < project.stack.length - 1 ? " / " : ""}
										</span>
									))}
								</p>
								<div className="project-links">
									{project.links.map((link) => (
										<a
											key={link.href}
											href={link.href}
											target={link.external ? "_blank" : undefined}
											rel={link.external ? "noreferrer" : undefined}
											data-cursor-label="OPEN">
											{link.label}
											<ArrowUpRight aria-hidden="true" />
										</a>
									))}
								</div>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
