import { Anybody, Geologica } from "next/font/google";

export const anybody = Anybody({
	subsets: ["latin"],
	weight: "variable",
	axes: ["wdth"],
	variable: "--font-anybody",
	display: "swap",
});

export const geologica = Geologica({
	subsets: ["latin"],
	weight: "variable",
	variable: "--font-geologica",
	display: "swap",
});
