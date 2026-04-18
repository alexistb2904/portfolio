import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MinesweeperEasterEgg from "./components/MinesweeperEasterEgg";
import "./styles/app.css";

const EASTER_EGG_SEQUENCE = "alexis";

function App() {
	const [isMinesweeperOpen, setIsMinesweeperOpen] = useState(false);
	const sequenceRef = useRef("");

	useEffect(() => {
		const isTypingField = (target) => {
			if (!target || !(target instanceof HTMLElement)) {
				return false;
			}

			const tagName = target.tagName.toLowerCase();
			if (target.isContentEditable || Boolean(target.closest("[contenteditable='true']"))) {
				return true;
			}

			return tagName === "input" || tagName === "textarea" || tagName === "select";
		};

		const handleKeyDown = (event) => {
			if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || isTypingField(event.target)) {
				return;
			}

			if (event.key === "Escape") {
				sequenceRef.current = "";
				return;
			}

			if (event.key.length !== 1) {
				return;
			}

			const nextSequence = `${sequenceRef.current}${event.key.toLowerCase()}`.slice(-EASTER_EGG_SEQUENCE.length);
			sequenceRef.current = nextSequence;

			if (nextSequence === EASTER_EGG_SEQUENCE) {
				sequenceRef.current = "";
				setIsMinesweeperOpen(true);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="app">
			<a className="skip-link" href="#main-content">
				Aller au contenu principal
			</a>
			<Navigation />
			<main id="main-content" role="main">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>
			<Footer />
			<MinesweeperEasterEgg isOpen={isMinesweeperOpen} onClose={() => setIsMinesweeperOpen(false)} />
		</div>
	);
}

export default App;
