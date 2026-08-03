import sharp from "sharp";

const source = "public/logo.svg";
const squareSize = 512;
const outputDirectory = "public";

const logo = await sharp(source)
	.resize({ width: 400, height: 400, fit: "inside" })
	.png()
	.toBuffer();

const squareIcon = await sharp({
	create: {
		width: squareSize,
		height: squareSize,
		channels: 4,
		background: { r: 0, g: 0, b: 0, alpha: 0 },
	},
})
	.composite([{ input: logo, gravity: "center" }])
	.png()
	.toBuffer();

const pngSizes = [16, 32, 48, 180, 192, 512];

await Promise.all(
	pngSizes.map((size) =>
		sharp(squareIcon)
			.resize(size, size)
			.png({ compressionLevel: 9, adaptiveFiltering: true })
			.toFile(`${outputDirectory}/icon-${size}x${size}.png`)
	)
);

await Promise.all([
	sharp(squareIcon).resize(192, 192).toFile(`${outputDirectory}/android-chrome-192x192.png`),
	sharp(squareIcon).toFile(`${outputDirectory}/android-chrome-512x512.png`),
	sharp(squareIcon).toFile(`${outputDirectory}/android-chrome-maskable-512x512.png`),
	sharp(squareIcon).webp({ quality: 92, effort: 6 }).toFile(`${outputDirectory}/icon-512x512.webp`),
]);
