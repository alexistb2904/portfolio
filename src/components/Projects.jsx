import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import BlurText from "./bits/BlurText";
import SpotlightCard from "./bits/SpotlightCard";
import { projects } from "../data/content";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import "./Projects.css";

export default function Projects() {
	const { t } = useTranslation();
	const gridRef = useRef(null);

	useEffect(() => {
		if (!gridRef.current) return;
		const items = gridRef.current.querySelectorAll(".project-card");

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						anime({
							targets: items,
							opacity: [0, 1],
							translateY: [40, 0],
							scale: [0.95, 1],
							delay: anime.stagger(150),
							easing: "easeOutExpo",
							duration: 1000,
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

	const getProjectsTranslations = () => {
		return [
			{
				...projects[0],
				title: t("projects.workshop.title"),
				date: t("projects.workshop.date"),
				description: t("projects.workshop.description"),
			},
			{
				...projects[1],
				title: t("projects.epitime.title"),
				date: t("projects.epitime.date"),
				description: t("projects.epitime.description"),
			},
			{
				...projects[2],
				title: t("projects.reflect.title"),
				date: t("projects.reflect.date"),
				description: t("projects.reflect.description"),
			},
			{
				...projects[3],
				title: t("projects.myluxury.title"),
				date: t("projects.myluxury.date"),
				description: t("projects.myluxury.description"),
			},
		];
	};

	return (
		<section id="projects" className="section projects" aria-labelledby="projects-title">
			<div className="container">
				<div className="projects-header">
					<h2 id="projects-title" className="section-title">
						<BlurText text={t("projects.title")} />
					</h2>
					<p className="section-subtitle">{t("projects.subtitle")}</p>
				</div>

				<div className="projects-grid" ref={gridRef}>
					{getProjectsTranslations().map((project) => (
						<SpotlightCard key={project.id} className="project-card" spotlightColor="rgba(220, 38, 38, 0.1)">
							<div className="project-content">
								<div className="project-icon">
									<FolderGit2 size={28} />
								</div>

								<div className="project-header">
									<h3 className="project-title">{project.title}</h3>
									<span className="project-date">{project.date}</span>
								</div>

								<p className="project-description">{project.description}</p>

								<div className="project-tags">
									{project.tags.map((tag) => (
										<span key={tag} className="project-tag">
											{tag}
										</span>
									))}
								</div>

								<div className="project-links">
									{project.link !== "#" && (
										<a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
											<ExternalLink size={16} />
											{t("projects.title")}
										</a>
									)}
									{project.github !== "#" && (
										<a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link secondary">
											<Github size={16} />
											Code
										</a>
									)}
								</div>
							</div>
						</SpotlightCard>
					))}
				</div>
			</div>
		</section>
	);
}
