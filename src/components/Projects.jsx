import { useEffect, useRef } from "react";
import anime from "animejs";
import BlurText from "./bits/BlurText";
import SpotlightCard from "./bits/SpotlightCard";
import { projects } from "../data/content";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import "./Projects.css";

export default function Projects() {
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

	return (
		<section id="projects" className="section projects" aria-labelledby="projects-title">
			<div className="container">
				<div className="projects-header">
					<h2 id="projects-title" className="section-title">
						<BlurText text="Projets" />
					</h2>
					<p className="section-subtitle">Une sélection de mes projets personnels et professionnels.</p>
				</div>

				<div className="projects-grid" ref={gridRef}>
					{projects.map((project) => (
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
											Voir le projet
										</a>
									)}
									{project.github !== "#" && (
										<a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link secondary">
											<Github size={16} />
											Code source
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
