import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "../data/content";
import "./Footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-brand">
						<span className="footer-logo">&lt;ATB/&gt;</span>
						<p className="footer-tagline">Développeur passionné, en constante évolution.</p>
					</div>

					<div className="footer-links">
						<a href="#about">À propos</a>
						<a href="#experience">Expériences</a>
						<a href="#projects">Projets</a>
						<a href="#skills">Compétences</a>
						<a href="#contact">Contact</a>
					</div>

					<div className="footer-socials">
						<a href="https://github.com/alexistb2904" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
							<Github size={20} />
						</a>
						<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
							<Linkedin size={20} />
						</a>
						<a href={`mailto:${personalInfo.email}`} aria-label="Email">
							<Mail size={20} />
						</a>
					</div>
				</div>

				<div className="footer-bottom">
					© {new Date().getFullYear()} {personalInfo.name}
					<br />
					<span>
						Fait avec <Heart size={14} className="footer-heart" />
					</span>
				</div>
			</div>
		</footer>
	);
}
