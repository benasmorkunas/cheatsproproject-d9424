'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { SimpleProduct, convertToWooCommerceFormat } from '@/lib/products';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { mockProducts } from '@/lib/mockProducts';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Shield, 
  Check, 
  Download,
  Users,
  Clock,
  Minus,
  Plus,
  AlertTriangle
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [productGroup, setProductGroup] = useState<any>(null);
  const [availableVariants, setAvailableVariants] = useState<any[]>([]);
  const { addToCart } = useCart();

  const convertProductToSimple = (product: Product): SimpleProduct | null => {
    if (!product) return null;
    
    return {
      id: product.id.toString(),
      name: product.name,
      price: Math.round(parseFloat(product.price) * 100), // Convert to cents
      description: product.short_description || product.description,
      image: product.images?.[0]?.src || '',
      stripe_price_id: product.sku || '',
      currency: 'usd'
    };
  };

  useEffect(() => {
    if (params.slug) {
      loadProduct(params.slug as string);
    }
  }, [params.slug]);

  const createMockProduct = (slug: string): Product | null => {
    if (slug === 'cs2-aimbot-pro-version') {
      return {
        id: 1,
        name: 'CS2 Aimbot Pro Version',
        slug: 'cs2-aimbot-pro-version',
        permalink: '/products/cs2-aimbot-pro-version',
        date_created: new Date().toISOString(),
        date_created_gmt: new Date().toISOString(),
        date_modified: new Date().toISOString(),
        date_modified_gmt: new Date().toISOString(),
        type: 'simple',
        status: 'publish',
        featured: true,
        catalog_visibility: 'visible',
        description: '<h3>Advanced CS2 Aimbot Features</h3><ul><li>Precision aimbot with smooth targeting</li><li>Customizable FOV and aim speed settings</li><li>ESP wallhack with player information</li><li>Advanced anti-recoil compensation</li><li>Undetected by VAC and third-party anti-cheat</li><li>Regular updates and 24/7 support</li><li>Easy-to-use interface with hotkey controls</li><li>Compatible with all CS2 game modes</li></ul>',
        short_description: 'Advanced aimbot with precision targeting, customizable settings, and undetected gameplay for Counter-Strike 2. Trusted by thousands of players worldwide.',
        sku: 'cs2-aimbot-pro-v1',
        price: '29.99',
        regular_price: '49.99',
        sale_price: '29.99',
        date_on_sale_from: null,
        date_on_sale_from_gmt: null,
        date_on_sale_to: null,
        date_on_sale_to_gmt: null,
        on_sale: true,
        purchasable: true,
        total_sales: 2847,
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
        average_rating: '4.8',
        rating_count: 1247,
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: 'Download link will be provided immediately after purchase. Check your email for installation instructions.',
        categories: [
          { id: 1, name: 'FPS Cheats', slug: 'fps-cheats' },
          { id: 2, name: 'Counter-Strike 2', slug: 'cs2' },
          { id: 3, name: 'Premium Tools', slug: 'premium-tools' }
        ],
        tags: [
          { id: 1, name: 'Aimbot', slug: 'aimbot' },
          { id: 2, name: 'Undetected', slug: 'undetected' },
          { id: 3, name: 'CS2', slug: 'cs2' }
        ],
        images: [
          {
            id: 1,
            date_created: new Date().toISOString(),
            date_created_gmt: new Date().toISOString(),
            date_modified: new Date().toISOString(),
            date_modified_gmt: new Date().toISOString(),
            src: '/api/placeholder/600/600',
            name: 'cs2-aimbot-main',
            alt: 'CS2 Aimbot Pro Version - Main Interface'
          },
          {
            id: 2,
            date_created: new Date().toISOString(),
            date_created_gmt: new Date().toISOString(),
            date_modified: new Date().toISOString(),
            date_modified_gmt: new Date().toISOString(),
            src: '/api/placeholder/600/600',
            name: 'cs2-aimbot-settings',
            alt: 'CS2 Aimbot Pro Version - Settings Panel'
          },
          {
            id: 3,
            date_created: new Date().toISOString(),
            date_created_gmt: new Date().toISOString(),
            date_modified: new Date().toISOString(),
            date_modified_gmt: new Date().toISOString(),
            src: '/api/placeholder/600/600',
            name: 'cs2-aimbot-gameplay',
            alt: 'CS2 Aimbot Pro Version - In-Game Screenshot'
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
    return null;
  };

  const loadProduct = async (slug: string) => {
    try {
      setLoading(true);
      let foundProduct: Product | null = null;
      
      // Check if this is a product group ID (like cs2-plus, bf6-pro)
      if (!foundProduct) {
        const { getProductGroup, convertToWooCommerceFormat } = await import('@/lib/products');
        const group = getProductGroup(slug);
        
        if (group) {
          // For product groups, use the cheapest variant as base
          foundProduct = convertToWooCommerceFormat(group.variants[0]) as Product;
          foundProduct.slug = slug; // Use the group slug
          setProductGroup(group);
          setAvailableVariants(group.variants);
          setSelectedDuration(group.variants[0].id); // Select cheapest by default
        }
      }
      
      // Fallback to mock products
      if (!foundProduct) {
        foundProduct = mockProducts.find(p => p.slug === slug) || null;
      }
      
      // Final fallback to createMockProduct for backwards compatibility
      if (!foundProduct) {
        foundProduct = createMockProduct(slug);
      }
      
      setProduct(foundProduct);
      
    } catch (error) {
      console.error('Error loading product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product && selectedDuration) {
      // If we have variants, use the selected duration variant
      const productToAdd = product;
      
      if (availableVariants.length > 1) {
        const selectedVariant = availableVariants.find(v => v.id === selectedDuration);
        if (selectedVariant) {
          // Add the selected variant with the selected quantity
          for (let i = 0; i < quantity; i++) {
            addToCart(selectedVariant);
          }
          return; // Exit early since we've added the variant
        }
      }
      
      // Add the product with the selected quantity (fallback)
      const simpleProduct = convertProductToSimple(productToAdd);
      if (simpleProduct) {
        for (let i = 0; i < quantity; i++) {
          addToCart(simpleProduct);
        }
      }
    } else if (product) {
      // Fallback for products without variants
      const simpleProduct = convertProductToSimple(product);
      if (simpleProduct) {
        for (let i = 0; i < quantity; i++) {
          addToCart(simpleProduct);
        }
      }
    }
  };

  const isOutOfStock = product?.stock_status === 'outofstock';
  const isOnSale = product?.on_sale;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Image Skeleton */}
              <div className="space-y-6">
                <div className="aspect-square bg-black/40 rounded-2xl animate-pulse"></div>
                <div className="flex gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-black/40 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Content Skeleton */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-10 bg-black/40 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-black/40 rounded-lg w-1/2 animate-pulse"></div>
                </div>
                <div className="h-24 bg-black/40 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-black/40 rounded-lg animate-pulse"></div>
                <div className="h-12 bg-black/40 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-12 text-center"
            >
              <div className="w-24 h-24 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-gray-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                The product you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                onClick={() => window.history.back()}
              >
                Go Back
              </motion.button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - Premium Gaming Cheat | Cheats-Pro</title>
        <meta name="description" content={product.short_description || `Get ${product.name} - premium undetected gaming enhancement tool with advanced features.`} />
        <meta name="keywords" content={`${product.name}, gaming cheat, hack, aimbot, wallhack, ESP, undetected, premium`} />
        <meta property="og:title" content={`${product.name} - Premium Gaming Cheat`} />
        <meta property="og:description" content={product.short_description || `Get ${product.name} - premium undetected gaming enhancement tool.`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.images?.[0]?.src || ''} />
        <link rel="canonical" href={`https://cheats-pro.com/products/${product.slug}`} />
      </Head>
      
      <div className="min-h-screen bg-gray-900">
        <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="py-6 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-black/40 border border-gray-600/20">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[selectedImage]?.src || product.images[0].src}
                      alt={product.images[selectedImage]?.alt || product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <Shield className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <span className="text-gray-400">No image available</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isOnSale && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        SALE
                      </div>
                    )}
                    {product.featured && (
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>FEATURED</span>
                      </div>
                    )}
                  </div>

                  {isOutOfStock && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gray-800/90 border border-gray-600 text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? 'border-purple-500 scale-105'
                            : 'border-gray-600 hover:border-purple-400'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(parseFloat(product.average_rating)) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    ))}
                    <span className="text-gray-400 ml-2">
                      ({product.average_rating}) • {product.rating_count.toLocaleString()} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    {isOnSale && product.regular_price ? (
                      <>
                        <span className="text-3xl font-bold text-green-400">
                          ${product.price}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          ${product.regular_price}
                        </span>
                        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                          <span className="text-green-400 text-sm font-medium">
                            -{Math.round((1 - parseFloat(product.price) / parseFloat(product.regular_price)) * 100)}% OFF
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                {product.short_description && (
                  <div className="bg-gray-800/30 rounded-xl p-6">
                    <p className="text-gray-300 leading-relaxed">
                      {product.short_description}
                    </p>
                  </div>
                )}

                {/* Key Features */}
                <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-purple-400 mr-2" />
                    Key Features
                  </h3>
                  <div className="grid gap-3">
                    <div className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Undetected by Anti-Cheat</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Regular Updates & Support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Easy Installation & Setup</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">24/7 Customer Support</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-white">5000+</div>
                    <div className="text-xs text-gray-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-white">24/7</div>
                    <div className="text-xs text-gray-400">Support</div>
                  </div>
                  <div className="text-center">
                    <Download className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-white">Instant</div>
                    <div className="text-xs text-gray-400">Download</div>
                  </div>
                </div>

                {/* Duration Selection (if multiple variants available) */}
                {availableVariants.length > 1 && (
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-blue-400 mr-2" />
                      Choose Duration
                    </h3>
                    <div className="grid gap-3">
                      {availableVariants.map((variant) => {
                        const duration = variant.id.split('-').pop();
                        const durationLabel = duration === '1day' ? '1 Day' : 
                                            duration === '7day' ? '7 Days' : 
                                            duration === '30day' ? '30 Days' : duration;
                        
                        return (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedDuration(variant.id)}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                              selectedDuration === variant.id
                                ? 'border-purple-500 bg-purple-500/20'
                                : 'border-gray-600 bg-gray-700/30 hover:border-purple-400'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-white">{durationLabel}</div>
                                <div className="text-sm text-gray-400">{variant.description}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-purple-400">
                                  ${(variant.price / 100).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-300">Quantity:</span>
                    <div className="flex items-center bg-black/40 border border-gray-600 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={isOutOfStock || !product.purchasable}
                      className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isOutOfStock || !product.purchasable
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-black/40 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-black/40 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.categories.map((category) => (
                        <div key={category.id} className="bg-purple-600/20 border border-purple-500/30 rounded-full px-3 py-1 text-sm text-purple-300">
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Product Description */}
            {product.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16"
              >
                <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Product Details</h2>
                  <div
                    className="prose prose-invert prose-purple max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                    style={{
                      color: '#d1d5db'
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
        <Footer />
      </div>
    </>
  );
}