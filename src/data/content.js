export const personalInfo = {
	name: "Alexis Thierry-Bellefond",
	title: "Ingénieur Logiciel Junior",
	subtitle: "Développeur Full Stack",
	email: "alexistb2904@gmail.com",
	location: "Paris, France",
	linkedin: "https://www.linkedin.com/in/alexistb/",
	github: "https://github.com/alexistb2904",
	description: `Depuis mon plus jeune âge, je suis passionné d'informatique et de toutes les nouvelles technologies. J'ai mené à bien plusieurs projets au fil des années, tels que la création de serveurs, de modèles 3D, de contenus sur Garry's Mod, ainsi que la conception de sites web et d'applications. Toutes ces expériences m'ont permis d'acquérir des compétences dans différents langages et de maîtriser de nombreux sujets liés à l'informatique. Actuellement en cycle ingénieur à l'EPITA et issu d'un BTS SIO SLAM.`,
};

export const experiences = [
	{
		id: 1,
		role: "Ingénieur Logiciels Junior",
		company: "AXA en France",
		type: "Contrat en alternance",
		date: "Septembre 2025 - Aujourd'hui",
		duration: "8 mois",
		location: "Paris et périphérie · Sur site",
		description: "Développement sur des stacks modernes, intégration dans un environnement enterprise avec méthodologies agiles.",
		skills: ["Django", "React.js", "FastAPI", "Azure DevOps", "Python", "CI/CD"],
	},
	{
		id: 2,
		role: "Développeur Full Stack",
		company: "Ville de Paris",
		type: "Contrat en alternance",
		date: "Novembre 2023 - Juillet 2025",
		duration: "1 an 9 mois",
		location: "Paris, Île-de-France, France · Sur site",
		description: `Conception et implémentation de fonctionnalités innovantes en exploitant Google App Script pour améliorer les outils existants. Pilote de la création d'une interface web dynamique connectée à Google Sheets pour la gestion des salles et événements. Création et envoi de newsletters ciblées. Administration et maintenance du site web de l'entreprise.`,
		skills: ["Google App Script", "React.js", "Node.js", "Full-stack", "Administration système", "Newsletter"],
	},
	{
		id: 3,
		role: "Développeur Full Stack",
		company: "MyLuxuryCar Paris",
		type: "Contrat en alternance",
		date: "Août 2023 - Octobre 2023",
		duration: "3 mois",
		location: "Châtillon, Île-de-France, France · Sur site",
		description: `Création complète du site web de A à Z : maquettage, développement, mise en ligne. Interface administrateur complète pour la gestion des véhicules, du contenu et des statistiques. Intégration d'une API externe pour synchroniser les véhicules. Optimisation SEO, gestion des machines et communication réseaux sociaux.`,
		skills: ["PHP", "JavaScript", "MySQL", "HTML/CSS", "SEO", "Réseaux sociaux"],
	},
];

export const education = [
	{
		id: 1,
		school: "EPITA : École d'Ingénieurs en Informatique",
		degree: "Diplôme d'ingénieur, Computer Science",
		date: "Septembre 2025 - Juillet 2028",
		level: "Cycle ingénieur",
		skills: ["Computer Science", "Software Engineering", "Architecture"],
	},
	{
		id: 2,
		school: "Campus Montsouris",
		degree: "BTS Services Informatiques aux Organisations",
		date: "Août 2023 - Juillet 2025",
		level: "BTS SIO option SLAM",
		skills: ["Développement informatique", "Développement full-stack", "Bases de données"],
	},
];

export const certifications = [
	{
		id: 1,
		name: "Learn C Skill Path",
		issuer: "Codecademy",
		date: "Août 2025",
		link: "#",
	},
	{
		id: 2,
		name: "TOIEC 945/990",
		issuer: "ETS",
		date: "Février 2025",
		link: "#",
	},
];

export const projects = [
	{
		id: 1,
		title: "WorkshopRessources",
		date: "Mars 2021 - Aujourd'hui",
		description:
			"Plateforme dédiée aux créateurs de contenus pour Garry's Mod regroupant ressources, images et tutoriels. Outils exclusifs 100% Open-Source pour optimiser les projets des moddeurs. Initialement fait en PHP Natif maintenant en React pour une meilleure expérience utilisateur et une maintenance facilitée.",
		tags: ["HTML", "PHP", "MySQL", "JavaScript", "Community"],
		link: "https://workshopressources.fr/",
		github: "https://github.com/alexistb2904/WorkshopRessourcesPHP#",
	},
	{
		id: 2,
		title: "EpiTime",
		date: "2026 - Aujourd'hui",
		description:
			"Site réalisé pour remplacer le système d'emploi du temps de l'EPITA, Zeus que je trouvais pas assez pratique. Il est développé en React et utilise une API externe pour récupérer les données de l'emploi du temps.",
		tags: ["React", "JavaScript", "CSS", "PWA"],
		link: "https://epitime.epita.it/",
		github: "https://github.com/alexistb2904/EpiTime",
	},
	{
		id: 3,
		title: "ReFlect",
		date: "Mars 2026 - Aujourd'hui",
		description: "Un projet visant le jeu vidéo FiveM, le site est une platforme de gestions de licenses pour les serveurs développé par la Team ReFlect.",
		tags: ["HTML", "CSS", "JavaScript", "React", "Vite"],
		link: "https://reflect-dev.com/",
		github: "#",
	},
	{
		id: 4,
		title: "MyLuxuryCar Paris",
		date: "Août 2023 - Octobre 2023",
		description:
			"Site réalisé lors de mon alternance chez MyLuxuryCar Paris, j'ai réalisé le site de A à Z en utilisant PHP pour le backend et JavaScript pour le frontend. J'ai également intégré une API externe pour synchroniser les véhicules et optimisé le SEO du site.",
		tags: ["PHP", "JavaScript", "MySQL", "HTML/CSS", "SEO"],
		link: "https://myluxurycarparis.fr/",
		github: "#",
	},
];

export const skills = [
	{ category: "Backend", items: ["FastAPI", "Django", "Python", "PHP", "Node.js", "MySQL", "C", "C#"] },
	{ category: "Frontend", items: ["React.js", "JavaScript", "HTML5", "CSS3", "Vite", "Google App Script"] },
	{ category: "DevOps & Outils", items: ["Azure DevOps", "Git", "GitHub", "CI/CD", "Linux"] },
	{ category: "Soft Skills", items: ["Autonomie", "Rigueur", "Communication", "Veille technologique"] },
];

export const languages = [
	{ name: "Français", level: "Langue natale - Bilingue" },
	{ name: "Anglais", level: "Capacité professionnelle complète" },
];
