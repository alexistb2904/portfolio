import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "../data/content";
import "./Footer.css";

export default function Footer() {
	const { t } = useTranslation();

	const footerLinks = [
		{ href: "#about", label: t("nav.about") },
		{ href: "#experience", label: t("nav.experience") },
		{ href: "#projects", label: t("nav.projects") },
		{ href: "#skills", label: t("nav.skills") },
		{ href: "#contact", label: t("nav.contact") },
	];

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-brand">
						<span className="footer-logo">&lt;ATB/&gt;</span>
						<p className="footer-tagline">Développeur passionné, en constante évolution</p>
					</div>

					<div className="footer-links">
						{footerLinks.map((link) => (
							<a key={link.href} href={link.href}>
								{link.label}
							</a>
						))}
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
					{t("footer.copyright")}
					<br />
					<span>
						{t("footer.credits")} <Heart size={14} className="footer-heart" />
					</span>
				</div>
			</div>
		</footer>
	);
}
