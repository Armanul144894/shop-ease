import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import { collectionCards } from './home-data';

export default function CollectionsSection() {
  return (
    <section id="collections" className="container py-10">
      <SectionReveal>
        <SectionHeading
          eyebrow="More sections"
          title="Collections built around moods, not just departments"
          copy="These editorial cards make the storefront feel more custom by grouping items around how people actually shop."
          actionLabel="See the latest drop"
          href="#new-arrivals"
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <a href="#new-arrivals" className="group relative overflow-hidden rounded-[34px]">
            <div className="aspect-[3/3]">
              <img
                src={collectionCards[0].image}
                alt={collectionCards[0].title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{collectionCards[0].tag}</p>
              <h3 className="mt-3 w-full text-3xl font-semibold leading-tight text-white md:w-[24rem]">
                {collectionCards[0].title}
              </h3>
              <p className="mt-3 w-full text-sm leading-7 text-white/75 md:w-[22rem]">{collectionCards[0].copy}</p>
            </div>
          </a>

          <div className="grid gap-5">
            {collectionCards.slice(1).map((card) => (
              <a key={card.title} href="#new-arrivals" className="group relative overflow-hidden rounded-[30px]">
                <div className="aspect-[3/1.8]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{card.tag}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 w-full text-sm leading-7 text-white/75 md:w-[20rem]">{card.copy}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
