
import { getCollectionProducts } from '@/lib/shopify';
import ProductGrid from '@/components/ProductGrid';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react';
 
type Props = {
  params: { handle: string }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title } = await getCollectionProducts({ collection: params.handle });
 
  if (!title || title === 'Collection not found') {
    return {
        title: 'Collection not found',
    }
  }

  // Custom metadata for the "sarees" collection
  if (params.handle === 'sarees') {
    return {
        title: 'Buy Designer Sarees Online | Undhyu',
        description: 'Shop elegant, affordable sarees for all occasions. Free shipping across India. Discover traditional and modern styles at Undhyu.',
    }
  }
 
  return {
    title: `${title} | Undhyu`,
    description: `Shop the latest ${title.toLowerCase()} from Undhyu's exclusive collection.`,
  }
}
 
export default async function CollectionPage({ params }: Props) {
  const { title, products } = await getCollectionProducts({ collection: params.handle });

  if (!products || products.length === 0) {
    notFound();
  }

  const isSareesPage = params.handle === 'sarees';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-headline font-semibold mb-2">
        {isSareesPage ? "Designer Sarees for Every Occasion" : title}
      </h1>

      {isSareesPage && (
        <p className="text-muted-foreground text-base mb-8 max-w-3xl">
          Discover the perfect saree from our exquisite collection, curated for the modern Indian woman. At Undhyu, we blend traditional craftsmanship with contemporary designs. Whether you're looking for luxurious silk sarees for a wedding, elegant chiffon for a party, or comfortable cotton for daily wear, you'll find it here. Shop online for the latest designer sarees and enjoy timeless elegance delivered to your doorstep.
        </p>
      )}

      <Suspense fallback={<div className="h-64 flex items-center justify-center"><p>Loading products...</p></div>}>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8">
            {products.map(product => (
                <ProductGrid key={product.id} products={[product]} collections={[]} />
            ))}
        </div>
      </Suspense>
    </div>
  );
}
