import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import BlurText from "./bits/BlurText";
import SpotlightCard from "./bits/SpotlightCard";
import { experiences } from "../data/content";
import { Briefcase, Calendar, MapPin, Clock } from "lucide-react";
import "./Experience.css";

export default function Experience() {
	const { t } = useTranslation();
	const cardsRef = useRef(null);

	useEffect(() => {
		if (!cardsRef.current) return;
		const cards = cardsRef.current.querySelectorAll(".experience-card");

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						anime({
							targets: cards,
							opacity: [0, 1],
							translateY: [60, 0],
							delay: anime.stagger(200),
							easing: "easeOutExpo",
							duration: 1000,
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(cardsRef.current);
		return () => observer.disconnect();
	}, []);

	const getExperienceTranslations = () => {
		return [
			{
				...experiences[0],
				type: t("experience.type_alternate"),
				role: t("experience.exp_axa.role"),
				company: t("experience.exp_axa.company"),
				date: t("experience.exp_axa.date"),
				duration: t("experience.exp_axa.duration"),
				location: t("experience.exp_axa.location"),
				description: t("experience.exp_axa.description"),
			},
			{
				...experiences[1],
				type: t("experience.type_alternate"),
				role: t("experience.exp_paris.role"),
				company: t("experience.exp_paris.company"),
				date: t("experience.exp_paris.date"),
				duration: t("experience.exp_paris.duration"),
				location: t("experience.exp_paris.location"),
				description: t("experience.exp_paris.description"),
			},
			{
				...experiences[2],
				type: t("experience.type_alternate"),
				role: t("experience.exp_luxurycar.role"),
				company: t("experience.exp_luxurycar.company"),
				date: t("experience.exp_luxurycar.date"),
				duration: t("experience.exp_luxurycar.duration"),
				location: t("experience.exp_luxurycar.location"),
				description: t("experience.exp_luxurycar.description"),
			},
		];
	};

	return (
		<section id="experience" className="section experience" aria-labelledby="experience-title">
			<div className="container">
				<div className="experience-header">
					<h2 id="experience-title" className="section-title">
						<BlurText text={t("experience.title")} />
					</h2>
					<p className="section-subtitle">{t("experience.subtitle")}</p>
				</div>

				<div className="experience-timeline" ref={cardsRef}>
					{getExperienceTranslations().map((exp, index) => (
						<SpotlightCard key={exp.id} className="experience-card" spotlightColor="rgba(220, 38, 38, 0.12)">
							<div className="experience-content">
								<div className="experience-meta">
									<span className="experience-number">0{index + 1}</span>
									<div className="experience-badges">
										<span className="experience-type">{exp.type}</span>
										<span className="experience-duration">
											<Clock size={14} /> {exp.duration}
										</span>
									</div>
								</div>

								<h3 className="experience-role">{exp.role}</h3>
								<h4 className="experience-company">
									<Briefcase size={16} />
									{exp.company}
								</h4>

								<p className="experience-description">{exp.description}</p>

								<div className="experience-footer">
									<span className="experience-date">
										<Calendar size={14} />
										{exp.date}
									</span>
									<span className="experience-location">
										<MapPin size={14} />
										{exp.location}
									</span>
								</div>

								<div className="experience-skills">
									{exp.skills.map((skill) => (
										<span key={skill} className="skill-tag">
											{skill}
										</span>
									))}
								</div>
							</div>
						</SpotlightCard>
					))}
				</div>
			</div>
		</section>
	);
}
