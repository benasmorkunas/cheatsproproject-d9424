'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search, Filter, X, DollarSign, Tag, Star } from 'lucide-react';

interface ProductFiltersProps {
  onFiltersChange: (filters: ProductFilters) => void;
  categories?: { id: number; name: string; slug: string }[];
  loading?: boolean;
  hideCategory?: boolean;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  onSale: boolean;
  inStock: boolean;
  featured: boolean;
}

export function ProductFilters({ onFiltersChange, categories = [], loading, hideCategory = false }: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    onSale: false,
    inStock: false,
    featured: false,
  });

  const handleFilterChange = (key: keyof ProductFilters, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: ProductFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      onSale: false,
      inStock: false,
      featured: false,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-white">Filters</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="flex items-center space-x-1 text-gray-400 hover:text-white text-sm transition-colors duration-300"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Search className="w-4 h-4 text-gray-400" />
              <label className="text-sm font-medium text-gray-300">Search Products</label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for gaming tools..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>


          {/* Price Range */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <label className="text-sm font-medium text-gray-300">Price Range</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  placeholder="Min ($)"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max ($)"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Filter Options */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-gray-400" />
              <label className="text-sm font-medium text-gray-300">Product Options</label>
            </div>
            <div className="space-y-3">
              <motion.label 
                whileHover={{ x: 2 }}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                    filters.onSale 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-600 group-hover:border-green-500'
                  }`}>
                    {filters.onSale && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  On Sale
                </span>
                <div className="bg-green-500/20 border border-green-500/30 rounded-full px-2 py-0.5">
                  <span className="text-green-400 text-xs">SAVE</span>
                </div>
              </motion.label>

              <motion.label 
                whileHover={{ x: 2 }}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                    filters.inStock 
                      ? 'bg-gray-600 border-gray-500' 
                      : 'border-gray-600 group-hover:border-gray-500'
                  }`}>
                    {filters.inStock && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  In Stock
                </span>
              </motion.label>

              <motion.label 
                whileHover={{ x: 2 }}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                    filters.featured 
                      ? 'bg-purple-500 border-purple-500' 
                      : 'border-gray-600 group-hover:border-purple-500'
                  }`}>
                    {filters.featured && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 flex items-center space-x-1">
                  <span>Featured Products</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </span>
              </motion.label>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.search || filters.minPrice || filters.maxPrice || filters.onSale || filters.inStock || filters.featured) && (
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="text-sm text-gray-400 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-full px-2 py-1 text-xs text-purple-300">
                  Search: {filters.search}
                </div>
              )}
              {filters.onSale && (
                <div className="bg-green-600/20 border border-green-500/30 rounded-full px-2 py-1 text-xs text-green-300">
                  On Sale
                </div>
              )}
              {filters.inStock && (
                <div className="bg-gray-600/20 border border-gray-500/30 rounded-full px-2 py-1 text-xs text-gray-300">
                  In Stock
                </div>
              )}
              {filters.featured && (
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-full px-2 py-1 text-xs text-purple-300">
                  Featured
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}