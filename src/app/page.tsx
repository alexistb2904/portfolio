import { Portfolio } from "@/components/Portfolio";
import { getRequestLocale } from "@/lib/locale";

export default async function Home() {
  const initialLocale = await getRequestLocale();

  return <Portfolio initialLocale={initialLocale} />;
}
