import { getCS2Products, getBF6Products } from './mockProducts';

interface CategoryStats {
  products: number;
  users: string;
  rating: string;
}

export async function getCategoryStats(): Promise<{
  cs2: CategoryStats;
  bf6: CategoryStats;
}> {
  // Use local product data
  const cs2ProductCount = getCS2Products().length;
  const bf6ProductCount = getBF6Products().length;

  return {
    cs2: {
      products: cs2ProductCount,
      users: '2.5K+',
      rating: '4.7'
    },
    bf6: {
      products: bf6ProductCount,
      users: '3.8K+',
      rating: '4.8'
    }
  };
}