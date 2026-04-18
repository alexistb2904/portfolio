import BlurText from "./bits/BlurText";
import { personalInfo } from "../data/content";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import "./Contact.css";

export default function Contact() {
	return (
		<section id="contact" className="section contact" aria-labelledby="contact-title">
			<div className="container">
				<div className="contact-header">
					<h2 id="contact-title" className="section-title">
						<BlurText text="Contact" />
					</h2>
					<p className="section-subtitle">Une opportunité, une question ou juste envie de discuter ? N'hésitez pas.</p>
				</div>

				<div className="contact-grid">
					<div className="contact-info">
						<h3>Restons en contact</h3>
						<p className="contact-description">
							Actuellement en alternance chez AXA et en cycle ingénieur à l'EPITA, n'hésitez pas à me contacter pour toute opportunité, question ou simplement pour
							échanger !
						</p>

						<div className="contact-links">
							<a href={`mailto:${personalInfo.email}`} className="contact-link" aria-label={`Envoyer un email à ${personalInfo.name}`}>
								<div className="contact-link-icon">
									<Mail size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">Email</span>
									<span className="contact-link-value">{personalInfo.email}</span>
								</div>
							</a>

							<a
								href="https://www.linkedin.com/in/alexistb/"
								target="_blank"
								rel="noopener noreferrer"
								className="contact-link"
								aria-label="Profil LinkedIn d'Alexis Thierry-Bellefond">
								<div className="contact-link-icon">
									<Linkedin size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">LinkedIn</span>
									<span className="contact-link-value">linkedin.com/in/alexistb</span>
								</div>
							</a>

							<a
								href="https://github.com/alexistb2904"
								target="_blank"
								rel="noopener noreferrer"
								className="contact-link"
								aria-label="Profil GitHub d'Alexis Thierry-Bellefond">
								<div className="contact-link-icon">
									<Github size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">GitHub</span>
									<span className="contact-link-value">github.com/alexistb2904</span>
								</div>
							</a>

							<div className="contact-link no-hover">
								<div className="contact-link-icon">
									<MapPin size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">Localisation</span>
									<span className="contact-link-value">{personalInfo.location}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
