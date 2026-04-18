import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import "./Navigation.css";

export default function Navigation() {
	const { theme, toggleTheme } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const links = [
		{ href: "#about", label: "À propos" },
		{ href: "#experience", label: "Expériences" },
		{ href: "#projects", label: "Projets" },
		{ href: "#skills", label: "Compétences" },
		{ href: "#contact", label: "Contact" },
	];

	const scrollTo = (e, href) => {
		e.preventDefault();
		setMenuOpen(false);
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: "smooth" });
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
						<a href="https://github.com/alexistb2904" target="_blank" rel="noopener noreferrer" aria-label="GitHub d'Alexis Thierry-Bellefond">
							<Github size={20} />
						</a>
						<a href="https://www.linkedin.com/in/alexistb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn d'Alexis Thierry-Bellefond">
							<Linkedin size={20} />
						</a>
						<a href="mailto:alexistb2904@gmail.com" aria-label="Envoyer un email à Alexis Thierry-Bellefond">
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
