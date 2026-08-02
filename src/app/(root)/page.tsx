import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/locale";
import { getLocalizedPath } from "@/lib/routes";

export default async function RootPage() {
	const locale = await getRequestLocale();
	redirect(getLocalizedPath(locale));
}
