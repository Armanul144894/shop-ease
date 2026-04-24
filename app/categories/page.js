import CatalogHero from '../../components/catalog/CatalogHero';
import CategoryCard from '../../components/catalog/CategoryCard';
import SectionHeading from '../../components/home/SectionHeading';
import { catalogCategories, catalogSummary } from '../../lib/catalog';

export const metadata = {
  title: 'Categories | ShopEase Studio',
  description: 'Explore the ShopEase catalog by category, from style and tech to home, beauty, travel, and outdoor.',
};

export default function CategoriesPage() {
  return (
    <main>
      <CatalogHero
        eyebrow="Categories"
        title="Category pages with short browse paths"
        copy="Categories have dedicated browse pages, while products beneath them include the brand, category, and product name in the address."
        stats={[
          { value: catalogSummary.categoryCount, label: 'category pages' },
          { value: catalogSummary.brandCount, label: 'connected brands' },
          { value: `${catalogSummary.productCount}+`, label: 'linked products' },
        ]}
        primaryLink={{ href: '/products', label: 'View all products' }}
        secondaryLink={{ href: '/brands', label: 'Meet the brands' }}
        image="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Category catalog"
      />

      <section className="container py-10">
        <SectionHeading
          eyebrow="Category directory"
          title="Explore every storefront lane"
          copy="Each category card opens a dedicated category product page, and each product inside uses the fuller nested product URL."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {catalogCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
