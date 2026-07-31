"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MINIMUM_LOADER_DURATION = 2;

export function Preloader() {
	const root = useRef<HTMLDivElement>(null);
	const counter = useRef<HTMLSpanElement>(null);
	const startedAt = useRef<number | null>(null);

	const [visible, setVisible] = useState(true);
	const [pageReady, setPageReady] = useState(false);

	useEffect(() => {
		let cancelled = false;
		startedAt.current = performance.now();

		const markReady = () => {
			if (!cancelled) setPageReady(true);
		};

		const waitForFonts = () => {
			if (document.fonts) {
				void document.fonts.ready.then(markReady, markReady);
			} else {
				markReady();
			}
		};

		document.body.classList.add("is-loading");

		if (document.readyState === "complete") {
			waitForFonts();
		} else {
			window.addEventListener("load", waitForFonts, { once: true });
		}

		const fallback = window.setTimeout(markReady, 4500);

		return () => {
			cancelled = true;
			window.clearTimeout(fallback);
			window.removeEventListener("load", waitForFonts);
			document.body.classList.remove("is-loading");
		};
	}, []);

	useGSAP(
		() => {
			if (!pageReady || !root.current || !counter.current) return;

			const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			const elapsed = startedAt.current === null ? 0 : (performance.now() - startedAt.current) / 1000;
			const remainingDelay = Math.max(0, MINIMUM_LOADER_DURATION - elapsed);

			const count = { value: 0 };

			const timeline = gsap.timeline({
				defaults: {
					ease: "power4.inOut",
				},
				onComplete: () => {
					document.body.classList.remove("is-loading");
					document.body.classList.add("is-ready");

					window.requestAnimationFrame(() => {
						window.requestAnimationFrame(() => {
							setVisible(false);
							ScrollTrigger.refresh();
						});
					});
				},
			});

			if (reducedMotion) {
				timeline.set(counter.current, { textContent: "03" }).to({}, { duration: remainingDelay }).set(root.current, { autoAlpha: 0 });

				return;
			}

			timeline
				.to(count, {
					value: 3,
					duration: 0.8,
					ease: "steps(3)",
					onUpdate: () => {
						if (!counter.current) return;

						counter.current.textContent = Math.ceil(count.value).toString().padStart(2, "0");
					},
				})
				.to(
					{},
					{
						duration: Math.max(0, remainingDelay - 0.8),
					}
				)
				.to(".preloader-blade-a", {
					xPercent: -101,
					rotate: -3,
					duration: 0.8,
				})
				.to(
					".preloader-blade-b",
					{
						xPercent: 101,
						rotate: 3,
						duration: 0.8,
					},
					"<"
				)
				.to(
					".preloader-core",
					{
						scaleX: 0,
						duration: 0.55,
					},
					"<0.12"
				)
				.set(root.current, {
					autoAlpha: 0,
					pointerEvents: "none",
				});
		},
		{
			scope: root,
			dependencies: [pageReady],
		}
	);

	if (!visible) return null;

	return (
		<div ref={root} className="preloader" aria-hidden="true">
			<div className="preloader-blade preloader-blade-a">
				<span>ALEXIS THIERRY-BELLEFOND</span>
				<strong>SURFACE</strong>
			</div>

			<div className="preloader-blade preloader-blade-b">
				<strong>RUNTIME</strong>
				<span>PORTFOLIO / 2026</span>
			</div>

			<div className="preloader-core">
				<span ref={counter}>00</span>
			</div>
		</div>
	);
}
