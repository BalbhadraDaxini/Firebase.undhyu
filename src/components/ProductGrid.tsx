
"use client";

import { useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Separator } from './ui/separator';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const searchParams = useSearchParams();

    let filteredProducts: Product[] = [...products];

    const sort = searchParams.get('sort') || 'newest';
    const price = searchParams.get('price');

    if (price) {
        const [min, max] = price.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => {
            const productPrice = parseFloat(p.priceRange.minVariantPrice.amount);
            return productPrice >= min && productPrice <= max;
        });
    }

    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    } else {
        // Default sort is handled by Shopify (newest)
    }

    const categories = [{name: 'All', slug: 'all'}];
  
    const productsByCategory = categories.map(category => ({
        ...category,
        products: filteredProducts
    }));
  
    const newArrivals = filteredProducts.slice(0, 8);

    return (
        <>
            <section id="new-arrivals" className="mb-16">
              <h2 className="text-3xl font-headline font-semibold mb-6">New Arrivals</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
            
            <Separator className="my-12"/>

            {filteredProducts.length === 0 && (
              <div className="flex h-64 items-center justify-center col-span-full">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
            
            {productsByCategory.map(category => (
              category.products.length > 0 && (
                <section key={category.slug} id={category.slug} className="pt-16">
                  <h2 className="text-3xl font-headline font-semibold mb-6">{category.name}</h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {category.products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )
            ))}
        </>
    )
}
