import Link from 'next/link';
import BrandLogo from '../catalog/BrandLogo';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import { brands } from './home-data';

export default function BrandsSection() {
  return (
    <section id="brands" className="container py-6">
      <SectionReveal>
        <div className="surface-panel rounded-[32px] p-6 md:p-8">
          <SectionHeading
            eyebrow="Brand section"
            title="A roster that blends global names with visual consistency"
            copy="The brand wall gives the homepage more identity and helps the product mix feel intentional instead of random."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {brands.map((brand, index) => (
              <Link
                key={brand.name}
                href={`/${brand.slug}`}
                className="card-lift rounded-[26px] border border-stone-200 bg-white p-5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <BrandLogo
                  brand={brand}
                  wrapperClassName="h-14 w-full rounded-[20px] bg-stone-50 px-3"
                  imageClassName="p-3"
                  textClassName="text-[10px]"
                />
                <p className="mt-4 font-display text-3xl font-semibold text-stone-900">{brand.name}</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">{brand.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
