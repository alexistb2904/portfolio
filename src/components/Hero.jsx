import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import DecryptedText from "./bits/DecryptedText";
import ShinyText from "./bits/ShinyText";
import MagneticButton from "./bits/MagneticButton";
import Beams from "./bits/Beams";
import { ArrowDown, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Hero.css";

export default function Hero() {
	const { t } = useTranslation();
	const heroRef = useRef(null);
	const contentRef = useRef(null);
	const { theme } = useTheme();

	useEffect(() => {
		if (!contentRef.current) return;
		anime({
			targets: contentRef.current.children,
			opacity: [0, 1],
			translateY: [40, 0],
			delay: anime.stagger(150, { start: 300 }),
			easing: "easeOutExpo",
			duration: 1200,
		});
	}, []);

	const scrollToAbout = () => {
		document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="hero" ref={heroRef}>
			<div className="hero-beams" aria-hidden="true">
				<Beams
					beamWidth={2}
					beamHeight={15}
					beamNumber={12}
					lightColor={theme === "dark" ? "#ff0000" : "#ffffff"}
					speed={2}
					noiseIntensity={1.75}
					scale={0.2}
					rotation={0}
				/>
			</div>

			<div className="hero-grid">
				<div className="hero-grid-line" />
				<div className="hero-grid-line" />
				<div className="hero-grid-line" />
				<div className="hero-grid-line" />
			</div>

			<div className="hero-content" ref={contentRef}>
				<h1 className="hero-title">
					<DecryptedText text={t("hero.title")} speed={40} className="hero-name" />
				</h1>

				<h2 className="hero-subtitle">
					<ShinyText text={t("hero.subtitle")} speed={4} />
				</h2>

				<p className="hero-description">
					{t("hero.role")} {t("hero.based")}{" "}
					<span className="hero-location">
						<MapPin size={16} />
						{t("hero.location")}
					</span>
				</p>

				<div className="hero-cta">
					<MagneticButton onClick={scrollToAbout}>{t("hero.cta")}</MagneticButton>
					<a
						href="#contact"
						className="hero-cta-secondary"
						onClick={(e) => {
							e.preventDefault();
							document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
						}}>
						{t("hero.ctaSecondary")}
					</a>
				</div>
			</div>

			<button className="hero-scroll" onClick={scrollToAbout} aria-label="Scroll down">
				<ArrowDown size={24} />
			</button>
		</section>
	);
}
