import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { personalInfo, experiences, skills as skillsData } from "../data/content";

const buildSkills = () => {
	const flattened = skillsData.flatMap((category) => category.items);
	return [...new Set(flattened)];
};

export default function SEO() {
	const { pathname } = useLocation();
	const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
	const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
	const title = `${personalInfo.name} | Développeur Full Stack & Ingénieur Logiciel Junior`;
	const description = "Portfolio d'Alexis Thierry-Bellefond : expériences en alternance, projets web, compétences techniques et parcours d'ingénieur logiciel.";
	const keywords = ["portfolio développeur", "Alexis Thierry-Bellefond", "développeur full stack", "ingénieur logiciel junior", "React", "JavaScript", "Python", "EPITA", "AXA"];

	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": `${siteUrl}/#person`,
				name: personalInfo.name,
				jobTitle: personalInfo.title,
				description: personalInfo.description,
				email: personalInfo.email,
				url: siteUrl,
				address: {
					"@type": "PostalAddress",
					addressLocality: "Paris",
					addressCountry: "FR",
				},
				sameAs: [personalInfo.linkedin, personalInfo.github],
				alumniOf: [
					{
						"@type": "CollegeOrUniversity",
						name: "EPITA",
					},
				],
				worksFor: experiences[0]
					? {
							"@type": "Organization",
							name: experiences[0].company,
						}
					: undefined,
				knowsAbout: buildSkills(),
			},
			{
				"@type": "WebSite",
				"@id": `${siteUrl}/#website`,
				url: siteUrl,
				name: `Portfolio ${personalInfo.name}`,
				description,
				inLanguage: "fr-FR",
				publisher: {
					"@id": `${siteUrl}/#person`,
				},
			},
		],
	};

	return (
		<Helmet>
			<html lang="fr" />
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.join(", ")} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:image" content={`${siteUrl}/logo.png`} />
			<meta property="og:image:alt" content={`Photo de profil et identité visuelle de ${personalInfo.name}`} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={`${siteUrl}/logo.png`} />
			<link rel="canonical" href={canonicalUrl} />
			<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
		</Helmet>
	);
}
