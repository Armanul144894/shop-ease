import CatalogHero from '../../components/catalog/CatalogHero';
import BrandCard from '../../components/catalog/BrandCard';
import SectionHeading from '../../components/home/SectionHeading';
import { catalogBrands, catalogSummary } from '../../lib/catalog';

export const metadata = {
  title: 'Brands | ShopEase Studio',
  description: 'Discover every brand in the ShopEase catalog and jump into its dedicated single-slug product page.',
};

export default function BrandsPage() {
  return (
    <main>
      <CatalogHero
        eyebrow="Brands"
        title="Brand pages without the /brand route prefix"
        copy="Each brand has its own page and product assortment, but the detail URL stays clean. A customer can go straight to /nike or /sony instead of browsing through nested route folders."
        stats={[
          { value: catalogSummary.brandCount, label: 'brands available' },
          { value: `${catalogSummary.productCount}+`, label: 'products across brands' },
          { value: '1 slug', label: 'shared detail pattern' },
        ]}
        primaryLink={{ href: '/products', label: 'Shop all products' }}
        secondaryLink={{ href: '/categories', label: 'Browse categories' }}
        image="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Brand catalog"
      />

      <section className="container py-10">
        <SectionHeading
          eyebrow="Brand directory"
          title="Browse the full brand roster"
          copy="Every brand card links to a dedicated brand landing page powered by the same shared slug resolver used for products and categories."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {catalogBrands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      </section>
    </main>
  );
}
