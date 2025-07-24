
"use client"

import { products } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import FilterControls from '@/components/FilterControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useRef } from 'react';
import useStickyOnScroll from '@/hooks/useStickyOnScroll';
import { cn } from '@/lib/utils';

function HomePageContent({
  filteredProducts,
  allColors,
  allSizes,
}: {
  filteredProducts: Product[];
  allColors: string[];
  allSizes: string[];
}) {
  const observerRef = useRef(null);
  const isSticky = useStickyOnScroll(observerRef);

  return (
    <>
      <Hero />
      <div ref={observerRef}></div>
      <div id="product-grid" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside
            className={cn(
              'hidden lg:block lg:col-span-1 self-start transition-all duration-300',
              isSticky ? 'fixed top-20 w-[16rem]' : 'relative'
            )}
          >
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <FilterControls availableColors={allColors} availableSizes={allSizes} />
              </CardContent>
            </Card>
          </aside>
           {isSticky && <div className="hidden lg:block lg:col-span-1"></div>}

          <main className="lg:col-span-3">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-headline font-semibold">All Products</h2>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <Card className="border-none shadow-none">
                      <CardHeader>
                        <CardTitle>Filters</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FilterControls availableColors={allColors} availableSizes={allSizes} />
                      </CardContent>
                    </Card>
                  </SheetContent>
                </Sheet>
              </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex h-64 items-center justify-center col-span-full">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}


export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let filteredProducts: Product[] = [...products];

  const sort = searchParams.sort as string;
  const color = searchParams.color as string;
  const size = searchParams.size as string;
  const price = searchParams.price as string;

  if (color) {
    filteredProducts = filteredProducts.filter(p => p.variants.colors.map(c => c.toLowerCase()).includes(color.toLowerCase()));
  }
  if (size) {
    filteredProducts = filteredProducts.filter(p => p.variants.sizes.map(s => s.toLowerCase()).includes(size.toLowerCase()));
  }
  if (price) {
    const [min, max] = price.split('-').map(Number);
    filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
  }

  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    // Assuming higher ID is newer
    filteredProducts.sort((a, b) => Number(b.id) - Number(a.id));
  }
  
  const allColors = [...new Set(products.flatMap(p => p.variants.colors))];
  const allSizes = [...new Set(products.flatMap(p => p.variants.sizes))];

  return <HomePageContent filteredProducts={filteredProducts} allColors={allColors} allSizes={allSizes} />;
}
