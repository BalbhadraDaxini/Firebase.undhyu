
import { getProducts } from '@/lib/shopify';
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';
import ProductFilters from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';

async function HomePageContent() {
  const products = await getProducts({});
  
  return (
    <>
      <Hero />
      <div id="product-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
                <ProductFilters />
            </div>
          </aside>
          <main className="lg:col-span-3">
              <div className="flex justify-end lg:hidden mb-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <ProductFilters />
                    </SheetContent>
                  </Sheet>
              </div>
              <ProductGrid products={products} />
          </main>
        </div>
      </div>
    </>
  );
}


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
