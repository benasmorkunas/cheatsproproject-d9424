import { SimpleProduct } from '@/contexts/CartContext';
import products from '@/data/products.json';

export interface ProductGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number; // Price of the 1-day variant
  variants: SimpleProduct[];
  game: 'bf6' | 'cs2';
  tier: 'lite' | 'plus' | 'pro';
}

// Group products by their base name (without duration)
export function getProductGroups(): ProductGroup[] {
  const groups: ProductGroup[] = [];
  
  // Define the product groups
  const gamesTiers = [
    { game: 'bf6' as const, tier: 'plus' as const },
    { game: 'bf6' as const, tier: 'pro' as const },
    { game: 'cs2' as const, tier: 'lite' as const },
    { game: 'cs2' as const, tier: 'plus' as const },
    { game: 'cs2' as const, tier: 'pro' as const },
  ];
  
  gamesTiers.forEach(({ game, tier }) => {
    const variants = products.filter(product => 
      product.id.startsWith(game) && product.id.includes(tier)
    ) as SimpleProduct[];
    
    if (variants.length > 0) {
      // Sort variants by price (1-day, 7-day, 30-day)
      const sortedVariants = variants.sort((a, b) => a.price - b.price);
      const baseProduct = sortedVariants[0]; // Use 1-day variant as base
      const gameName = game === 'bf6' ? 'BF6' : 'CS2';
      const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
      
      groups.push({
        id: `${game}-${tier}`,
        name: `${gameName} ${tierName} Version`,
        description: baseProduct.description,
        image: baseProduct.image,
        basePrice: baseProduct.price,
        variants: sortedVariants,
        game,
        tier
      });
    }
  });
  
  return groups;
}

// Get all individual products (for pages that need all variants)
export function getAllProducts(): SimpleProduct[] {
  return products as SimpleProduct[];
}

// Get products by game
export function getProductsByGame(game: 'bf6' | 'cs2'): ProductGroup[] {
  return getProductGroups().filter(group => group.game === game);
}

// Get a specific product group by ID
export function getProductGroup(groupId: string): ProductGroup | undefined {
  return getProductGroups().find(group => group.id === groupId);
}

// Get individual product by ID
export function getProductById(productId: string): SimpleProduct | undefined {
  return getAllProducts().find(product => product.id === productId);
}

// Convert ProductGroup to SimpleProduct (using the 1-day variant)
export function convertGroupToSimpleProduct(group: ProductGroup): SimpleProduct {
  return group.variants[0]; // Return the 1-day variant
}