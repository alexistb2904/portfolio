import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	async headers() {
		const webMcpOriginTrialToken = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN;
		if (!webMcpOriginTrialToken) return [];

		return [
			{
				source: "/(.*)",
				headers: [{ key: "Origin-Trial", value: webMcpOriginTrialToken }],
			},
		];
	},
	images: {
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
