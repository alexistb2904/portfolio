import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Alexis Thierry-Bellefond - Developer",
		short_name: "Alexis / ATB",
		description: "Full-stack developer building web, mobile and software products.",
		start_url: "/",
		display: "standalone",
		background_color: "#090909",
		theme_color: "#090909",
		icons: [
			{
				src: "/atb_logo.png",
				sizes: "any",
				type: "image/png",
			},
		],
	};
}
