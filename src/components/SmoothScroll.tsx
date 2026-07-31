"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
	useEffect(() => {
		const refresh = () => ScrollTrigger.refresh();
		const update = () => ScrollTrigger.update();

		window.addEventListener("load", refresh);
		window.addEventListener("resize", refresh);
		window.addEventListener("scroll", update, { passive: true });

		refresh();

		return () => {
			window.removeEventListener("load", refresh);
			window.removeEventListener("resize", refresh);
			window.removeEventListener("scroll", update);
		};
	}, []);

	return null;
}
