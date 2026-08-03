import { ImageResponse } from "next/og";

export const alt = "Alexis Thierry-Bellefond - creative full-stack developer and software engineer based in Paris";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#090909";
const inkSoft = "#141414";
const bone = "#eee8dc";
const boneMuted = "#b9b2a6";
const rose = "#b87878";
const pine = "#476960";

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				position: "relative",
				display: "flex",
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				background: ink,
				color: bone,
				fontFamily: "sans-serif",
			}}>
			<div
				style={{
					position: "absolute",
					top: -240,
					left: -140,
					width: 480,
					height: 480,
					border: "1px solid rgba(238, 232, 220, 0.24)",
					borderRadius: "50%",
				}}
			/>
			<div
				style={{
					position: "absolute",
					right: -132,
					bottom: -180,
					width: 460,
					height: 460,
					border: "1px solid rgba(238, 232, 220, 0.24)",
					borderRadius: "50%",
				}}
			/>

			<div
				style={{
					display: "flex",
					width: 1040,
					height: 520,
					flexDirection: "column",
					padding: "34px 42px",
					background: inkSoft,
					border: `1px solid ${boneMuted}`,
					boxShadow: `14px 14px 0 ${rose}`,
				}}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 24, borderBottom: "1px solid rgba(238, 232, 220, 0.24)" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
						<span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.16em" }}>JUNIOR SOFTWARE ENGINEER</span>
					</div>
					<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
						<span style={{ color: boneMuted, fontSize: 13, fontWeight: 800, letterSpacing: "0.14em" }}>PARIS, FRANCE</span>
					</div>
				</div>

				<div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
					<div style={{ display: "flex", width: 650, flexDirection: "column" }}>
						<span style={{ color: rose, fontSize: 14, fontWeight: 800, letterSpacing: "0.18em", marginBottom: 14 }}>HELLO, I&apos;M</span>
						<span style={{ fontSize: 75, fontWeight: 900, letterSpacing: "-0.07em", lineHeight: 0.84 }}>ALEXIS</span>
						<span style={{ fontSize: 59, fontWeight: 900, letterSpacing: "-0.065em", lineHeight: 0.9 }}>THIERRY-BELLEFOND</span>
					</div>

					<div style={{ display: "flex", width: 270, flexDirection: "column", gap: 17, paddingLeft: 28, borderLeft: `5px solid ${pine}` }}>
						<div style={{ display: "flex", flexDirection: "column", fontSize: 18, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.06 }}>
							<span>FULL-STACK</span>
							<span>DEVELOPER &amp;</span>
							<span>SOFTWARE ENGINEER</span>
						</div>
						<span style={{ color: boneMuted, fontSize: 14, fontWeight: 600, lineHeight: 1.28 }}>Building web, mobile and business software products.</span>
						<span style={{ color: rose, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em" }}>CURRENTLY AT AXA FRANCE</span>
					</div>
				</div>

				<div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 22, borderTop: "1px solid rgba(238, 232, 220, 0.24)" }}>
					<div style={{ display: "flex", width: 545, flexDirection: "column", gap: 5 }}>
						<span style={{ color: boneMuted, fontSize: 12, fontWeight: 800, letterSpacing: "0.16em" }}>WHAT I DO</span>
						<span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>I turn real-world constraints into complete, reliable digital products.</span>
					</div>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
						<span style={{ color: boneMuted, fontSize: 12, fontWeight: 800, letterSpacing: "0.16em" }}>CONTACT</span>
						<span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.025em" }}>contact@alexistb.com</span>
						<span style={{ color: boneMuted, fontSize: 13, fontWeight: 700 }}>alexistb.com · github.com/alexistb2904</span>
					</div>
				</div>
			</div>
		</div>,
		size
	);
}
