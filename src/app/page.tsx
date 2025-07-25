
import { getProducts } from '@/lib/shopify';
import FilterControls from '@/components/FilterControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';

async function HomePageContent() {
  const products = await getProducts({});
  
  const allColors: string[] = [];
  const allSizes: string[] = [];

  return (
    <>
      <Hero />
      <div id="product-grid" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className='hidden lg:block lg:col-span-1 self-start sticky top-20'>
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <FilterControls availableColors={allColors} availableSizes={allSizes} />
              </CardContent>
            </Card>
          </aside>
          
          <main className="lg:col-span-3">
             <div className="flex justify-end items-center mb-6">
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
