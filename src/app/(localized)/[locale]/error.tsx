"use client";

import { useEffect } from "react";
import { ErrorTerminal } from "@/components/ErrorTerminal";

export default function LocalizedError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
	useEffect(() => {
		console.error("Application route error", error);
	}, [error]);

	return <ErrorTerminal kind="error" retry={reset} />;
}
