import { MoveRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import { journalEntries } from './home-data';

export default function JournalSection() {
  return (
    <section id="journal" className="container py-10">
      <SectionReveal>
        <SectionHeading
          eyebrow="Journal"
          title="A content layer that makes the storefront feel alive"
          copy="This extra section gives the homepage more depth and keeps the design from stopping at products alone."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {journalEntries.map((entry) => (
            <div
              key={entry.title}
              className="card-lift overflow-hidden rounded-[30px] border border-stone-200/70 bg-white shadow-soft"
            >
              <div className="aspect-[4/2.8]">
                <img src={entry.image} alt={entry.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">{entry.category}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-stone-900">{entry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{entry.copy}</p>
                <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read more
                  <MoveRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
