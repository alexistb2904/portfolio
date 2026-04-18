import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import BlurText from "./bits/BlurText";
import { skills as skillsData, languages, certifications } from "../data/content";
import { Code2, Globe, Award, Terminal } from "lucide-react";
import "./Skills.css";

export default function Skills() {
	const { t } = useTranslation();
	const gridRef = useRef(null);

	useEffect(() => {
		if (!gridRef.current) return;
		const items = gridRef.current.querySelectorAll(".skills-category");

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						anime({
							targets: items,
							opacity: [0, 1],
							translateY: [30, 0],
							delay: anime.stagger(100),
							easing: "easeOutExpo",
							duration: 800,
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(gridRef.current);
		return () => observer.disconnect();
	}, []);

	const icons = {
		Backend: Terminal,
		Frontend: Code2,
		"DevOps & Outils": Award,
		"Soft Skills": Globe,
	};

	const getCategoryTranslation = (category) => {
		const translations = {
			Backend: t("skills.backend"),
			Frontend: t("skills.frontend"),
			"DevOps & Outils": t("skills.devops"),
			"Soft Skills": t("skills.softskills"),
		};
		return translations[category] || category;
	};

	return (
		<section id="skills" className="section skills" aria-labelledby="skills-title">
			<div className="container">
				<div className="skills-header">
					<h2 id="skills-title" className="section-title">
						<BlurText text={t("skills.title")} />
					</h2>
					<p className="section-subtitle">{t("skills.subtitle")}</p>
				</div>

				<div className="skills-grid" ref={gridRef}>
					{skillsData.map((category) => {
						const Icon = icons[category.category] || Code2;
						return (
							<div key={category.category} className="skills-category">
								<div className="skills-cat-header">
									<Icon size={20} />
									<h3>{getCategoryTranslation(category.category)}</h3>
								</div>
								<div className="skills-list">
									{category.items.map((item) => (
										<span key={item} className="skill-item">
											{item}
										</span>
									))}
								</div>
							</div>
						);
					})}
				</div>

				<div className="skills-bottom">
					<div className="skills-languages">
						<h3>{t("skills.languages")}</h3>
						<div className="languages-list">
							{languages.map((lang) => (
								<div key={lang.name} className="language-item">
									<span className="language-name">{lang.name}</span>
									<span className="language-level">{lang.name === "Français" ? t("skills.native") : t("skills.professional")}</span>
								</div>
							))}
						</div>
					</div>

					<div className="skills-certifications">
						<h3>{t("skills.certifications")}</h3>
						<div className="cert-list">
							{certifications.map((cert) => (
								<div key={cert.id} className="cert-item">
									<Award size={18} className="cert-icon" />
									<div className="cert-content">
										<span className="cert-name">{cert.name}</span>
										<span className="cert-issuer">
											{cert.issuer} · {cert.date}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
