
import { Suspense } from 'react';
import { getProducts, getCollections } from '@/lib/shopify';
import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import type { Product, Collection } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default async function Home() {
  let products: Product[] = [];
  let collections: Collection[] = [];
  let error: string | null = null;

  try {
    products = await getProducts({});
    collections = await getCollections();
  } catch (e: any) {
    console.error("Failed to fetch Shopify data for homepage:", e.message);
    error = "We're having trouble connecting to our products. Please check back later.";
  }


  return (
    <>
      <Hero />
      <div id="product-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
           <Alert variant="destructive" className="my-8">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Connection Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <main>
              <Suspense fallback={<div className="h-64 flex items-center justify-center"><p>Loading products...</p></div>}>
                <ProductGrid products={products} collections={collections} />
              </Suspense>
            </main>
          </div>
        )}
      </div>
      <FeaturedCategories />
    </>
  );
}
