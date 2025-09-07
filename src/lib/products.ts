// Import products data directly to avoid JSON import issues
const productsData = [
  {
    "id": "bf6-plus-1day",
    "name": "BF6 PLUS VERSION",
    "price": 599,
    "description": "Advanced BF6 aimbot with auto aim, target lock, and precision shooting. Undetected Battlefield 6 hack with smooth aim assistance, customizable FOV, and rage mode. Perfect for competitive gaming, ranked matches, and skill improvement.",
    "image": "/images/bf6-plus.webp",
    "stripe_price_id": "price_bf6_plus_1day",
    "currency": "usd"
  },
  {
    "id": "bf6-plus-7day",
    "name": "BF6 PLUS VERSION",
    "price": 1499,
    "description": "Advanced BF6 aimbot with auto aim, target lock, and precision shooting. Undetected Battlefield 6 hack with smooth aim assistance, customizable FOV, and rage mode. Perfect for competitive gaming, ranked matches, and skill improvement.",
    "image": "/images/bf6-plus.webp",
    "stripe_price_id": "price_bf6_plus_7day",
    "currency": "usd"
  },
  {
    "id": "bf6-plus-30day",
    "name": "BF6 PLUS VERSION",
    "price": 2999,
    "description": "Advanced BF6 aimbot with auto aim, target lock, and precision shooting. Undetected Battlefield 6 hack with smooth aim assistance, customizable FOV, and rage mode. Perfect for competitive gaming, ranked matches, and skill improvement.",
    "image": "/images/bf6-plus.webp",
    "stripe_price_id": "price_bf6_plus_30day",
    "currency": "usd"
  },
  {
    "id": "bf6-pro-1day",
    "name": "BF6 PRO VERSION",
    "price": 799,
    "description": "Premium BF6 cheat with aimbot and ESP wallhack combo. Undetected Battlefield 6 hack featuring enemy ESP, player tracking, auto aim, and wall penetration vision. Dominate servers with professional gaming tools and anti-cheat bypass.",
    "image": "/images/bf6-pro.webp",
    "stripe_price_id": "price_bf6_pro_1day",
    "currency": "usd"
  },
  {
    "id": "bf6-pro-7day",
    "name": "BF6 PRO VERSION",
    "price": 1999,
    "description": "Premium BF6 cheat with aimbot and ESP wallhack combo. Undetected Battlefield 6 hack featuring enemy ESP, player tracking, auto aim, and wall penetration vision. Dominate servers with professional gaming tools and anti-cheat bypass.",
    "image": "/images/bf6-pro.webp",
    "stripe_price_id": "price_bf6_pro_7day",
    "currency": "usd"
  },
  {
    "id": "bf6-pro-30day",
    "name": "BF6 PRO VERSION",
    "price": 3999,
    "description": "Premium BF6 cheat with aimbot and ESP wallhack combo. Undetected Battlefield 6 hack featuring enemy ESP, player tracking, auto aim, and wall penetration vision. Dominate servers with professional gaming tools and anti-cheat bypass.",
    "image": "/images/bf6-pro.webp",
    "stripe_price_id": "price_bf6_pro_30day",
    "currency": "usd"
  },
  {
    "id": "cs2-lite-1day",
    "name": "CS2 LITE VERSION",
    "price": 399,
    "description": "CS2 ESP wallhack with enemy detection and player tracking. Undetected Counter-Strike 2 cheat showing enemy positions, health bars, weapon info, and distance through walls. Entry-level CS2 hack for tactical advantage and map awareness.",
    "image": "/images/productimages/cs2-lite.png",
    "stripe_price_id": "price_cs2_lite_1day",
    "currency": "usd"
  },
  {
    "id": "cs2-lite-7day",
    "name": "CS2 LITE VERSION",
    "price": 999,
    "description": "CS2 ESP wallhack with enemy detection and player tracking. Undetected Counter-Strike 2 cheat showing enemy positions, health bars, weapon info, and distance through walls. Entry-level CS2 hack for tactical advantage and map awareness.",
    "image": "/images/productimages/cs2-lite.png",
    "stripe_price_id": "price_cs2_lite_7day",
    "currency": "usd"
  },
  {
    "id": "cs2-lite-30day",
    "name": "CS2 LITE VERSION",
    "price": 1999,
    "description": "CS2 ESP wallhack with enemy detection and player tracking. Undetected Counter-Strike 2 cheat showing enemy positions, health bars, weapon info, and distance through walls. Entry-level CS2 hack for tactical advantage and map awareness.",
    "image": "/images/productimages/cs2-lite.png",
    "stripe_price_id": "price_cs2_lite_30day",
    "currency": "usd"
  },
  {
    "id": "cs2-plus-1day",
    "name": "CS2 PLUS VERSION",
    "price": 599,
    "description": "CS2 aimbot and ESP combo pack with wallhack and auto aim. Undetected Counter-Strike 2 cheat featuring enemy ESP, smooth aimbot, headshot assistance, and recoil control. Professional CS2 hack for competitive gaming and rank climbing.",
    "image": "/images/cs2-plus.webp",
    "stripe_price_id": "price_cs2_plus_1day",
    "currency": "usd"
  },
  {
    "id": "cs2-plus-7day",
    "name": "CS2 PLUS VERSION",
    "price": 1499,
    "description": "CS2 aimbot and ESP combo pack with wallhack and auto aim. Undetected Counter-Strike 2 cheat featuring enemy ESP, smooth aimbot, headshot assistance, and recoil control. Professional CS2 hack for competitive gaming and rank climbing.",
    "image": "/images/cs2-plus.webp",
    "stripe_price_id": "price_cs2_plus_7day",
    "currency": "usd"
  },
  {
    "id": "cs2-plus-30day",
    "name": "CS2 PLUS VERSION",
    "price": 2999,
    "description": "CS2 aimbot and ESP combo pack with wallhack and auto aim. Undetected Counter-Strike 2 cheat featuring enemy ESP, smooth aimbot, headshot assistance, and recoil control. Professional CS2 hack for competitive gaming and rank climbing.",
    "image": "/images/cs2-plus.webp",
    "stripe_price_id": "price_cs2_plus_30day",
    "currency": "usd"
  },
  {
    "id": "cs2-pro-1day",
    "name": "CS2 PRO VERSION",
    "price": 799,
    "description": "Premium CS2 cheat with aimbot, ESP, grenade helper, and stream-proof features. Undetected Counter-Strike 2 hack with wallhack, auto aim, nade trajectories, bomb timer, and streamer mode. Ultimate CS2 tool for professional gaming and content creation.",
    "image": "/images/cs2-pro.webp",
    "stripe_price_id": "price_cs2_pro_1day",
    "currency": "usd"
  },
  {
    "id": "cs2-pro-7day",
    "name": "CS2 PRO VERSION",
    "price": 1999,
    "description": "Premium CS2 cheat with aimbot, ESP, grenade helper, and stream-proof features. Undetected Counter-Strike 2 hack with wallhack, auto aim, nade trajectories, bomb timer, and streamer mode. Ultimate CS2 tool for professional gaming and content creation.",
    "image": "/images/cs2-pro.webp",
    "stripe_price_id": "price_cs2_pro_7day",
    "currency": "usd"
  },
  {
    "id": "cs2-pro-30day",
    "name": "CS2 PRO VERSION",
    "price": 3999,
    "description": "Premium CS2 cheat with aimbot, ESP, grenade helper, and stream-proof features. Undetected Counter-Strike 2 hack with wallhack, auto aim, nade trajectories, bomb timer, and streamer mode. Ultimate CS2 tool for professional gaming and content creation.",
    "image": "/images/cs2-pro.webp",
    "stripe_price_id": "price_cs2_pro_30day",
    "currency": "usd"
  }
];

export interface SimpleProduct {
  id: string;
  name: string;
  price: number; // in cents
  description: string;
  image: string;
  stripe_price_id: string;
  currency: string;
}

export interface ProductGroup {
  id: string;
  name: string;
  baseDescription: string;
  image: string;
  game: 'bf6' | 'cs2';
  tier: 'lite' | 'plus' | 'pro';
  variants: SimpleProduct[];
}

// Convert price from cents to dollars for display
export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2);
}

// Get all individual products 
export function getAllProducts(): SimpleProduct[] {
  return productsData;
}

// Get single product by ID
export function getProductById(id: string): SimpleProduct | undefined {
  return productsData.find(product => product.id === id);
}

// Get product groups for main catalog display (no duration variants shown)
export function getProductGroups(): ProductGroup[] {
  const groups: ProductGroup[] = [];
  
  // Group products by game and tier
  const gamesTiers = [
    { game: 'bf6' as const, tier: 'plus' as const },
    { game: 'bf6' as const, tier: 'pro' as const },
    { game: 'cs2' as const, tier: 'lite' as const },
    { game: 'cs2' as const, tier: 'plus' as const },
    { game: 'cs2' as const, tier: 'pro' as const },
  ];
  
  gamesTiers.forEach(({ game, tier }) => {
    const variants = productsData.filter(product => 
      product.id.startsWith(game) && product.id.includes(tier)
    );
    
    if (variants.length > 0) {
      const baseProduct = variants[0]; // Use first variant for base info
      const gameName = game === 'bf6' ? 'BF6' : 'CS2';
      const tierName = tier.toUpperCase();
      
      groups.push({
        id: `${game}-${tier}`,
        name: `${gameName} ${tierName} VERSION`,
        baseDescription: baseProduct.description,
        image: baseProduct.image,
        game,
        tier,
        variants: variants.sort((a, b) => a.price - b.price) // Sort by price
      });
    }
  });
  
  return groups;
}

// Get product group by ID (for individual product pages)
export function getProductGroup(groupId: string): ProductGroup | undefined {
  return getProductGroups().find(group => group.id === groupId);
}

// Get product group that contains a specific product ID
export function getProductGroupByProductId(productId: string): ProductGroup | undefined {
  const groups = getProductGroups();
  return groups.find(group => 
    group.variants.some(variant => variant.id === productId)
  );
}

// Get featured product groups (pro versions)
export function getFeaturedProductGroups(): ProductGroup[] {
  return getProductGroups().filter(group => group.tier === 'pro');
}

// Get product groups by game
export function getProductGroupsByGame(game: 'bf6' | 'cs2'): ProductGroup[] {
  return getProductGroups().filter(group => group.game === game);
}

// Convert simple product to WooCommerce-like format for compatibility
export function convertToWooCommerceFormat(product: SimpleProduct) {
  return {
    id: parseInt(product.id.replace(/[^0-9]/g, '') || '1'),
    name: product.name,
    slug: product.id,
    permalink: `/products/${product.id}`,
    date_created: new Date().toISOString(),
    date_created_gmt: new Date().toISOString(),
    date_modified: new Date().toISOString(),
    date_modified_gmt: new Date().toISOString(),
    type: 'simple',
    status: 'publish',
    featured: product.id.includes('pro'),
    catalog_visibility: 'visible',
    description: `<p>${product.description}</p>`,
    short_description: product.description,
    sku: product.id.toUpperCase(),
    price: formatPrice(product.price),
    regular_price: formatPrice(product.price),
    sale_price: '',
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    on_sale: false,
    purchasable: true,
    total_sales: Math.floor(Math.random() * 1000) + 100,
    virtual: true,
    downloadable: true,
    external_url: '',
    button_text: '',
    tax_status: 'taxable',
    tax_class: '',
    manage_stock: false,
    stock_quantity: null,
    stock_status: 'instock',
    backorders: 'no',
    backorders_allowed: false,
    backordered: false,
    low_stock_amount: null,
    sold_individually: false,
    weight: '',
    shipping_required: false,
    shipping_taxable: false,
    shipping_class: '',
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    rating_count: Math.floor(Math.random() * 500) + 50,
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: 'Download link will be provided immediately after purchase.',
    categories: [
      { 
        id: product.id.startsWith('bf6') ? 1 : 2, 
        name: product.id.startsWith('bf6') ? 'Battlefield 6' : 'Counter-Strike 2',
        slug: product.id.startsWith('bf6') ? 'bf6' : 'cs2'
      }
    ],
    tags: [
      { id: 1, name: 'Gaming Cheat', slug: 'gaming-cheat' },
      { id: 2, name: 'Undetected', slug: 'undetected' }
    ],
    images: [
      {
        id: 1,
        date_created: new Date().toISOString(),
        date_created_gmt: new Date().toISOString(),
        date_modified: new Date().toISOString(),
        date_modified_gmt: new Date().toISOString(),
        src: product.image,
        name: `${product.id}-main`,
        alt: `${product.name} - Main Product Image`
      }
    ],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    related_ids: [],
    meta_data: []
  };
}

// Get product categories with counts
export function getProductCategories() {
  const bf6Count = getProductGroupsByGame('bf6').length;
  const cs2Count = getProductGroupsByGame('cs2').length;
  
  return [
    {
      id: 1,
      name: 'Battlefield 6',
      slug: 'bf6',
      description: 'Advanced Battlefield 6 gaming enhancements',
      count: bf6Count,
      image: '/images/bf6-cheats-status-logo.webp'
    },
    {
      id: 2,
      name: 'Counter-Strike 2',
      slug: 'cs2', 
      description: 'Professional CS2 gaming tools',
      count: cs2Count,
      image: '/images/cs2-cheats-status-logo.webp'
    }
  ];
}