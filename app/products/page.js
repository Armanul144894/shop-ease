import Link from 'next/link';
import CatalogHero from '../../components/catalog/CatalogHero';
import ProductCard from '../../components/ProductCard';
import SectionHeading from '../../components/home/SectionHeading';
import {
  catalogCategories,
  catalogProducts,
  catalogSummary,
} from '../../lib/catalog';

export const metadata = {
  title: 'Products | ShopEase Studio',
  description: 'Browse the full ShopEase product catalog across fashion, tech, home, wellness, beauty, travel, kitchen, and outdoor.',
};

export default function ProductsPage() {
  return (
    <main>
      <CatalogHero
        eyebrow="Products"
        title="A full product catalog with one clean place to browse"
        copy="Every product now lives in a larger shared catalog, making it easy to browse the storefront by product, brand, or category while keeping detail URLs short and direct."
        stats={[
          { value: `${catalogSummary.productCount}+`, label: 'products in catalog' },
          { value: catalogSummary.brandCount, label: 'brand partners' },
          { value: catalogSummary.categoryCount, label: 'browseable categories' },
        ]}
        primaryLink={{ href: '/brands', label: 'Explore brands' }}
        secondaryLink={{ href: '/categories', label: 'Browse categories' }}
        image="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Curated product catalog"
      />

      <section className="container py-6">
        <div className="surface-panel rounded-[30px] p-6 md:p-8">
          <SectionHeading
            eyebrow="Quick paths"
            title="Jump into the catalog by category"
            copy="These direct category links take shoppers into the shared single-slug routing model without adding route prefixes."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {catalogCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-primary hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <SectionHeading
          eyebrow="All products"
          title="The complete storefront"
          copy="This page is intentionally dense so shoppers can scan a large amount of product inventory without needing a separate prefix for every detail page."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {catalogProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} delay={index * 20} />
          ))}
        </div>
      </section>
    </main>
  );
}
