import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, Github, Linkedin, Mail, Globe } from "lucide-react";
import "./Navigation.css";

export default function Navigation() {
	const { theme, toggleTheme } = useTheme();
	const { t, i18n } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [langMenuOpen, setLangMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const links = [
		{ href: "#about", label: t("nav.about") },
		{ href: "#experience", label: t("nav.experience") },
		{ href: "#projects", label: t("nav.projects") },
		{ href: "#skills", label: t("nav.skills") },
		{ href: "#contact", label: t("nav.contact") },
	];

	const scrollTo = (e, href) => {
		e.preventDefault();
		setMenuOpen(false);
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	const handleLanguageChange = (lng) => {
		i18n.changeLanguage(lng);
		setLangMenuOpen(false);
	};

	return (
		<nav className={`navigation ${scrolled ? "scrolled" : ""}`} aria-label="Navigation principale">
			<div className="nav-container">
				<Link
					to="/"
					className="nav-logo"
					onClick={(e) => {
						e.preventDefault();
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}>
					<span className="nav-logo-bracket">&lt;</span>
					<span className="nav-logo-text">ATB</span>
					<span className="nav-logo-bracket">/&gt;</span>
				</Link>

				<div className={`nav-links ${menuOpen ? "open" : ""}`}>
					{links.map((link) => (
						<a key={link.href} href={link.href} className="nav-link" onClick={(e) => scrollTo(e, link.href)}>
							{link.label}
						</a>
					))}
					<div className="nav-socials-mobile">
						<a href="https://github.com/alexistb2904" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
							<Github size={20} />
						</a>
						<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
							<Linkedin size={20} />
						</a>
						<a href="mailto:alexistb2904@gmail.com" aria-label="Email">
							<Mail size={20} />
						</a>
					</div>
				</div>

				<div className="nav-actions">
					<div className="nav-socials">
						<a href="https://github.com/alexistb2904" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
							<Github size={18} />
						</a>
						<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
							<Linkedin size={18} />
						</a>
					</div>

					<div className="nav-language-selector">
						<button className="lang-toggle" onClick={() => setLangMenuOpen(!langMenuOpen)} aria-label="Change language">
							<Globe size={18} />
							<span className="lang-code">{i18n.language.toUpperCase()}</span>
						</button>
						{langMenuOpen && (
							<div className="lang-menu">
								<button className={`lang-option ${i18n.language === "fr" ? "active" : ""}`} onClick={() => handleLanguageChange("fr")}>
									Français
								</button>
								<button className={`lang-option ${i18n.language === "en" ? "active" : ""}`} onClick={() => handleLanguageChange("en")}>
									English
								</button>
							</div>
						)}
					</div>

					<button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
						{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
					</button>
					<button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
						{menuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>
		</nav>
	);
}
