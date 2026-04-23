import { ChevronRight } from 'lucide-react';
import FlashSale from '../components/FlashSale';
import BrandsSection from '../components/home/BrandsSection';
import CollectionsSection from '../components/home/CollectionsSection';
import HeroShowcase from '../components/home/HeroShowcase';
import JournalSection from '../components/home/JournalSection';
import NewArrivalsSection from '../components/home/NewArrivalsSection';
import ProductScrollerSection from '../components/home/ProductScrollerSection';
import ProductShelfSection from '../components/home/ProductShelfSection';
import ServiceHighlightsSection from '../components/home/ServiceHighlightsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import {
  bestSellerProducts,
  editorialPicks,
  recentlyViewed,
} from '../components/home/home-data';

export default function HomePage() {
  return (
    <main>
      <HeroShowcase />
      <BrandsSection />
      <CollectionsSection />
      <NewArrivalsSection />

      <ProductShelfSection
        id="best-sellers"
        eyebrow="Best sellers"
        title="Top-performing products in a tighter, quicker-to-scan grid"
        copy="This added product rail makes the homepage feel more like a real storefront while the smaller cards keep it from getting visually heavy."
        actionLabel="Browse best sellers"
        href="#flash-sale"
        note="The smaller card format lets this section hold eight products comfortably, giving the catalog more depth without pushing the page into a cluttered wall."
        products={bestSellerProducts}
      />

      <FlashSale />
      <ServiceHighlightsSection />

      <ProductShelfSection
        id="editorial-picks"
        eyebrow="Editorial picks"
        title="More product sections for style, tech, home, and wellness browsing"
        copy="A second compact product grid keeps the momentum going after the service section and gives shoppers another clear place to explore."
        actionLabel="See curated picks"
        href="#journal"
        note="These quick-shop cards are intentionally smaller so we can fit more variety above the fold on laptop screens."
        products={editorialPicks}
      />

      <ProductScrollerSection
        id="recently-viewed"
        eyebrow="Keep browsing"
        title="Recently viewed"
        copy="The compact carousel keeps familiar products easy to revisit without dominating the lower half of the page."
        products={recentlyViewed}
        icon={<ChevronRight size={18} />}
      />

      <JournalSection />
      <TestimonialsSection />
    </main>
  );
}
