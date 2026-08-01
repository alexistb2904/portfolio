import { ErrorTerminal } from "@/components/ErrorTerminal";
import { getRequestLocale } from "@/lib/locale";

export default async function NotFound() {
	const initialLocale = await getRequestLocale();

	return <ErrorTerminal kind="not-found" initialLocale={initialLocale} />;
}
