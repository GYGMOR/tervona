import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/sections/PageHero";
import type { LegalSection } from "@/content";

/** Einheitliches Layout für Impressum und Datenschutzerklärung. */
export default function LegalPage({ eyebrow, title, updated, sections }: { eyebrow: string; title: string; updated?: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={updated} className="pb-10 sm:pb-14" />
      <section className="bg-surface pb-28 sm:pb-36">
        <div className="container-x">
          <Reveal className="legal mx-auto max-w-3xl rounded-[28px] bg-mist p-7 sm:p-12" y={16}>
            {sections.map((s, i) => (
              <div key={i} className="[&>h2:first-child]:mt-0">
                {s.title && <h2>{s.title}</h2>}
                {s.paragraphs?.map((p, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
