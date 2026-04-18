import { useEffect, useRef, useState } from "react";
import "./DecryptedText.css";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function DecryptedText({ text, speed = 50, maxIterations = 10, className = "" }) {
	const [display, setDisplay] = useState(text);
	const [isHovering, setIsHovering] = useState(false);
	const intervalRef = useRef(null);
	const iterationRef = useRef(0);

	const scramble = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		iterationRef.current = 0;

		intervalRef.current = setInterval(() => {
			setDisplay((prev) => {
				return text
					.split("")
					.map((char, index) => {
						if (char === " ") return " ";
						if (index < iterationRef.current) return text[index];
						return chars[Math.floor(Math.random() * chars.length)];
					})
					.join("");
			});

			iterationRef.current += 1 / 3;

			if (iterationRef.current >= text.length) {
				clearInterval(intervalRef.current);
				setDisplay(text);
			}
		}, speed);
	};

	useEffect(() => {
		scramble();
		return () => clearInterval(intervalRef.current);
	}, [text]);

	return (
		<span
			className={`decrypted-text ${className}`}
			onMouseEnter={() => {
				setIsHovering(true);
			}}
			onMouseLeave={() => setIsHovering(false)}>
			{display}
		</span>
	);
}
