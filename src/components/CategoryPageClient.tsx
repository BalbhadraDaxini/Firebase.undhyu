
"use client"

import type { Product, Category } from '@/lib/types';
import FilterControls from '@/components/FilterControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useRef } from 'react';
import useStickyOnScroll from '@/hooks/useStickyOnScroll';
import { cn } from '@/lib/utils';

interface CategoryPageClientProps {
    category: Category;
    filteredProducts: Product[];
    allColors: string[];
    allSizes: string[];
}

export default function CategoryPageClient({ category, filteredProducts, allColors, allSizes }: CategoryPageClientProps) {
  const observerRef = useRef(null);
  const isSticky = useStickyOnScroll(observerRef);

  return (
    <>
      <div ref={observerRef}></div>
      <div className="container mx-auto px-4 py-8">
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
              <h1 className="text-3xl font-headline font-semibold">{category.name}</h1>
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
