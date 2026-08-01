import type { Locale } from "@/lib/locale";
import type { StaticImageData } from "next/image";

export type ContentImageSource = string | StaticImageData;

export interface ProjectLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface ProjectCopy {
	id: string;
	index: string;
	title: string;
	kicker: string;
	description: string;
	outcome: string;
	meta: string;
	stack: string[];
	layers: string[];
	images: Array<{ src: ContentImageSource; alt?: string }>;
	visual: "epitime" | "workshop" | "reflect";
	links: ProjectLink[];
}

export interface PortfolioCopy {
	skip: string;
	menu: { open: string; close: string };
	language: { switchTo: string; short: string };
	nav: Array<{ label: string; href: string }>;
	hero: {
		eyebrow: string;
		titleA: string;
		titleB: string;
		titleC: string;
		intro: string;
		primary: string;
		secondary: string;
		scroll: string;
		location: string;
		discipline: string;
	};
	work: {
		index: string;
		label: string;
		title: string;
		intro: string;
		carousel: {
			previous: string;
			next: string;
			placeholder: string;
			status: string;
		};
		projects: ProjectCopy[];
	};
	profile: {
		index: string;
		label: string;
		headlineA: string;
		headlineB: string;
		paragraphs: string[];
		principles: string[];
		metricLabel: string;
		metricValue: string;
	};
	capabilities: {
		label: string;
		title: string;
		groups: Array<{ number: string; title: string; text: string; tools: string }>;
	};
	lab: {
		index: string;
		label: string;
		title: string;
		intro: string;
		items: Array<{
			code: string;
			title: string;
			text: string;
			note: string;
			image?: { src: ContentImageSource; alt: string };
			actions?: Array<{ label: string; href: string; external?: boolean }>;
		}>;
		appendix: { label: string; title: string; text: string };
	};
	journey: {
		index: string;
		label: string;
		title: string;
		intro: string;
		experienceLabel: string;
		educationLabel: string;
		items: Array<{
			dates: string;
			organization: string;
			role: string;
			description: string;
			type: "experience" | "education";
		}>;
	};
	contact: {
		index: string;
		label: string;
		eyebrow: string;
		titleA: string;
		titleB: string;
		body: string;
		email: string;
		copy: string;
		copied: string;
		social: string;
		form: {
			firstName: string;
			lastName: string;
			email: string;
			message: string;
			firstNamePlaceholder: string;
			lastNamePlaceholder: string;
			emailPlaceholder: string;
			messagePlaceholder: string;
			submit: string;
			sending: string;
			success: string;
			error: string;
			rateLimited: string;
		};
	};
	footer: {
		line: string;
		location: string;
		backToTop: string;
	};
}

export const content: Record<Locale, PortfolioCopy> = {
	en: {
		skip: "Skip to content",
		menu: { open: "Open navigation", close: "Close navigation" },
		language: { switchTo: "Passer le site en français", short: "FR" },
		nav: [
			{ label: "Projects", href: "#work" },
			{ label: "Method", href: "#profile" },
			{ label: "Side projects", href: "#lab" },
			{ label: "Journey", href: "#journey" },
			{ label: "Contact", href: "#contact" },
		],
		hero: {
			eyebrow: "Creative developer · Engineering student",
			titleA: "I BUILD",
			titleB: "THE WHOLE",
			titleC: "SYSTEM.",
			intro: "I'm Alexis, a full-stack developer based in Paris. I turn real-world constraints into web, mobile and business software products.",
			primary: "Enter the universe",
			secondary: "Talk about a project",
			scroll: "Start the journey",
			location: "Paris · France",
			discipline: "Interface → Logic → Runtime",
		},
		work: {
			index: "01",
			label: "Three living products",
			title: "THREE PRODUCTS.\nTHREE MECHANICS.",
			intro: "Each project has its own identity, its own mechanics and its own vision.",
			carousel: {
				previous: "Previous visual",
				next: "Next visual",
				placeholder: "",
				status: "Visual",
			},
			projects: [
				{
					id: "epitime",
					index: "01 / 03",
					title: "EpiTime",
					kicker: "A timetable that follows the student, not the other way around.",
					description:
						"A cross-platform timetable for EPITA, available on the web, as a PWA and on Android. Microsoft sign-in, offline caching, course reminders and widgets keep the day readable even when conditions are not perfect.",
					outcome: "Useful information remains one gesture away, with or without a network connection.",
					meta: "Independent student product · Active",
					stack: ["React Native", "PWA", "Python", "MSAL", "React"],
					layers: ["Identity", "Schedule", "Android", "PWA"],
					images: [
						{ src: "/projects/epi1.png", alt: "EpiTime sign-in screen" },
						{ src: "/projects/epi2.png", alt: "EpiTime timetable" },
						{ src: "/projects/epi3.png", alt: "EpiTime offline experience" },
						{ src: "/projects/epi4.png", alt: "EpiTime notifications" },
					],
					visual: "epitime",
					links: [
						{ label: "Open EpiTime", href: "https://epitime.epita.it/", external: true },
						{ label: "Source code", href: "https://github.com/alexistb2904/EpiTime", external: true },
					],
				},
				{
					id: "workshop",
					index: "02 / 03",
					title: "WorkshopRessources",
					kicker: "Community knowledge transformed into a product people can navigate.",
					description:
						"A long-running platform for game-content creators, evolving from an initial PHP version into a modern service with accounts, structured resources, search and community publishing.",
					outcome: "Years of iteration transformed a personal idea into a maintained platform.",
					meta: "Community platform · Since 2021",
					stack: ["React", "OAuth", "Python", "MySQL", "Moderation"],
					layers: ["Home", "Catalogue", "Dashboard"],
					images: [
						{ src: "/projects/ws1.png", alt: "WorkshopRessources home page" },
						{ src: "/projects/ws2.png", alt: "WorkshopRessources catalogue" },
						{ src: "/projects/ws3.png", alt: "WorkshopRessources dashboard" },
					],
					visual: "workshop",
					links: [{ label: "View the platform", href: "https://workshopressources.fr/", external: true }],
				},
				{
					id: "reflect",
					index: "03 / 03",
					title: "ReFlect",
					kicker: "Clear licensing infrastructure for FiveM teams.",
					description:
						"A platform for delivering and operating FiveM bases, with Discord access, server-bound licence activation, client and administration dashboards, multi-server logs, team access and service-status visibility. The platform was built entirely by me.",
					outcome: "A technical delivery workflow becomes usable by both clients and the team operating it.",
					meta: "Team product · 2026",
					stack: ["React", "Vite", "JavaScript", "Python", "FiveM", "Flask"],
					layers: ["Interface", "Logs", "Management"],
					images: [
						{ src: "/projects/interface.jpeg", alt: "ReFlect interface" },
						{ src: "/projects/logs.png", alt: "ReFlect server logs" },
						{ src: "/projects/manage.png", alt: "ReFlect management dashboard" },
					],
					visual: "reflect",
					links: [{ label: "View ReFlect", href: "https://reflect-dev.com/", external: true }],
				},
			],
		},
		profile: {
			index: "02",
			label: "My method",
			headlineA: "THE INTERFACE",
			headlineB: "IS ONLY ONE LAYER.",
			paragraphs: [
				"I like projects that demand the entire chain: framing the need, composing the interaction, modelling the data, making creation easier and reducing complexity.",
				"My job is not to accumulate technologies. It is to make a complex system understandable, reliable and useful to the person using it.",
			],
			principles: ["Understand the real constraint", "Design the complete journey", "Plan for imperfect conditions", "Diagnose with evidence", "Ship, observe, refine"],
			metricLabel: "TOEIC · 2025",
			metricValue: "945 / 990",
		},
		capabilities: {
			label: "Operating range",
			title: "ONE DEVELOPER.\nTHE ENTIRE CHAIN.",
			groups: [
				{
					number: "A",
					title: "SURFACE",
					text: "Web, mobile and installable experiences designed around real-world usage, accessibility and clear feedback.",
					tools: "React · Next.js · React Native · Service Worker · PWA · Figma",
				},
				{
					number: "B",
					title: "LOGIC",
					text: "APIs, accounts, sessions, data models, synchronisation and business rules that remain readable.",
					tools: "Node.js · PHP · Python · REST · Prisma · MySQL",
				},
				{
					number: "C",
					title: "RUNTIME",
					text: "Deployment, Linux environments and evidence-based diagnosis wherever the software actually runs.",
					tools: "Linux · Docker · Git · VPS · Coolify · CI/CD · QEMU/KVM · Azure",
				},
				{
					number: "D",
					title: "EXPLORATION",
					text: "Applied AI, algorithms, real-time game logic and security.",
					tools: "TypeScript · Python · C · C# · Lua · Data · Virtualisation",
				},
			],
		},
		lab: {
			index: "03",
			label: "Parallel paths",
			title: "WHERE I TEST\nTHE LIMITS.",
			intro: "Smaller systems allow me to explore another constraint, another runtime or another way of making feedback tangible.",
			items: [
				{
					code: "EXT / 01",
					title: "S&box API Tools",
					text: "A published VS Code extension for S&box development: schema-driven completions, API documentation on hover, targeted diagnostics and snippets for C# game projects.",
					note: "VS Code · TypeScript · C# tooling · API schemas",
					actions: [{ label: "View the code", href: "https://github.com/alexistb2904/sbox-vscode-extension", external: true }],
				},
				{
					code: "CMP / 02",
					title: "Component systems",
					text: "A reusable React library built with Vite and documented in Storybook to work on consistency, maintainability and visual contracts.",
					note: "React · Vite · Storybook · Design systems",
				},
				{
					code: "SEC / 03",
					title: "Rootkit",
					text: "Creation of an academic Linux rootkit designed around an isolated QEMU/KVM environment, using zero-day vulnerabilities, phishing, kernel modules, a control panel and defensive analysis of low-level mechanisms.",
					note: "Linux · C · QEMU/KVM · Academic security",
					actions: [{ label: "Read the lab", href: "https://alexistb2904.github.io/kozaci/", external: true }],
				},
			],
			appendix: {
				label: "Note",
				title: "Interested in these projects?",
				text: "Contact me to discuss them or visit my GitHub to discover more projects and experiments.",
			},
		},
		journey: {
			index: "04",
			label: "Build log",
			title: "THE FIELD\nSHAPES THE WORK.",
			intro: "An apprenticeship journey spanning a first complete product, public-service tools, enterprise software and engineering studies.",
			experienceLabel: "Experience",
			educationLabel: "Education",
			items: [
				{
					dates: "2025 - PRESENT",
					organization: "AXA France",
					role: "Junior Software Engineer · Apprenticeship",
					description:
						"Development in an enterprise environment where delivery also means rigour, collaboration and maintainability. Deployment of internal business tools designed around the team's real needs.",
					type: "experience",
				},
				{
					dates: "2023 - 2025",
					organization: "City of Paris · Académie du Climat",
					role: "Full-Stack Developer · Apprenticeship",
					description:
						"Creation of practical business tools for schedules, event management, a cartographic PWA and newsletter workflows. The tools were used by the entire Académie du Climat team.",
					type: "experience",
				},
				{
					dates: "2023",
					organization: "MyLuxuryCar Paris",
					role: "Full-Stack Developer · Apprenticeship",
					description:
						"Transformation of a business need into a complete website, back office, external data synchronisation and production deployment. SEO and performance optimisation.",
					type: "experience",
				},
				{
					dates: "2025 - 2028",
					organization: "EPITA",
					role: "Computer Science & Engineering",
					description: "Engineering programme pursued through an apprenticeship.",
					type: "education",
				},
				{
					dates: "2023 - 2025",
					organization: "Campus Montsouris",
					role: "BTS SIO · SLAM",
					description: "Software development specialisation completed through an apprenticeship.",
					type: "education",
				},
			],
		},
		contact: {
			index: "05",
			label: "Contact",
			eyebrow: "Always ready for a new challenge.",
			titleA: "LET'S MAKE",
			titleB: "IT WORK.",
			body: "A product to build, a difficult system to untangle or simply an idea to test? Tell me what needs to work.",
			email: "Email me",
			copy: "Copy address",
			copied: "Address copied",
			social: "Elsewhere",
			form: {
				firstName: "First name",
				lastName: "Last name",
				email: "Email",
				message: "Message",
				firstNamePlaceholder: "Your first name",
				lastNamePlaceholder: "Your last name",
				emailPlaceholder: "you@example.com",
				messagePlaceholder: "What would you like to build?",
				submit: "Send message",
				sending: "Sending…",
				success: "Thank you, your message has been sent.",
				error: "Unable to send your message. Please try again or email me directly.",
				rateLimited: "You can send two messages every 30 minutes. Please try again later.",
			},
		},
		footer: {
			line: "Designed and developed by Alexis Thierry-Bellefond.",
			location: "Paris · France",
			backToTop: "Restart the journey",
		},
	},
	fr: {
		skip: "Aller au contenu",
		menu: { open: "Ouvrir la navigation", close: "Fermer la navigation" },
		language: { switchTo: "Switch website to English", short: "EN" },
		nav: [
			{ label: "Projets", href: "#work" },
			{ label: "Méthode", href: "#profile" },
			{ label: "À côté", href: "#lab" },
			{ label: "Parcours", href: "#journey" },
			{ label: "Contact", href: "#contact" },
		],
		hero: {
			eyebrow: "Développeur créatif · Étudiant ingénieur",
			titleA: "JE BATIS",
			titleB: "TOUT LE",
			titleC: "SYSTEME.",
			intro: "Je suis Alexis, développeur full-stack à Paris. Je transforme des contraintes réelles en produits web, mobiles et logiciels de logiciels métiers.",
			primary: "Entrer dans l'univers",
			secondary: "Parler d'un projet",
			scroll: "Lancer l'aventure",
			location: "Paris · France",
			discipline: "Interface → Logique → Runtime",
		},
		work: {
			index: "01",
			label: "Trois projets vivants",
			title: "TROIS PROJETS.\nTROIS MÉCANIQUES.",
			intro: "Chaque projet possède sa propre identité, ses propres mécaniques, sa propre vision.",
			carousel: {
				previous: "Visuel précédent",
				next: "Visuel suivant",
				placeholder: "",
				status: "Visuel",
			},
			projects: [
				{
					id: "epitime",
					index: "01 / 03",
					title: "EpiTime",
					kicker: "Un emploi du temps qui suit l'étudiant, pas l'inverse.",
					description:
						"Un planning multiplateforme pour l'EPITA, disponible sur le web, en PWA et sur Android. Connexion Microsoft, cache hors ligne, rappels de cours et widgets gardent la journée lisible même quand les conditions ne sont pas parfaites.",
					outcome: "L'information utile reste à un geste, avec ou sans réseau.",
					meta: "Produit étudiant indépendant · Actif",
					stack: ["React Native", "PWA", "Python", "MSAL", "React"],
					layers: ["Identité", "Planning", "Android", "PWA"],
					images: [
						{ src: "/projects/epi1.png", alt: "Écran de connexion EpiTime" },
						{ src: "/projects/epi2.png", alt: "Emploi du temps EpiTime" },
						{ src: "/projects/epi3.png", alt: "Expérience hors ligne EpiTime" },
						{ src: "/projects/epi4.png", alt: "Notifications EpiTime" },
					],
					visual: "epitime",
					links: [
						{ label: "Ouvrir EpiTime", href: "https://epitime.epita.it/", external: true },
						{ label: "Code source", href: "https://github.com/alexistb2904/EpiTime", external: true },
					],
				},
				{
					id: "workshop",
					index: "02 / 03",
					title: "WorkshopRessources",
					kicker: "Le savoir d'une communauté transformé en produit navigable.",
					description:
						"Une plateforme au long cours pour les créateurs de contenus de jeu, passée d'une première version PHP à un service moderne avec comptes, ressources structurées, recherche et publication communautaire.",
					outcome: "Des années d'itération ont fait évoluer une idée personnelle en plateforme maintenue.",
					meta: "Plateforme communautaire · Depuis 2021",
					stack: ["React", "OAuth", "Python", "MySQL", "Modération"],
					layers: ["Accueil", "Catalogue", "Dashboard"],
					images: [
						{ src: "/projects/ws1.png", alt: "Accueil WorkshopRessources" },
						{ src: "/projects/ws2.png", alt: "Catalogue WorkshopRessources" },
						{ src: "/projects/ws3.png", alt: "Tableau de bord WorkshopRessources" },
					],
					visual: "workshop",
					links: [{ label: "Voir la plateforme", href: "https://workshopressources.fr/", external: true }],
				},
				{
					id: "reflect",
					index: "03 / 03",
					title: "ReFlect",
					kicker: "Une infrastructure de licences lisible pour les équipes FiveM.",
					description:
						"Une plateforme de livraison et d'exploitation de bases FiveM accès Discord, activation de licences liées à un serveur, dashboards client et administration, logs multi-serveurs, accès équipe et visibilité sur l'état des services. Plateforme totalement construite par mes soins.",
					outcome: "Un workflow de livraison technique devient utilisable par les clients comme par l'équipe qui l'opère.",
					meta: "Produit d'équipe · 2026",
					stack: ["React", "Vite", "JavaScript", "Python", "FiveM", "Flask"],
					layers: ["Interface", "Logs", "Management"],
					images: [
						{ src: "/projects/interface.jpeg", alt: "Interface ReFlect" },
						{ src: "/projects/logs.png", alt: "Logs serveur ReFlect" },
						{ src: "/projects/manage.png", alt: "Tableau de gestion ReFlect" },
					],
					visual: "reflect",
					links: [{ label: "Voir ReFlect", href: "https://reflect-dev.com/", external: true }],
				},
			],
		},
		profile: {
			index: "02",
			label: "Ma méthode",
			headlineA: "L'INTERFACE",
			headlineB: "N'EST QU'UNE COUCHE.",
			paragraphs: [
				"J'aime les projets qui exigent toute la chaîne, cadrer le besoin, composer l'interaction, modéliser les données, faciliter la création et réduire la complexité.",
				"Mon métier n'est pas d'accumuler des technologies. Il consiste à rendre un système complexe compréhensible, fiable et utile pour la personne qui l'utilise.",
			],
			principles: [
				"Comprendre la contrainte réelle",
				"Dessiner le parcours complet",
				"Prévoir les conditions imparfaites",
				"Diagnostiquer avec des preuves",
				"Livrer, observer, affiner",
			],
			metricLabel: "TOEIC · 2025",
			metricValue: "945 / 990",
		},
		capabilities: {
			label: "Champ d'action",
			title: "UN DÉVELOPPEUR.\nTOUTE LA CHAÎNE.",
			groups: [
				{
					number: "A",
					title: "SURFACE",
					text: "Des expériences web, mobiles et installables pensées pour l'usage réel, l'accessibilité et un retour clair.",
					tools: "React · Next.js · React Native · Service Worker · PWA · Figma",
				},
				{
					number: "B",
					title: "LOGIQUE",
					text: "API, comptes, sessions, modèles de données, synchronisation et règles métier qui restent lisibles.",
					tools: "Node.js · PHP · Python · REST · Prisma · MySQL",
				},
				{
					number: "C",
					title: "RUNTIME",
					text: "Déploiement, environnements Linux et diagnostic par les preuves là où le logiciel fonctionne vraiment.",
					tools: "Linux · Docker · Git · VPS · Coolify · CI/CD · QEMU/KVM · Azure",
				},
				{
					number: "D",
					title: "EXPLORATION",
					text: "IA appliquée, algorithmique, logique de jeu temps réel et sécurité.",
					tools: "TypeScript · Python · C · C# · Lua · Data · Virtualisation",
				},
			],
		},
		lab: {
			index: "03",
			label: "Voies parallèles",
			title: "LÀ OÙ JE TESTE\nLES LIMITES.",
			intro: "Les systèmes plus petits me permettent d'explorer une autre contrainte, un autre runtime ou une autre manière de rendre le retour tangible.",
			items: [
				{
					code: "EXT / 01",
					title: "S&box API Tools",
					text: "Une extension VS Code publiée pour développer sur S&box : complétions pilotées par schéma, documentation API au survol, diagnostics ciblés et snippets pour les projets de jeu en C#.",
					note: "VS Code · TypeScript · Outillage C# · Schémas API",
					actions: [{ label: "Voir le code", href: "https://github.com/alexistb2904/sbox-vscode-extension", external: true }],
				},
				{
					code: "CMP / 02",
					title: "Systèmes de composants",
					text: "Une bibliothèque React réutilisable construite avec Vite et documentée dans Storybook pour travailler la cohérence, la maintenance et les contrats visuels.",
					note: "React · Vite · Storybook · Design systems",
				},
				{
					code: "SEC / 03",
					title: "Rootkit",
					text: "Création d'un rootkit académique pour Linux, conçu autour d'un environnement QEMU/KVM isolé, utilisations de faille zero-day, fishing, module kernel, panel de contrôle et analyse défensive des mécanismes bas-niveau.",
					note: "Linux · C · QEMU/KVM · Sécurité académique",
					actions: [{ label: "Lire le laboratoire", href: "https://alexistb2904.github.io/kozaci/", external: true }],
				},
			],
			appendix: {
				label: "Note",
				title: "Ces projets t'intéressent ?",
				text: "Contacte-moi pour en discuter ou rendez-vous sur mon GitHub pour voir d'autres projets et expérimentations.",
			},
		},
		journey: {
			index: "04",
			label: "Journal de construction",
			title: "LE TERRAIN\nFAÇONNE LE TRAVAIL.",
			intro: "Un parcours en alternance passé par un premier produit complet, des outils de service public, le logiciel d'entreprise et les études d'ingénieur.",
			experienceLabel: "Expérience",
			educationLabel: "Formation",
			items: [
				{
					dates: "2025 - AJD.",
					organization: "AXA France",
					role: "Ingénieur logiciel junior · Alternance",
					description:
						"Développement dans un environnement d'entreprise où livrer signifie aussi rigueur, collaboration et maintenabilité. Déploiement d'outils métiers internes aux besoins réels de l'équipe.",
					type: "experience",
				},
				{
					dates: "2023 - 2025",
					organization: "Ville de Paris · Académie du Climat",
					role: "Développeur full-stack · Alternance",
					description:
						"Création d'outils métiers concrets autour d'agendas, de la gestion d'événements, d'une PWA cartographique et de newsletters. Outil utilisé par toute l'équipe de l'Académie du Climat.",
					type: "experience",
				},
				{
					dates: "2023",
					organization: "MyLuxuryCar Paris",
					role: "Développeur full-stack · Alternance",
					description: "Transformation d'un besoin métier en site complet, back-office, synchronisation de données externes et mise en production. SEO et performance.",
					type: "experience",
				},
				{
					dates: "2025 - 2028",
					organization: "EPITA",
					role: "Informatique & ingénierie",
					description: "Cycle ingénieur suivi en alternance.",
					type: "education",
				},
				{
					dates: "2023 - 2025",
					organization: "Campus Montsouris",
					role: "BTS SIO · SLAM",
					description: "Spécialisation en développement logiciel suivie en alternance.",
					type: "education",
				},
			],
		},
		contact: {
			index: "05",
			label: "Contact",
			eyebrow: "Toujours prêt pour un nouveau défi.",
			titleA: "FAISONS-LE",
			titleB: "FONCTIONNER.",
			body: "Un produit à construire, un système difficile à démêler ou simplement une idée à éprouver ? Dites-moi ce qui doit fonctionner.",
			email: "M'écrire",
			copy: "Copier l'adresse",
			copied: "Adresse copiée",
			social: "Ailleurs",
			form: {
				firstName: "Prénom",
				lastName: "Nom",
				email: "E-mail",
				message: "Message",
				firstNamePlaceholder: "Votre prénom",
				lastNamePlaceholder: "Votre nom",
				emailPlaceholder: "vous@exemple.fr",
				messagePlaceholder: "Que souhaitez-vous construire ?",
				submit: "Envoyer le message",
				sending: "Envoi en cours…",
				success: "Merci, votre message a bien été envoyé.",
				error: "Impossible d'envoyer votre message. Réessayez ou écrivez-moi directement.",
				rateLimited: "Vous pouvez envoyer deux messages toutes les 30 minutes. Réessayez plus tard.",
			},
		},
		footer: {
			line: "Conçu et développé par Alexis Thierry-Bellefond.",
			location: "Paris · France",
			backToTop: "Relancer l'aventure",
		},
	},
};
