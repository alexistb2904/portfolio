import { useEffect, useRef } from "react";
import anime from "animejs";
import BlurText from "./bits/BlurText";
import { personalInfo, education } from "../data/content";
import { GraduationCap, Building2, Award, BookOpen } from "lucide-react";
import "./About.css";

export default function About() {
	const statsRef = useRef(null);

	useEffect(() => {
		if (!statsRef.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						anime({
							targets: ".stat-number",
							innerHTML: [0, (el) => el.dataset.value],
							round: 1,
							easing: "easeOutExpo",
							duration: 2000,
							delay: anime.stagger(150),
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
		);

		observer.observe(statsRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section id="about" className="section about" aria-labelledby="about-title">
			<div className="container">
				<div className="about-header">
					<h2 id="about-title" className="section-title">
						<BlurText text="À propos" />
					</h2>
					<p className="section-subtitle">Passionné par le développement et les nouvelles technologies depuis toujours.</p>
				</div>

				<div className="about-grid">
					<div className="about-card about-main">
						<div className="about-icon">
							<BookOpen size={24} />
						</div>
						<h3>Mon histoire</h3>
						<p>{personalInfo.description}</p>
						<div className="about-bts-note">
							<Award size={16} />
							<span>Diplôme BTS SIO SLAM validé, actuellement en cycle ingénieur EPITA</span>
						</div>
					</div>

					<div className="about-card about-education">
						<div className="about-icon">
							<GraduationCap size={24} />
						</div>
						<h3>Formation</h3>
						<div className="education-list">
							{education.map((edu) => (
								<div key={edu.id} className="education-item">
									<div className="education-marker" />
									<div className="education-content">
										<h4>{edu.school}</h4>
										<p className="education-degree">{edu.degree}</p>
										<span className="education-date">{edu.date}</span>
										<div className="education-tags">
											{edu.skills.map((skill) => (
												<span key={skill} className="tag">
													{skill}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="about-stats" ref={statsRef}>
					<div className="stat-item">
						<span className="stat-number" data-value="5">
							0
						</span>
						<span className="stat-label">Années d'expérience</span>
					</div>
					<div className="stat-item">
						<span className="stat-number" data-value="3">
							0
						</span>
						<span className="stat-label">Entreprises</span>
					</div>
					<div className="stat-item">
						<span className="stat-number" data-value="5">
							0
						</span>
						<span className="stat-label">Certifications</span>
					</div>
				</div>
			</div>
		</section>
	);
}
