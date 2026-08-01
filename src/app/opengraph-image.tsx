import { ImageResponse } from "next/og";

export const alt = "Alexis Thierry-Bellefond - Full-stack Developer & Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				position: "relative",
				display: "flex",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				background: "#090909",
				color: "#eee8dc",
				fontFamily: "sans-serif",
			}}>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					display: "flex",
					width: "100%",
					height: 54,
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 42px",
					borderBottom: "1px solid #555149",
					fontSize: 14,
					letterSpacing: "0.1em",
				}}>
				<span>ALEXIS THIERRY-BELLEFOND</span>
				<span>INTERFACE → LOGIC → RUNTIME</span>
			</div>

			<div
				style={{
					position: "absolute",
					top: 92,
					right: -45,
					display: "flex",
					width: 470,
					height: 140,
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 42px",
					background: "#b87878",
					color: "#090909",
					fontSize: 28,
					fontWeight: 800,
					transform: "rotate(-6deg)",
				}}>
				<span>01</span>
				<span>SURFACE</span>
			</div>
			<div
				style={{
					position: "absolute",
					top: 230,
					right: -20,
					display: "flex",
					width: 430,
					height: 140,
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 42px",
					background: "#eee8dc",
					color: "#090909",
					fontSize: 28,
					fontWeight: 800,
					transform: "rotate(2deg)",
				}}>
				<span>02</span>
				<span>LOGIC</span>
			</div>
			<div
				style={{
					position: "absolute",
					right: -60,
					bottom: 65,
					display: "flex",
					width: 500,
					height: 140,
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 42px",
					background: "#476960",
					color: "#eee8dc",
					fontSize: 28,
					fontWeight: 800,
					transform: "rotate(-3deg)",
				}}>
				<span>03</span>
				<span>RUNTIME</span>
			</div>

			<div
				style={{
					position: "absolute",
					top: 115,
					left: 48,
					display: "flex",
					width: 760,
					flexDirection: "column",
					fontSize: 92,
					fontWeight: 900,
					letterSpacing: "-0.08em",
					lineHeight: 0.78,
				}}>
				<span>I BUILD</span>
				<span style={{ color: "#b87878", marginLeft: 38 }}>THE WHOLE</span>
				<span style={{ color: "transparent", WebkitTextStroke: "2px #eee8dc", marginLeft: 100 }}>SYSTEM.</span>
			</div>

			<div
				style={{
					position: "absolute",
					bottom: 30,
					left: 48,
					display: "flex",
					flexDirection: "column",
					fontSize: 16,
					lineHeight: 1.35,
				}}>
				<span style={{ fontWeight: 800 }}>Alexis Thierry-Bellefond</span>
				<span style={{ color: "#b9b2a6" }}>Full-stack developer · Engineering student · Paris</span>
			</div>
		</div>,
		size
	);
}
