"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { ProjectCarousel } from "./ProjectCarousel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectShowcase() {
	const { copy } = useLanguage();
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!root.current) return;
      const compactViewport = window.matchMedia("(max-width: 720px)").matches;

			const workIntro = root.current.querySelectorAll(".work-intro > *");
			gsap.set(workIntro, { y: 70, autoAlpha: 0 });

			ScrollTrigger.create({
				trigger: ".work-intro",
				start: "top 78%",
				once: true,
				onEnter: () =>
					gsap.to(workIntro, {
						y: 0,
						autoAlpha: 1,
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
							{project.index.slice(0, 2)}
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
