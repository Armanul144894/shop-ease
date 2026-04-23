import {
  CircleDollarSign,
  CreditCard,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import {
  catalogSummary,
  homeBestSellers,
  homeBrandWall,
  homeEditorialPicks,
  homeNewArrivals,
  homeRecentlyViewed,
} from '../../lib/catalog';

export const heroSlides = [
  {
    eyebrow: 'Resort capsule',
    title: 'Curated drops shaped like a glossy fashion issue',
    description:
      'A calmer storefront for fashion, tech, home, and beauty, all merchandised like a magazine spread instead of a crowded marketplace.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
    shortTitle: 'Travel-ready layers',
    spotlightTitle: 'Riviera-ready styling',
    spotlightText: 'Soft tailoring, warm neutrals, and accessories that move from airport lounge to dinner.',
  },
  {
    eyebrow: 'Studio tech',
    title: 'Design-led electronics for desks, commutes, and creative work',
    description:
      'From immersive audio to creator cameras and minimal desk essentials, every pick is chosen to feel premium on screen and in real life.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80',
    shortTitle: 'Focus-first workspaces',
    spotlightTitle: 'Built for clean setups',
    spotlightText: 'Audio, capture, and desk tools that keep your work surface simple and beautiful.',
  },
  {
    eyebrow: 'Home mood',
    title: 'Objects for slower evenings and rooms with character',
    description:
      'Accent furniture, warm lighting, tabletop pieces, and wellness staples for homes that feel layered rather than generic.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    shortTitle: 'Layered interiors',
    spotlightTitle: 'The room edit',
    spotlightText: 'Natural wood, tactile textures, and shelf-worthy details in one easy pass.',
  },
];

export const heroMetrics = [
  { value: `${catalogSummary.productCount}+`, label: 'products now in catalog' },
  { value: `${catalogSummary.brandCount}`, label: 'brand pages live' },
  { value: `${catalogSummary.categoryCount}`, label: 'category lanes to browse' },
];

export const brands = homeBrandWall;

export const collectionCards = [
  {
    tag: 'Style edit',
    title: 'City dressing with soft structure and clean accessories',
    copy: 'Light layers, tonal sneakers, and polished bags that still feel effortless.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Tech drop',
    title: 'Desk pieces that look intentional on camera',
    copy: 'Audio, screens, and creator gear selected for compact workspaces.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Home edit',
    title: 'Host-ready corners with warm light and texture',
    copy: 'Furniture, tabletop, and room accents for inviting evenings at home.',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
  },
];

export const newArrivalTabs = ['All', 'Style', 'Tech', 'Home', 'Wellness'];

export const newArrivalHighlights = [
  'Tighter assortment instead of overloaded product walls',
  'Editorial mix of fashion, home, beauty, and studio tech',
  'Compact product cards that keep more items visible at once',
];

export const newArrivals = homeNewArrivals;

export const bestSellerProducts = homeBestSellers;

export const editorialPicks = homeEditorialPicks;

export const recentlyViewed = homeRecentlyViewed;

export const serviceHighlights = [
  {
    title: '48-hour delivery windows',
    text: 'Priority shipping on the most-requested edits so high-demand drops land quickly.',
    icon: Truck,
  },
  {
    title: 'Verified brand roster',
    text: 'Every label is approved by the merchandising team before it shows up on the storefront.',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible payments',
    text: 'Split purchases for bigger tech and home orders without cluttering checkout.',
    icon: CreditCard,
  },
  {
    title: 'Price-match requests',
    text: 'Spot a better listed price from an approved seller and our team reviews it fast.',
    icon: CircleDollarSign,
  },
];

export const journalEntries = [
  {
    category: 'Decor notes',
    title: 'How to mix warm wood, matte tech, and soft lighting in one room',
    copy: 'A quick styling approach for home offices and living corners that need more texture.',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    category: 'Wear now',
    title: 'The easiest way to build a three-piece travel wardrobe',
    copy: 'One dressy layer, one relaxed base, and one sneaker is all most weekends need.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    category: 'Desk edit',
    title: 'The studio-tech items that make a small workspace feel premium',
    copy: 'Compact picks for creators and remote teams who want cleaner, calmer setups.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=80',
  },
];

export const testimonials = [
  {
    name: 'Sarah Miller',
    role: 'Creative director',
    text: 'It feels like shopping a beautifully merchandised studio instead of scrolling through endless inventory.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'James Khan',
    role: 'Tech consultant',
    text: 'The product mix is tighter, the imagery feels real, and the checkout flow stays focused from start to finish.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Priya Sen',
    role: 'Interior stylist',
    text: 'I came for home pieces and ended up finding fashion and beauty picks that actually match the same mood.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
];
