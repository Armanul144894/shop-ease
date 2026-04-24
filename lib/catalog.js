const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const pick = (items, seed) => items[seed % items.length];

const unique = (items) => Array.from(new Set(items));

const roundPrice = (value, step) => Math.round(value / step) * step;
const simpleIcon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${slug}.svg`;
const wikimediaFile = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;

const categoryDefinitions = [
  {
    slug: 'style',
    name: 'Style',
    note: 'Tailored layers, sneakers, bags, and modern essentials.',
    description:
      'A wardrobe edit built around polish, comfort, and pieces that can move between weekday structure and weekend ease.',
    heroImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Runner', 'Tote', 'Jacket', 'Shirt', 'Watch', 'Loafer', 'Dress', 'Hoodie'],
    descriptors: ['Scarlet', 'Soft Form', 'City', 'Tailored', 'Weekend', 'North', 'Luna', 'Crescent'],
    badges: ['New', 'Best seller', 'Giftable', 'Editor pick', 'Limited'],
    colors: ['Sand', 'Black', 'Stone', 'Olive', 'Cream'],
    materials: ['Italian leather', 'Structured cotton', 'Performance mesh', 'Brushed knit', 'Recycled nylon'],
    imagePool: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [58, 240],
    priceStep: 1,
    shipping: '2-4 business days',
  },
  {
    slug: 'tech',
    name: 'Tech',
    note: 'Audio, devices, creator tools, and desk hardware.',
    description:
      'Design-led electronics selected for clean setups, strong performance, and a calmer visual footprint.',
    heroImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Headphones', 'Tablet', 'Camera', 'Monitor', 'Earbuds', 'Speaker', 'Mic', 'Phone'],
    descriptors: ['Studio', 'North', 'Creator', 'Focus', 'Signal', 'Orbit', 'Pocket', 'Prime'],
    badges: ['Sale', 'Trending', 'Best seller', 'Creator', 'New'],
    colors: ['Graphite', 'Silver', 'Matte Black', 'Warm White', 'Midnight'],
    materials: ['Anodized aluminum', 'Matte polymer', 'Soft-touch silicone', 'Tempered glass', 'Brushed metal'],
    imagePool: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [129, 899],
    priceStep: 10,
    shipping: '1-3 business days',
  },
  {
    slug: 'home',
    name: 'Home',
    note: 'Furniture, lighting, soft goods, and decorative pieces.',
    description:
      'Warm materials, inviting silhouettes, and room-making objects chosen for layered interiors rather than generic rooms.',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Chair', 'Lamp', 'Throw', 'Stool', 'Shelf', 'Table', 'Mirror', 'Tray'],
    descriptors: ['Cedar', 'Oak', 'Layered', 'Warm', 'Studio', 'Dune', 'Harbor', 'Quiet'],
    badges: ['Home', 'Soft goods', 'Editor favorite', 'Top rated', 'New'],
    colors: ['Oak', 'Walnut', 'Ivory', 'Clay', 'Moss'],
    materials: ['Solid oak', 'Brushed steel', 'Textured linen', 'Stoneware', 'Powder-coated metal'],
    imagePool: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [72, 460],
    priceStep: 2,
    shipping: '3-5 business days',
  },
  {
    slug: 'wellness',
    name: 'Wellness',
    note: 'Body care, self-care rituals, and calm daily essentials.',
    description:
      'Shelf-worthy formulas and ritual pieces that make daily routines feel more grounded, not more complicated.',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Body Wash', 'Skin Set', 'Ritual Duo', 'Oil', 'Mist', 'Bath Salt', 'Serum', 'Cream'],
    descriptors: ['Botanical', 'Glow', 'Calm', 'Daily', 'Restore', 'Evening', 'Pure', 'Velvet'],
    badges: ['Popular', 'Giftable', 'Wellness', 'New', 'Ritual'],
    colors: ['Amber', 'Stone', 'Sage', 'Cream', 'Smoke'],
    materials: ['Botanical blend', 'Glass bottle', 'Recycled resin', 'Mineral-rich formula', 'Lightweight emulsion'],
    imagePool: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [28, 118],
    priceStep: 1,
    shipping: '2-4 business days',
  },
  {
    slug: 'beauty',
    name: 'Beauty',
    note: 'Fragrance, makeup, and polished vanity staples.',
    description:
      'A tighter beauty assortment for people who want great packaging, reliable formulas, and an elevated everyday shelf.',
    heroImage: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Fragrance', 'Palette', 'Lip Set', 'Cream', 'Mist', 'Gloss', 'Brush Set', 'Tint'],
    descriptors: ['Cashmere', 'Petal', 'Silk', 'Soft Focus', 'Velvet', 'Luminous', 'Satin', 'Afterglow'],
    badges: ['Beauty', 'Editor pick', 'New', 'Popular', 'Giftable'],
    colors: ['Rose', 'Taupe', 'Pearl', 'Berry', 'Sand'],
    materials: ['Glass vessel', 'Cream formula', 'Vegan blend', 'Soft-bristle set', 'Long-wear pigment'],
    imagePool: [
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631730486572-2261e30cb75d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583241800698-9e88e31f4e6c?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [24, 96],
    priceStep: 1,
    shipping: '2-4 business days',
  },
  {
    slug: 'travel',
    name: 'Travel',
    note: 'Carry-ons, compact gear, and movement-ready essentials.',
    description:
      'A travel assortment designed around mobility, calm packing, and pieces that work just as well on the go as they do at home.',
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Carry-On', 'Weekender', 'Travel Kit', 'Organizer', 'Neck Pillow', 'Passport Case', 'Duffle', 'Pack'],
    descriptors: ['Transit', 'Nomad', 'Weekend', 'Departure', 'Cabin', 'Pilot', 'Atlas', 'Route'],
    badges: ['Travel pick', 'Organizer', 'Popular', 'New', 'Carry-on'],
    colors: ['Navy', 'Stone', 'Olive', 'Black', 'Sand'],
    materials: ['Durable shell', 'Recycled weave', 'Soft-grip handle', 'Water-resistant lining', 'Compression panels'],
    imagePool: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514672013381-c6d0df1f8c0c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [54, 360],
    priceStep: 2,
    shipping: '2-5 business days',
  },
  {
    slug: 'kitchen',
    name: 'Kitchen',
    note: 'Cookware, coffee tools, serveware, and countertop pieces.',
    description:
      'Useful kitchen objects with enough visual character to stay on open shelving and tables between meals.',
    heroImage: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Brew Kit', 'Dutch Oven', 'Dinner Pair', 'Pan', 'Carafe', 'Knife Set', 'Serve Bowl', 'Mug Set'],
    descriptors: ['Stoneware', 'Morning', 'Glass', 'Host', 'Table', 'Foundry', 'Daily', 'Satin'],
    badges: ['Kitchen', 'Host ready', 'Best seller', 'New', 'Top rated'],
    colors: ['Terracotta', 'Cream', 'Ink', 'Stone', 'Sage'],
    materials: ['Enameled cast iron', 'Borosilicate glass', 'Glazed stoneware', 'Walnut handle', 'Brushed steel'],
    imagePool: [
      'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506368083636-6defb67639a7?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [34, 240],
    priceStep: 2,
    shipping: '3-5 business days',
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    note: 'Performance layers, packs, and movement-ready gear.',
    description:
      'A refined outdoor mix for light adventure, daily movement, and functional pieces that still feel at home in the city.',
    heroImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    productNouns: ['Trail Pack', 'Shell', 'Runner', 'Bottle', 'Fleece', 'Day Bag', 'Cap', 'Hiker'],
    descriptors: ['Ridge', 'Summit', 'Field', 'Terra', 'Alpine', 'North', 'Motion', 'Drift'],
    badges: ['Outdoor', 'Trail tested', 'Popular', 'New', 'Limited'],
    colors: ['Moss', 'Slate', 'Sand', 'Midnight', 'Clay'],
    materials: ['Ripstop shell', 'Weatherproof weave', 'Recycled fleece', 'Lightweight frame', 'Breathable mesh'],
    imagePool: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    ],
    priceRange: [68, 320],
    priceStep: 2,
    shipping: '2-5 business days',
  },
];

const categoryLookup = new Map(categoryDefinitions.map((category) => [category.slug, category]));

const brandDefinitions = [
  {
    name: 'Nike',
    slug: 'nike',
    logoUrl: simpleIcon('nike'),
    note: 'Sport-forward essentials with a clean everyday edge.',
    description:
      'Nike brings movement-led staples that balance performance details with an easy city-ready silhouette.',
    origin: 'United States',
    founded: '1964',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    categories: ['style', 'outdoor'],
  },
  {
    name: 'Sony',
    slug: 'sony',
    logoUrl: simpleIcon('sony'),
    note: 'Audio and imaging tools with a premium desk presence.',
    description:
      'Sony products in the shop are chosen for clean forms, immersive sound, and creator-friendly performance.',
    origin: 'Japan',
    founded: '1946',
    heroImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    categories: ['tech'],
  },
  {
    name: 'Coach',
    slug: 'coach',
    logoUrl: wikimediaFile('Coach New Logo.svg'),
    note: 'Polished leather goods and giftable accessories.',
    description:
      'Coach adds soft structure, rich materials, and travel-friendly accessories to the storefront mix.',
    origin: 'United States',
    founded: '1941',
    heroImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    categories: ['style', 'travel'],
  },
  {
    name: 'Aesop',
    slug: 'aesop',
    logoUrl: wikimediaFile('Aesop logo 2013.svg'),
    note: 'Shelf-worthy care for calmer daily rituals.',
    description:
      'Aesop gives the catalog a grounded wellness and beauty layer with formulas that feel elevated yet usable every day.',
    origin: 'Australia',
    founded: '1987',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    categories: ['wellness', 'beauty'],
  },
  {
    name: 'Dyson',
    slug: 'dyson',
    logoUrl: wikimediaFile('Dyson logo.svg'),
    note: 'Design-driven technology for home and grooming.',
    description:
      'Dyson products are selected for sculptural form, modern function, and a distinctly premium hardware feel.',
    origin: 'United Kingdom',
    founded: '1991',
    heroImage: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
    categories: ['tech', 'home'],
  },
  {
    name: 'Le Creuset',
    slug: 'le-creuset',
    logoUrl: wikimediaFile('Le Creuset Logo.png'),
    note: 'Color-rich cookware and tabletop icons.',
    description:
      'Le Creuset grounds the kitchen edit with heirloom-feeling cookware and serveware that looks great in use or on display.',
    origin: 'France',
    founded: '1925',
    heroImage: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80',
    categories: ['kitchen', 'home'],
  },
  {
    name: 'Fujifilm',
    slug: 'fujifilm',
    logoUrl: simpleIcon('fujifilm'),
    note: 'Creator cameras for travel, studio, and story capture.',
    description:
      'Fujifilm brings tactile controls, image-rich hardware, and an analog-meets-modern tone to the tech mix.',
    origin: 'Japan',
    founded: '1934',
    heroImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    categories: ['tech', 'travel'],
  },
  {
    name: 'Apple',
    slug: 'apple',
    logoUrl: simpleIcon('apple'),
    note: 'Portable devices that fit clean creative setups.',
    description:
      'Apple rounds out the technology assortment with streamlined devices suited for work, travel, and content creation.',
    origin: 'United States',
    founded: '1976',
    heroImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80',
    categories: ['tech'],
  },
  {
    name: 'Adidas',
    slug: 'adidas',
    logoUrl: simpleIcon('adidas'),
    note: 'Relaxed athletic style with city-ready polish.',
    description:
      'Adidas expands the storefront with understated sportswear and movement pieces that still read as styled.',
    origin: 'Germany',
    founded: '1949',
    heroImage: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80',
    categories: ['style', 'outdoor'],
  },
  {
    name: 'Byredo',
    slug: 'byredo',
    logoUrl: 'https://www.byredo.com/images/byredo-logo.svg',
    note: 'Fragrance and atmosphere pieces with visual restraint.',
    description:
      'Byredo gives the beauty and wellness categories a sharper, mood-led luxury layer.',
    origin: 'Sweden',
    founded: '2006',
    heroImage: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80',
    categories: ['beauty', 'wellness'],
  },
  {
    name: 'Muuto',
    slug: 'muuto',
    logoUrl: 'https://www.muuto.com/static/muuto-logo.svg',
    note: 'Minimal Scandinavian forms for warmer interiors.',
    description:
      'Muuto anchors the home category with sculptural furniture and objects that keep rooms feeling light.',
    origin: 'Denmark',
    founded: '2006',
    heroImage: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
    categories: ['home'],
  },
  {
    name: 'Canon',
    slug: 'canon',
    logoUrl: wikimediaFile('Canon wordmark.svg'),
    note: 'Imaging gear for travel and daily content work.',
    description:
      'Canon adds dependable hybrid shooting gear for stills, video, and on-the-go creators.',
    origin: 'Japan',
    founded: '1937',
    heroImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    categories: ['tech', 'travel'],
  },
  {
    name: 'Brooklinen',
    slug: 'brooklinen',
    logoUrl: 'https://www.brooklinen.com/cdn/shop/files/Best-In-Bed_Lockup_web-only_Blue.svg?v=1770997710&width=220',
    note: 'Soft goods that make rooms and routines feel finished.',
    description:
      'Brooklinen brings tactile bedding, lounge pieces, and small comforts to the home and wellness mix.',
    origin: 'United States',
    founded: '2014',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    categories: ['home', 'wellness'],
  },
  {
    name: 'Veja',
    slug: 'veja',
    logoUrl: wikimediaFile('Veja (brand).svg'),
    note: 'Refined sneakers with easy everyday versatility.',
    description:
      'Veja rounds out the style and outdoor edits with understated sneakers and movement-friendly silhouettes.',
    origin: 'France',
    founded: '2004',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    categories: ['style', 'outdoor'],
  },
  {
    name: 'Bodum',
    slug: 'bodum',
    logoUrl: wikimediaFile('Bodum-logo-o.svg'),
    note: 'Coffee tools and kitchen pieces with countertop appeal.',
    description:
      'Bodum reinforces the kitchen and home assortment with approachable ritual gear and clean glass forms.',
    origin: 'Switzerland',
    founded: '1944',
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    categories: ['kitchen', 'home'],
  },
  {
    name: 'West Elm',
    slug: 'west-elm',
    logoUrl: wikimediaFile('West Elm logo.png'),
    note: 'Furniture and decor with modern warmth.',
    description:
      'West Elm fills out the home edit with approachable furniture pieces and room accents that feel styled.',
    origin: 'United States',
    founded: '2002',
    heroImage: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
    categories: ['home'],
  },
  {
    name: 'Osprey',
    slug: 'osprey',
    logoUrl: wikimediaFile('Osprey logo.png'),
    note: 'Travel and outdoor gear built for movement.',
    description:
      'Osprey contributes durable travel packs and light-adventure gear that still fit the shop aesthetic.',
    origin: 'United States',
    founded: '1974',
    heroImage: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80',
    categories: ['travel', 'outdoor'],
  },
  {
    name: 'Bose',
    slug: 'bose',
    logoUrl: simpleIcon('bose'),
    note: 'Portable sound for focused commutes and travel days.',
    description:
      'Bose strengthens the audio mix with compact, high-performance pieces made for motion as much as desks.',
    origin: 'United States',
    founded: '1964',
    heroImage: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=80',
    categories: ['tech', 'travel'],
  },
  {
    name: 'Patagonia',
    slug: 'patagonia',
    logoUrl: wikimediaFile('Patagonia (Unternehmen) logo.svg'),
    note: 'Utility layers that work in cities and outdoors.',
    description:
      'Patagonia gives the catalog a practical outdoor layer with shells, fleece, and movement-ready gear.',
    origin: 'United States',
    founded: '1973',
    heroImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    categories: ['outdoor', 'style'],
  },
  {
    name: 'Away',
    slug: 'away',
    logoUrl: wikimediaFile('Away logo.jpg'),
    note: 'Travel pieces designed for calmer packing.',
    description:
      'Away brings polished luggage and mobile organization pieces to the travel mix without visual noise.',
    origin: 'United States',
    founded: '2015',
    heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    categories: ['travel', 'style'],
  },
];

const shippingNotes = [
  'Packed with presentation-grade materials',
  'Eligible for concierge gift wrap',
  'Priority shipping available at checkout',
  'Easy return window included',
];

const makeProduct = (brand, brandIndex, categorySlug, categoryIndex, itemIndex, id) => {
  const category = categoryLookup.get(categorySlug);
  const seed = brandIndex * 29 + categoryIndex * 11 + itemIndex * 7;
  const descriptor = pick(category.descriptors, seed);
  const noun = pick(category.productNouns, seed + brandIndex + 3);
  const name = `${descriptor} ${noun}`;
  const productSlug = slugify(name);
  const slug = slugify(`${brand.slug}-${name}`);
  const pathSegments = [brand.slug, category.slug, productSlug];
  const badge = pick(category.badges, seed + 2);
  const priceFloor = category.priceRange[0];
  const priceCeiling = category.priceRange[1];
  const spread = priceCeiling - priceFloor;
  const rawPrice = priceFloor + ((seed * 17 + 37) % spread);
  const price = roundPrice(rawPrice, category.priceStep);
  const markdownRate = 1.14 + (((seed + brandIndex) % 11) * 0.02);
  const originalPrice = roundPrice(price * markdownRate, category.priceStep);
  const rating = Number((4.5 + ((seed + itemIndex) % 5) * 0.1).toFixed(1));
  const reviews = 58 + ((seed + brandIndex * 13) % 290);
  const stock = 4 + ((seed + itemIndex) % 13);
  const primaryImage = pick(category.imagePool, seed);
  const gallery = [
    primaryImage,
    pick(category.imagePool, seed + 1),
    pick(category.imagePool, seed + 2),
  ];
  const colors = unique([
    pick(category.colors, seed),
    pick(category.colors, seed + 1),
    pick(category.colors, seed + 2),
  ]);
  const materials = unique([
    pick(category.materials, seed),
    pick(category.materials, seed + 2),
  ]);

  return {
    id,
    type: 'product',
    slug,
    productSlug,
    path: `/${pathSegments.join('/')}`,
    pathSegments,
    sku: `${brand.slug.slice(0, 3).toUpperCase()}-${category.slug.slice(0, 3).toUpperCase()}-${id}`,
    name,
    brand: brand.name,
    brandSlug: brand.slug,
    category: category.name,
    categorySlug,
    price,
    originalPrice,
    rating,
    reviews,
    image: primaryImage,
    gallery,
    badge,
    stock,
    colors,
    materials,
    shipping: category.shipping,
    note: pick(shippingNotes, seed + brandIndex),
    description: `${brand.name} brings ${descriptor.toLowerCase()} energy to this ${noun.toLowerCase()}, shaped for ${category.name.toLowerCase()} shoppers who want utility and polish in the same piece.`,
    highlights: [
      `${materials[0]} finish with a premium hand feel`,
      `${colors[0]}-led palette designed to mix easily with the rest of the storefront`,
      `${category.name} favorite with a ${stock <= 6 ? 'limited-run' : 'steady-stock'} restock window`,
    ],
    specs: [
      { label: 'Brand', value: brand.name },
      { label: 'Category', value: category.name },
      { label: 'Colors', value: colors.join(', ') },
      { label: 'Shipping', value: category.shipping },
      { label: 'SKU', value: `${brand.slug.slice(0, 3).toUpperCase()}-${category.slug.slice(0, 3).toUpperCase()}-${id}` },
    ],
  };
};

let nextId = 1000;

export const catalogProducts = brandDefinitions.flatMap((brand, brandIndex) =>
  brand.categories.flatMap((categorySlug, categoryIndex) =>
    Array.from({ length: 4 }, (_, itemIndex) =>
      makeProduct(brand, brandIndex, categorySlug, categoryIndex, itemIndex, nextId++),
    ),
  ),
);

const productGroupsByBrand = new Map();
const productGroupsByCategory = new Map();

catalogProducts.forEach((product) => {
  const brandProducts = productGroupsByBrand.get(product.brandSlug) ?? [];
  brandProducts.push(product);
  productGroupsByBrand.set(product.brandSlug, brandProducts);

  const categoryProducts = productGroupsByCategory.get(product.categorySlug) ?? [];
  categoryProducts.push(product);
  productGroupsByCategory.set(product.categorySlug, categoryProducts);
});

export const catalogBrands = brandDefinitions.map((brand) => {
  const products = productGroupsByBrand.get(brand.slug) ?? [];
  const categories = brand.categories
    .map((categorySlug) => categoryLookup.get(categorySlug))
    .filter(Boolean)
    .map((category) => ({
      slug: category.slug,
      name: category.name,
    }));

  return {
    ...brand,
    type: 'brand',
    productCount: products.length,
    averagePrice: Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length),
    categories,
    featuredProducts: products.slice(0, 4),
  };
});

export const catalogCategories = categoryDefinitions.map((category) => {
  const products = productGroupsByCategory.get(category.slug) ?? [];
  const brandSlugs = unique(products.map((product) => product.brandSlug));
  const featuredBrands = brandSlugs
    .map((brandSlug) => catalogBrands.find((brand) => brand.slug === brandSlug))
    .filter(Boolean);

  return {
    ...category,
    type: 'category',
    productCount: products.length,
    brandCount: featuredBrands.length,
    averagePrice: Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length),
    featuredBrands: featuredBrands.slice(0, 5),
    featuredProducts: products.slice(0, 4),
  };
});

const brandsBySlug = new Map(catalogBrands.map((brand) => [brand.slug, brand]));
const categoriesBySlug = new Map(catalogCategories.map((category) => [category.slug, category]));
const productsBySlug = new Map(catalogProducts.map((product) => [product.slug, product]));
const productsByPath = new Map(catalogProducts.map((product) => [product.pathSegments.join('/'), product]));

export const catalogSummary = {
  productCount: catalogProducts.length,
  brandCount: catalogBrands.length,
  categoryCount: catalogCategories.length,
};

export const homeBrandWall = catalogBrands.slice(0, 6).map((brand) => ({
  name: brand.name,
  note: brand.note,
  slug: brand.slug,
  logoUrl: brand.logoUrl ?? null,
}));

export const homeNewArrivals = catalogProducts.slice(0, 8);

export const homeBestSellers = [...catalogProducts]
  .sort((left, right) => right.reviews - left.reviews)
  .slice(0, 8);

export const homeEditorialPicks = [
  getProductsByBrandSlug('coach')[0],
  getProductsByBrandSlug('sony')[1],
  getProductsByBrandSlug('le-creuset')[0],
  getProductsByBrandSlug('byredo')[0],
  getProductsByBrandSlug('muuto')[0],
  getProductsByBrandSlug('away')[1],
  getProductsByBrandSlug('canon')[0],
  getProductsByBrandSlug('aesop')[0],
].filter(Boolean);

export const homeRecentlyViewed = [
  getProductsByBrandSlug('nike')[0],
  getProductsByBrandSlug('brooklinen')[1],
  getProductsByBrandSlug('apple')[2],
  getProductsByBrandSlug('bodum')[0],
  getProductsByBrandSlug('veja')[1],
].filter(Boolean);

export function getProductBySlug(slug) {
  return productsBySlug.get(slug) ?? null;
}

export function getBrandBySlug(slug) {
  return brandsBySlug.get(slug) ?? null;
}

export function getCategoryBySlug(slug) {
  return categoriesBySlug.get(slug) ?? null;
}

export function getProductsByBrandSlug(slug) {
  return productGroupsByBrand.get(slug) ?? [];
}

export function getProductsByCategorySlug(slug) {
  return productGroupsByCategory.get(slug) ?? [];
}

export function getRelatedProducts(product, limit = 4) {
  const sameCategory = getProductsByCategorySlug(product.categorySlug).filter(
    (candidate) => candidate.slug !== product.slug,
  );
  const sameBrand = getProductsByBrandSlug(product.brandSlug).filter(
    (candidate) => candidate.slug !== product.slug,
  );

  return unique([...sameCategory, ...sameBrand]).slice(0, limit);
}

export function getAllCatalogSlugs() {
  return [
    ...catalogBrands.map((brand) => [brand.slug]),
    ...catalogCategories.map((category) => [category.slug]),
    ...catalogProducts.map((product) => product.pathSegments),
  ];
}

function normalizeSlugSegments(slug) {
  if (Array.isArray(slug)) {
    return slug.filter(Boolean);
  }

  if (typeof slug === 'string') {
    return slug.split('/').filter(Boolean);
  }

  return [];
}

export function resolveCatalogSlug(slug) {
  const segments = normalizeSlugSegments(slug);

  if (segments.length === 1) {
    const [singleSlug] = segments;

    if (brandsBySlug.has(singleSlug)) {
      return { type: 'brand', item: brandsBySlug.get(singleSlug) };
    }

    if (categoriesBySlug.has(singleSlug)) {
      return { type: 'category', item: categoriesBySlug.get(singleSlug) };
    }
  }

  if (segments.length === 3) {
    const product = productsByPath.get(segments.join('/'));

    if (product) {
      return { type: 'product', item: product };
    }
  }

  return null;
}
