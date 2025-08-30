
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
    // These calls are wrapped in a try...catch to prevent the entire page from crashing
    // if the Shopify API fails. This is crucial for debugging credential issues.
    products = await getProducts({});
    collections = await getCollections();
  } catch (e: any) {
    console.error("Failed to fetch Shopify data for homepage:", e.message);
    if (e.message.includes('401')) {
      error = "Connection to Shopify failed due to a 401 Unauthorized error. Please check your SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN environment variables. They must be set correctly for the application to fetch product data.";
    } else if (e.message.includes('not initialized')) {
      error = "The Shopify client is not initialized. Please ensure SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN are set in your environment variables."
    }
    else {
      error = "We're having trouble connecting to our products. Please check back later.";
    }
  }


  return (
    <>
      <Hero />
      <div id="product-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
           <Alert variant="destructive" className="my-8">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Shopify Connection Error</AlertTitle>
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
