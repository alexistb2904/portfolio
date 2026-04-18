import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./styles/variables.css";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import "./i18n/config.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<ThemeProvider>
					<LanguageProvider>
						<App />
					</LanguageProvider>
				</ThemeProvider>
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>
);
