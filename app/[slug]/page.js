import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Package,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import Breadcrumbs from '../../components/catalog/Breadcrumbs';
import BrandCard from '../../components/catalog/BrandCard';
import BrandLogo from '../../components/catalog/BrandLogo';
import ProductCard from '../../components/ProductCard';
import SectionHeading from '../../components/home/SectionHeading';
import {
  getAllCatalogSlugs,
  getBrandBySlug,
  getCategoryBySlug,
  getProductsByBrandSlug,
  getProductsByCategorySlug,
  getRelatedProducts,
  resolveCatalogSlug,
} from '../../lib/catalog';

export function generateStaticParams() {
  return getAllCatalogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const resolved = resolveCatalogSlug(params.slug);

  if (!resolved) {
    return {
      title: 'Not found | ShopEase Studio',
    };
  }

  if (resolved.type === 'product') {
    const product = resolved.item;
    return {
      title: `${product.name} | ShopEase Studio`,
      description: product.description,
    };
  }

  if (resolved.type === 'brand') {
    const brand = resolved.item;
    return {
      title: `${brand.name} | ShopEase Studio`,
      description: brand.description,
    };
  }

  return {
    title: `${resolved.item.name} | ShopEase Studio`,
    description: resolved.item.description,
  };
}

function ProductPage({ product }) {
  const brand = getBrandBySlug(product.brandSlug);
  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <main>
      <section className="container py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: brand?.name ?? product.brand, href: `/${product.brandSlug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel rounded-[34px] p-5 md:p-6">
            <div className="overflow-hidden rounded-[28px]">
              <div className="aspect-[4/3.2]">
                <img src={product.gallery[0]} alt={product.name} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {product.gallery.slice(1).map((image, index) => (
                <div key={`${product.slug}-${index}`} className="overflow-hidden rounded-[22px] border border-stone-200 bg-white">
                  <div className="aspect-[4/3]">
                    <img src={image} alt={`${product.name} view ${index + 2}`} className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-kicker">{product.category}</span>
              <span className="rounded-full bg-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                {product.badge}
              </span>
            </div>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              by {product.brand}
            </p>
            <p className="mt-5 text-base leading-8 text-stone-600">{product.description}</p>

            <div className="mt-6 flex items-center gap-3 text-sm text-stone-500">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{product.rating.toFixed(1)}</span>
              <span>({product.reviews} reviews)</span>
            </div>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-4xl font-extrabold text-stone-900">${product.price}</p>
                <p className="mt-2 text-sm text-stone-400 line-through">${product.originalPrice}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {product.stock} in stock
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Continue shopping
                <ArrowRight size={16} />
              </Link>
              <Link href={`/${product.brandSlug}`} className="btn-secondary">
                More from {product.brand}
              </Link>
              <Link href={`/${product.categorySlug}`} className="btn-secondary">
                More {product.category}
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Color options</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Materials</p>
                <div className="mt-4 space-y-2">
                  {product.materials.map((material) => (
                    <p key={material} className="text-sm text-stone-600">
                      {material}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-stone-200 bg-white p-4">
                <Truck size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold text-stone-900">{product.shipping}</p>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-white p-4">
                <ShieldCheck size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold text-stone-900">{product.note}</p>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-white p-4">
                <Package size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold text-stone-900">SKU {product.sku}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-panel rounded-[32px] p-6 md:p-8">
            <SectionHeading
              eyebrow="Why it stands out"
              title="Details that help the product page feel real"
              copy="This product detail view now has enough product-specific information to stand on its own instead of feeling like a stretched card."
            />
            <div className="mt-8 space-y-4">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BadgeCheck size={15} />
                  </div>
                  <p className="text-sm leading-6 text-stone-600">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Product specs</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-[24px] border border-stone-200 bg-white p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">{spec.label}</p>
                  <p className="mt-3 text-lg font-semibold text-stone-900">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Linked pages</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {brand ? (
                  <Link href={`/${brand.slug}`} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-primary">
                    Brand: {brand.name}
                  </Link>
                ) : null}
                {category ? (
                  <Link href={`/${category.slug}`} className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                    Category: {category.name}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <SectionHeading
          eyebrow="Related products"
          title="More products from the same world"
          copy="Related products pull from the same brand and category so the detail page still feels like part of a bigger storefront."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.slug} product={relatedProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}

function BrandPage({ brand }) {
  const products = getProductsByBrandSlug(brand.slug);
  const categoryLinks = brand.categories.map((category) => getCategoryBySlug(category.slug)).filter(Boolean);

  return (
    <main>
      <section className="container py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Brands', href: '/brands' },
            { label: brand.name },
          ]}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="surface-panel rounded-[34px] p-8 md:p-10">
            <span className="section-kicker">Brand page</span>
            <BrandLogo
              brand={brand}
              wrapperClassName="mt-6 h-20 w-full max-w-[15rem] rounded-[24px] bg-stone-50 px-5"
              imageClassName="p-4"
              textClassName="text-sm"
            />
            <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
              {brand.name}
            </h1>
            <p className="mt-5 text-base leading-8 text-stone-600">{brand.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="metric-chip">
                <p className="text-3xl font-extrabold text-stone-900">{brand.productCount}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">products</p>
              </div>
              <div className="metric-chip">
                <p className="text-3xl font-extrabold text-stone-900">{brand.founded}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">founded</p>
              </div>
              <div className="metric-chip">
                <p className="text-3xl font-extrabold text-stone-900">${brand.averagePrice}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">average price</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Shop all products
                <ArrowRight size={16} />
              </Link>
              {categoryLinks.map((category) => (
                <Link key={category.slug} href={`/${category.slug}`} className="btn-secondary">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-stone-200 shadow-soft">
            <div className="aspect-[4/4.2] md:aspect-[4/3.7]">
              <img src={brand.heroImage} alt={brand.name} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/65">{brand.origin}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{brand.note}</h2>
              <p className="mt-3 w-full text-sm leading-7 text-white/75 md:w-[24rem]">
                Clean route, full assortment, and a dedicated brand landing experience under `/{brand.slug}`.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="surface-panel rounded-[32px] p-6 md:p-8">
          <SectionHeading
            eyebrow="About the brand"
            title="Brand details that support the catalog"
            copy="This gives each brand page enough identity to feel like a true landing page, not just a filtered product list."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Origin</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{brand.origin}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Focus</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{brand.note}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Categories</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">
                {brand.categories.map((category) => category.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <SectionHeading
          eyebrow="Brand products"
          title={`Shop ${brand.name} products`}
          copy="All products from this brand are grouped here, but the public page still comes through the same single-slug detail route model."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

function CategoryPage({ category }) {
  const products = getProductsByCategorySlug(category.slug);

  return (
    <main>
      <section className="container py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="surface-panel rounded-[34px] p-8 md:p-10">
            <span className="section-kicker">Category page</span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
              {category.name}
            </h1>
            <p className="mt-5 text-base leading-8 text-stone-600">{category.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="metric-chip">
                <p className="text-3xl font-extrabold text-stone-900">{category.productCount}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">products</p>
              </div>
              <div className="metric-chip">
                <p className="text-3xl font-extrabold text-stone-900">{category.brandCount}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">brands</p>
              </div>
              <div className="metric-chip">
                <p className="text-3xl font-extrabold text-stone-900">${category.averagePrice}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">average price</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Browse all products
                <ArrowRight size={16} />
              </Link>
              <Link href="/brands" className="btn-secondary">
                Explore brands
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-stone-200 shadow-soft">
            <div className="aspect-[4/4.2] md:aspect-[4/3.7]">
              <img src={category.heroImage} alt={category.name} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/65">Single-slug route</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{category.note}</h2>
              <p className="mt-3 w-full text-sm leading-7 text-white/75 md:w-[24rem]">
                This category is available directly under `/{category.slug}` instead of a nested `/category/{category.slug}` route.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="surface-panel rounded-[32px] p-6 md:p-8">
          <SectionHeading
            eyebrow="Featured brands"
            title={`Brands working inside ${category.name}`}
            copy="Category pages can still surface brand context, even though everything shares one dynamic slug folder underneath."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {category.featuredBrands.slice(0, 4).map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <SectionHeading
          eyebrow="Category products"
          title={`Shop all ${category.name} products`}
          copy="The category page is essentially a focused product shelf, but it still resolves from the same shared route system as brands and products."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function CatalogSlugPage({ params }) {
  const resolved = resolveCatalogSlug(params.slug);

  if (!resolved) {
    notFound();
  }

  if (resolved.type === 'product') {
    return <ProductPage product={resolved.item} />;
  }

  if (resolved.type === 'brand') {
    return <BrandPage brand={resolved.item} />;
  }

  if (resolved.type === 'category') {
    return <CategoryPage category={resolved.item} />;
  }

  return notFound();
}
