
import { getProducts } from '@/lib/shopify';
import { Product } from '@/lib/types';
import FilterControls from '@/components/FilterControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';

async function HomePageContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getProducts({});
  
  let filteredProducts: Product[] = [...products];

  const sort = searchParams.sort as string || 'newest';
  const color = searchParams.color as string;
  const size = searchParams.size as string;
  const price = searchParams.price as string;

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
  
  const allColors: string[] = [];
  const allSizes: string[] = [];

  const categories = [{name: 'All', slug: 'all'}];
  
  const productsByCategory = categories.map(category => ({
    ...category,
    products: filteredProducts
  }));
  
  const newArrivals = filteredProducts.slice(0, 8);

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent searchParams={searchParams} />
    </Suspense>
  );
}
