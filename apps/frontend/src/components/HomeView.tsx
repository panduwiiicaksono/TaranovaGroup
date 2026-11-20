import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Process } from "@/components/sections/Process";
import { Roles } from "@/components/sections/Roles";
import { Requirements } from "@/components/sections/Requirements";
import { References } from "@/components/sections/References";
import { Contact } from "@/components/sections/Contact";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export async function HomeView({ locale }: { locale: Locale }) {
  const c = await getContent(locale);
  return (
    <main>
      <div className="bg-navy text-cream">
        <Header site={c.site} locale={locale} />
        <Hero data={c.hero} locale={locale} />
      </div>
      <Services data={c.services} />
      <Team data={c.team} />
      <Process data={c.process} />
      <Roles data={c.roles} />
      <Requirements data={c.requirements} />
      <References data={c.references} />
      <Contact contact={c.contact} site={c.site} locale={locale} />
    </main>
  );
}
