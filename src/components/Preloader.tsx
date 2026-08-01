"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Preloader() {
	const root = useRef<HTMLDivElement>(null);
	const bladeA = useRef<HTMLDivElement>(null);
	const bladeB = useRef<HTMLDivElement>(null);
	const core = useRef<HTMLDivElement>(null);
	const pointer = useRef<HTMLSpanElement>(null);
	const counter = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(true);
	const [debugLoader] = useState(
		() => typeof window !== "undefined" && process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).has("debugLoader")
	);

	useEffect(() => {
		document.body.classList.add("is-loading");
		if (debugLoader) return () => document.body.classList.remove("is-loading");

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
	}, [debugLoader]);

	useGSAP(
		() => {
			if (!root.current || !bladeA.current || !bladeB.current || !core.current || !counter.current) return;

			const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const rings = root.current.querySelectorAll(".preloader-ring");
			const sweep = root.current.querySelector(".preloader-sweep");
			const signal = root.current.querySelector(".preloader-signal");
			const progress = { value: 0 };
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
				timeline.set(counter.current, { textContent: "100" });
				if (!debugLoader) timeline.set(root.current, { autoAlpha: 0 });
				return;
			}

			timeline
				.fromTo(core.current, { autoAlpha: 0, scale: 0.55 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
				.fromTo(rings, { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.62, stagger: 0.08, ease: "power3.out" }, "<0.08")
				.to(
					progress,
					{
						value: 100,
						duration: 0.88,
						ease: "power2.out",
						onUpdate: () => {
							if (counter.current) counter.current.textContent = Math.round(progress.value).toString().padStart(3, "0");
						},
					},
					"<0.08"
				)
				.to(sweep, { rotate: 270, duration: 0.8, ease: "power2.inOut" }, "<0.05")
				.to(signal, { scale: 1.15, autoAlpha: 0.35, duration: 0.22, repeat: 2, yoyo: true, ease: "power2.out" }, "<0.18");

			if (debugLoader) {
				timeline.to(signal, { scale: 1.2, autoAlpha: 0.35, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" });
			} else {
				timeline
					.to({}, { duration: 0.3 })
					.to(bladeA.current, { xPercent: -101, rotate: -3, duration: 0.7 })
					.to(bladeB.current, { xPercent: 101, rotate: 3, duration: 0.7 }, "<")
					.to(core.current, { scaleX: 0, duration: 0.55 }, "<0.12")
					.set(root.current, { autoAlpha: 0, pointerEvents: "none" });
			}

			if (!pointer.current || !window.matchMedia("(pointer: fine)").matches) return;

			const movePointer = (event: PointerEvent) => {
				const x = event.clientX - window.innerWidth / 2;
				const y = event.clientY - window.innerHeight / 2;
				gsap.to(pointer.current, { x, y, duration: 0.32, ease: "power3.out", overwrite: "auto" });
			};

			root.current.addEventListener("pointermove", movePointer);
			return () => root.current?.removeEventListener("pointermove", movePointer);
		},
		{ scope: root, dependencies: [debugLoader] }
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
				<span className="preloader-ring preloader-ring-outer" />
				<span className="preloader-ring preloader-ring-middle" />
				<span className="preloader-ring preloader-ring-inner" />
				<span className="preloader-sweep" />
				<strong ref={counter}>000</strong>
			</div>
			<span ref={pointer} className="preloader-pointer" />
		</div>
	);
}
