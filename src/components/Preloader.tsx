"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Preloader() {
	const root = useRef<HTMLDivElement>(null);
	const counter = useRef<HTMLSpanElement>(null);
	const bladeA = useRef<HTMLDivElement>(null);
	const bladeB = useRef<HTMLDivElement>(null);
	const core = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		document.body.classList.add("is-loading");
		const failsafe = window.setTimeout(() => {
			document.body.classList.remove("is-loading");
			document.body.classList.add("is-ready");
			setVisible(false);
			ScrollTrigger.refresh();
		}, 3000);

		return () => {
			window.clearTimeout(failsafe);
			document.body.classList.remove("is-loading");
		};
	}, []);

	useGSAP(
		() => {
			if (!root.current || !counter.current || !bladeA.current || !bladeB.current || !core.current) return;

			const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const count = { value: 0 };
			const timeline = gsap.timeline({
				defaults: { ease: "power4.inOut" },
				onComplete: () => {
					document.body.classList.remove("is-loading");
					document.body.classList.add("is-ready");

					window.requestAnimationFrame(() => {
						setVisible(false);
						ScrollTrigger.refresh();
					});
				},
			});

			if (reducedMotion) {
				timeline.set(counter.current, { textContent: "03" }).set(root.current, { autoAlpha: 0 });
				return;
			}

			timeline
				.to(count, {
					value: 3,
					duration: 0.7,
					ease: "steps(3)",
					onUpdate: () => {
						if (counter.current) counter.current.textContent = Math.ceil(count.value).toString().padStart(2, "0");
					},
				})
				.to({}, { duration: 0.45 })
				.to(bladeA.current, { xPercent: -101, rotate: -3, duration: 0.7 })
				.to(bladeB.current, { xPercent: 101, rotate: 3, duration: 0.7 }, "<")
				.to(core.current, { scaleX: 0, duration: 0.55 }, "<0.12")
				.set(root.current, { autoAlpha: 0, pointerEvents: "none" });
		},
		{ scope: root }
	);

	if (!visible) return null;

	return (
		<div ref={root} className="preloader" aria-hidden="true">
			<div ref={bladeA} className="preloader-blade preloader-blade-a">
				<span>ALEXIS THIERRY-BELLEFOND</span>
				<strong>SURFACE</strong>
			</div>

			<div ref={bladeB} className="preloader-blade preloader-blade-b">
				<strong>RUNTIME</strong>
				<span>PORTFOLIO / 2026</span>
			</div>

			<div ref={core} className="preloader-core">
				<span ref={counter}>00</span>
			</div>
		</div>
	);
}
