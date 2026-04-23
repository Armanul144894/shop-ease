import ProductCard from '../ProductCard';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';

export default function ProductShelfSection({
  id,
  eyebrow,
  title,
  copy,
  products,
  actionLabel,
  href = '#',
  note,
}) {
  return (
    <section id={id} className="container py-10">
      <SectionReveal>
        <div className="surface-panel rounded-[32px] p-6 md:p-8">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            copy={copy}
            actionLabel={actionLabel}
            href={href}
          />
          {note ? (
            <p className="mt-4 w-full text-sm leading-7 text-stone-500 md:w-[32rem]">
              {note}
            </p>
          ) : null}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} delay={index * 60} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
