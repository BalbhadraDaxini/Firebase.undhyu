
import { getProducts } from '@/lib/shopify';
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';

async function HomePageContent() {
  const products = await getProducts({});
  
  return (
    <>
      <Hero />
      <div id="product-grid" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <main>
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
