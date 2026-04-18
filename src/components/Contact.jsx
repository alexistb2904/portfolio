import { useTranslation } from "react-i18next";
import BlurText from "./bits/BlurText";
import { personalInfo } from "../data/content";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import "./Contact.css";

export default function Contact() {
	const { t } = useTranslation();

	return (
		<section id="contact" className="section contact" aria-labelledby="contact-title">
			<div className="container">
				<div className="contact-header">
					<h2 id="contact-title" className="section-title">
						<BlurText text={t("contact.title")} />
					</h2>
					<p className="section-subtitle">{t("contact.subtitle")}</p>
				</div>

				<div className="contact-grid">
					<div className="contact-info">
						<h3>{t("contact.heading")}</h3>
						<p className="contact-description">{t("contact.description")}</p>

						<div className="contact-links">
							<a href={`mailto:${personalInfo.email}`} className="contact-link" aria-label={`Email`}>
								<div className="contact-link-icon">
									<Mail size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">{t("contact.email")}</span>
									<span className="contact-link-value">{personalInfo.email}</span>
								</div>
							</a>

							<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
								<div className="contact-link-icon">
									<Linkedin size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">{t("contact.linkedin")}</span>
									<span className="contact-link-value">linkedin.com/in/alexistb</span>
								</div>
							</a>

							<a href="https://github.com/alexistb2904" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub">
								<div className="contact-link-icon">
									<Github size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">{t("contact.github")}</span>
									<span className="contact-link-value">github.com/alexistb2904</span>
								</div>
							</a>

							<div className="contact-link no-hover">
								<div className="contact-link-icon">
									<MapPin size={20} />
								</div>
								<div className="contact-link-content">
									<span className="contact-link-label">{t("contact.location")}</span>
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
