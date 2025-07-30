
import { getProducts } from '@/lib/shopify';
import ProductGrid from '@/components/ProductGrid';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import type { Product } from '@/lib/types';

export default async function Home() {
  const products = await getProducts({});

  return (
    <>
      <Hero />
      <div id="product-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          <main>
            <ProductGrid products={products} />
          </main>
        </div>
      </div>
      <FeaturedCategories />
    </>
  );
}
