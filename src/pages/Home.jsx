import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import SEO from "../components/SEO";

export default function Home() {
	return (
		<>
			<SEO />
			<Hero />
			<About />
			<Experience />
			<Projects />
			<Skills />
			<Contact />
		</>
	);
}
