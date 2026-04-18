import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./styles/app.css";

function App() {
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
		</div>
	);
}

export default App;
