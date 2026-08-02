import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/routes";

export const runtime = "edge";

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const isFrench = isLocale(locale) && locale === "fr";
	const role = isFrench ? "DÉVELOPPEUR FULL-STACK" : "FULL-STACK DEVELOPER";
	const statement = isFrench ? "Applications web, mobiles et logicielles, de l'interface au déploiement." : "Web, mobile and software products, from interface to deployment.";

	return new ImageResponse(
		<div style={{ display: "flex", width: "100%", height: "100%", padding: 54, background: "#090909", color: "#eee8dc", fontFamily: "sans-serif" }}>
			<div
				style={{
					display: "flex",
					flex: 1,
					flexDirection: "column",
					justifyContent: "space-between",
					border: "1px solid #b9b2a6",
					padding: "42px 48px",
					boxShadow: "16px 16px 0 #b87878",
				}}>
				<div style={{ display: "flex", justifyContent: "space-between", color: "#b9b2a6", fontSize: 18, fontWeight: 700, letterSpacing: "0.14em" }}>
					<span>{role}</span>
					<span>PARIS - FRANCE</span>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span style={{ color: "#b87878", fontSize: 22, fontWeight: 800, letterSpacing: "0.17em" }}>ALEXIS</span>
					<span style={{ fontSize: 76, fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 0.88 }}>THIERRY-BELLEFOND</span>
				</div>
				<span style={{ width: 760, fontSize: 26, fontWeight: 600, lineHeight: 1.3 }}>{statement}</span>
			</div>
		</div>,
		{ width: 1200, height: 630 }
	);
}
