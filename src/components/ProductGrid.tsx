
"use client";

import { useSearchParams } from 'next/navigation';
import type { Product, Category } from '@/lib/types';
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
    const color = searchParams.get('color');
    const size = searchParams.get('size');
    const categoryFilter = searchParams.get('category');

    if (price) {
        const [min, max] = price.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => {
            const productPrice = parseFloat(p.priceRange.minVariantPrice.amount);
            return productPrice >= min && productPrice <= max;
        });
    }

    if (color) {
        filteredProducts = filteredProducts.filter(p => p.tags.some(tag => tag.toLowerCase().startsWith('color:') && tag.toLowerCase().split(':')[1] === color.toLowerCase()));
    }

    if (size) {
        filteredProducts = filteredProducts.filter(p => p.tags.some(tag => tag.toLowerCase().startsWith('size:') && tag.toLowerCase().split(':')[1] === size.toLowerCase()));
    }

    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    } else {
        // Default sort is handled by Shopify (newest)
    }

    const categories: Category[] = [
        { name: 'Sarees', slug: 'sarees' },
        { name: 'Lehengas', slug: 'lehengas' },
        { name: 'Suits', slug: 'suits' },
        { name: 'Gowns', slug: 'gowns' },
        { name: 'Kurtis', slug: 'kurtis' },
    ];
  
    const productsByCategory = categories.map(category => ({
        ...category,
        products: filteredProducts.filter(p => p.tags.includes(category.name))
    }));

    const allProductsCategory = {
        name: 'All',
        slug: 'all',
        products: filteredProducts
    }
  
    const newArrivals = filteredProducts.slice(0, 8);

    return (
        <>
            <section id="new-arrivals" className="pt-16 -mt-16">
              <h2 className="text-3xl font-headline font-semibold mb-6">New Arrivals</h2>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
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
            
            <section id={allProductsCategory.slug} className="pt-16 -mt-16">
                 <h2 className="text-3xl font-headline font-semibold mb-6">{allProductsCategory.name}</h2>
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {allProductsCategory.products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
            </section>
            
            {productsByCategory.map(category => (
              category.products.length > 0 && (
                <section key={category.slug} id={category.slug} className="pt-16 -mt-16">
                  <h2 className="text-3xl font-headline font-semibold mb-6">{category.name}</h2>
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
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
