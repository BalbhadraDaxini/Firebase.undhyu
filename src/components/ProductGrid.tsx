
"use client";

import { useSearchParams } from 'next/navigation';
import type { Product, Collection } from '@/lib/types';
import ProductCard from './ProductCard';
import { Separator } from './ui/separator';

interface ProductGridProps {
    products: Product[];
    collections: Collection[];
}

export default function ProductGrid({ products, collections }: ProductGridProps) {
    const searchParams = useSearchParams();

    let filteredProducts: Product[] = [...products];

    const sort = searchParams.get('sort') || 'newest';
    const price = searchParams.get('price');
    const color = searchParams.get('color');
    const size = searchParams.get('size');

    if (price) {
        const [min, max] = price.split('-').map(Number);
        if(!isNaN(min) && !isNaN(max)) {
            filteredProducts = filteredProducts.filter(p => {
                const productPrice = parseFloat(p.priceRange.minVariantPrice.amount);
                return productPrice >= min && productPrice <= max;
            });
        }
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
    }

    const productsByCategory = collections.map(collection => ({
        ...collection,
        products: filteredProducts.filter(p => p.tags.some(tag => tag.toLowerCase() === collection.handle.toLowerCase()))
    }));

    const allProductsCategory = {
        name: 'All Products',
        handle: 'all-products',
        products: filteredProducts
    }
  
    const newArrivals = filteredProducts.slice(0, 8);

    return (
        <div className="space-y-12">
            {filteredProducts.length === 0 && (
              <div className="flex h-64 items-center justify-center col-span-full">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}

            {filteredProducts.length > 0 && (
                <>
                    <section id="new-arrivals" className="pt-16 -mt-16">
                      <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6">New Arrivals</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8">
                        {newArrivals.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </section>
                    
                    <Separator className="my-12"/>

                    <section id={allProductsCategory.handle} className="pt-16 -mt-16">
                         <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6">Our Collection</h2>
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8">
                            {allProductsCategory.products.map(product => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                    </section>
                    
                    {productsByCategory.map(category => (
                      category.products.length > 0 && (
                        <div key={category.handle}>
                          <Separator className="my-12"/>
                          <section id={category.handle} className="pt-16 -mt-16">
                            <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6">{category.title}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8">
                              {category.products.map(product => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                            </div>
                          </section>
                        </div>
                      )
                    ))}
                </>
            )}
        </div>
    )
}
