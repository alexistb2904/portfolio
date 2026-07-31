"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function StageCursor() {
	const cursor = useRef<HTMLDivElement>(null);
	const label = useRef<HTMLSpanElement>(null);

	useGSAP(() => {
		if (!cursor.current) return;

		const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!precisePointer || reducedMotion) return;

		let currentTone = "";
		let hoverToneTimer: number | undefined;

		const readTone = (target: Element | null) => {
			const interactive = target?.closest<HTMLElement>("a, button, [data-cursor]");
			const explicitTone = interactive?.dataset.cursorTone;
			if (explicitTone) return explicitTone;

			const startingSurface = (target instanceof HTMLElement ? target : null) ?? interactive ?? document.body;
			let surface: HTMLElement | null = startingSurface;

			while (surface) {
				const match = window.getComputedStyle(surface).backgroundColor.match(/rgba?\(([^)]+)\)/);
				if (match) {
					const [red, green, blue, alpha = "1"] = match[1].split(",").map((value) => value.trim());
					if (Number(alpha) > 0.05) {
						const toLinear = (value: number) => {
							const channel = value / 255;
							return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
						};
						const luminance = 0.2126 * toLinear(Number(red)) + 0.7152 * toLinear(Number(green)) + 0.0722 * toLinear(Number(blue));
						const inkContrast = (luminance + 0.05) / 0.05;
						const boneLuminance = 0.82;
						const boneContrast = (Math.max(luminance, boneLuminance) + 0.05) / (Math.min(luminance, boneLuminance) + 0.05);
						return inkContrast >= boneContrast ? "ink" : "bone";
					}
				}
				surface = surface.parentElement;
			}

			return target?.closest<HTMLElement>("[data-cursor-tone]")?.dataset.cursorTone ?? "bone";
		};

		const setTone = (target: Element | null) => {
			const nextTone = readTone(target);
			if (nextTone === currentTone || !cursor.current) return;
			cursor.current.classList.remove("tone-ink", "tone-bone");
			cursor.current.classList.add(`tone-${nextTone}`);
			currentTone = nextTone;
		};

		const onMove = (event: PointerEvent) => {
			if (!cursor.current) return;
			cursor.current.style.left = `${event.clientX}px`;
			cursor.current.style.top = `${event.clientY}px`;
			setTone(document.elementFromPoint(event.clientX, event.clientY));
			gsap.to(cursor.current, { autoAlpha: 1, duration: 0.12, overwrite: true });
		};
		const onLeaveWindow = () => {
			gsap.to(cursor.current, { autoAlpha: 0, duration: 0.12, overwrite: true });
		};
		const onEnterInteractive = (event: Event) => {
			const target = event.currentTarget as HTMLElement;
			const nextLabel = target.dataset.cursorLabel ?? "";
			setTone(target);
			if (hoverToneTimer) window.clearTimeout(hoverToneTimer);
			hoverToneTimer = window.setTimeout(() => {
				if (target.matches(":hover")) setTone(target);
			}, 180);
			if (label.current) label.current.textContent = nextLabel;
			cursor.current?.classList.add("is-active");
			cursor.current?.classList.toggle("has-label", Boolean(nextLabel));
		};
		const onLeaveInteractive = () => {
			if (hoverToneTimer) window.clearTimeout(hoverToneTimer);
			if (label.current) label.current.textContent = "";
			cursor.current?.classList.remove("is-active", "has-label");
		};

		const interactive = Array.from(document.querySelectorAll<HTMLElement>("a, button, [data-cursor]"));
		interactive.forEach((element) => {
			element.addEventListener("pointerenter", onEnterInteractive);
			element.addEventListener("pointerleave", onLeaveInteractive);
		});
		window.addEventListener("pointermove", onMove);
		document.documentElement.addEventListener("mouseleave", onLeaveWindow);

		return () => {
			interactive.forEach((element) => {
				element.removeEventListener("pointerenter", onEnterInteractive);
				element.removeEventListener("pointerleave", onLeaveInteractive);
			});
			window.removeEventListener("pointermove", onMove);
			document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
			if (hoverToneTimer) window.clearTimeout(hoverToneTimer);
		};
	});

	return (
		<div ref={cursor} className="stage-cursor tone-bone" aria-hidden="true">
			<i className="cursor-corner cursor-corner-a" />
			<i className="cursor-corner cursor-corner-b" />
			<i className="cursor-corner cursor-corner-c" />
			<i className="cursor-corner cursor-corner-d" />
			<span ref={label} />
		</div>
	);
}
