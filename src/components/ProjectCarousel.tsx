"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { ProjectCopy } from "@/content/content";
import "swiper/css";

interface ProjectCarouselProps {
	project: ProjectCopy;
	previousLabel: string;
	nextLabel: string;
	placeholderLabel: string;
	statusLabel: string;
}

const toneByProject = {
	epitime: "blue",
	workshop: "orange",
	reflect: "bone",
} as const;

const placeholderColors = {
	epitime: { background: "304ffe", foreground: "eee8dc" },
	workshop: { background: "ff4d00", foreground: "090909" },
	reflect: { background: "eee8dc", foreground: "090909" },
} as const;

function resolveImageSource(source: ProjectCopy["images"][number]["src"]) {
	return typeof source === "string" ? source : source.src;
}

export function ProjectCarousel({ project, previousLabel, nextLabel, placeholderLabel, statusLabel }: ProjectCarouselProps) {
	const swiper = useRef<SwiperInstance | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const colors = placeholderColors[project.visual];
	const slides = project.layers.map((layer, index) => ({
		id: `${project.id}-${layer}`,
		layer,
		index: (index + 1).toString().padStart(2, "0"),
		src: project.images[index]
			? resolveImageSource(project.images[index].src)
			: `https://placehold.net/600x600.png?text=${encodeURIComponent(`${project.title} / ${layer}`)}&bg=${colors.background}&fg=${colors.foreground}`,
		alt: project.images[index]?.alt ?? `${project.title} - ${layer} (${placeholderLabel})`,
	}));

	return (
		<section className={`project-carousel carousel-tone-${toneByProject[project.visual]}`} aria-label={`${project.title} ${placeholderLabel}`}>
			<div className="carousel-topbar" aria-hidden="true">
				<span>{project.index}</span>
				<span>{placeholderLabel}</span>
			</div>

			<Swiper
				modules={[A11y, Keyboard]}
				slidesPerView={1}
				speed={720}
				keyboard={{ enabled: true }}
				a11y={{ enabled: true }}
				onSwiper={(instance) => {
					swiper.current = instance;
				}}
				onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
				className="project-swiper">
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<figure className="carousel-plate">
							<img src={slide.src} alt={slide.alt} loading="lazy" decoding="async" />
							<figcaption>
								<span>{slide.index}</span>
								<strong>{slide.layer}</strong>
								<small>{placeholderLabel}</small>
							</figcaption>
						</figure>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="carousel-bottom">
				<p aria-live="polite">
					<span>{statusLabel}</span>
					<strong>
						{(activeIndex + 1).toString().padStart(2, "0")} / {slides.length.toString().padStart(2, "0")}
					</strong>
				</p>
				<div className="carousel-progress" aria-hidden="true">
					{slides.map((slide, index) => (
						<i key={slide.id} className={index === activeIndex ? "is-active" : ""} />
					))}
				</div>
				<div className="carousel-controls">
					<button type="button" onClick={() => swiper.current?.slidePrev()} aria-label={previousLabel} data-cursor-label="PREV">
						<ArrowLeft aria-hidden="true" />
					</button>
					<button type="button" onClick={() => swiper.current?.slideNext()} aria-label={nextLabel} data-cursor-label="NEXT">
						<ArrowRight aria-hidden="true" />
					</button>
				</div>
			</div>
		</section>
	);
}
