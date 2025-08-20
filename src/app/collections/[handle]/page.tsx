
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
  let title = 'Collection';
  try {
    const collectionData = await getCollectionProducts({ collection: params.handle });
    title = collectionData.title;
  } catch (error) {
    console.error(`Failed to fetch metadata for collection ${params.handle}:`, error);
    return { title: 'Collection not found' };
  }
 
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

  // Custom metadata for the "lehengas" collection
  if (params.handle === 'lehengas') {
    return {
        title: 'Shop Designer Lehengas Online for Weddings & Parties | Undhyu',
        description: 'Discover stunning bridal and festive lehengas. Undhyu offers exquisite embroidery and contemporary designs for your special day.',
    }
  }

  // Custom metadata for the "kurtis" collection
  if (params.handle === 'kurtis') {
    return {
        title: 'Stylish & Comfortable Kurtis for Women | Undhyu',
        description: 'Browse our collection of elegant and comfortable kurtis, perfect for daily wear, office, and special occasions. Shop online at Undhyu.',
    }
  }
 
  return {
    title: `${title} | Undhyu`,
    description: `Shop the latest ${title.toLowerCase()} from Undhyu's exclusive collection.`,
  }
}
 
export default async function CollectionPage({ params }: Props) {
  let collectionData;
  try {
    collectionData = await getCollectionProducts({ collection: params.handle });
  } catch (error) {
    console.error(`Failed to fetch collection products for ${params.handle}:`, error);
    notFound();
  }

  const { title, products } = collectionData;

  if (!products || products.length === 0) {
    notFound();
  }

  const isSareesPage = params.handle === 'sarees';
  const isLehengasPage = params.handle === 'lehengas';
  const isKurtisPage = params.handle === 'kurtis';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-headline font-semibold mb-2">
        {isSareesPage && "Designer Sarees for Every Occasion"}
        {isLehengasPage && "Exquisite Lehengas for Weddings & Festivities"}
        {isKurtisPage && "Elegant Kurtis for Modern Women"}
        {!isSareesPage && !isLehengasPage && !isKurtisPage && title}
      </h1>

      {isSareesPage && (
        <p className="text-muted-foreground text-base mb-8 max-w-3xl">
          Discover the perfect saree from our exquisite collection, curated for the modern Indian woman. At Undhyu, we blend traditional craftsmanship with contemporary designs. Whether you're looking for luxurious silk sarees for a wedding, elegant chiffon for a party, or comfortable cotton for daily wear, you'll find it here. Shop online for the latest designer sarees and enjoy timeless elegance delivered to your doorstep.
        </p>
      )}

      {isLehengasPage && (
        <p className="text-muted-foreground text-base mb-8 max-w-3xl">
          Step into elegance with our stunning collection of lehengas. Perfect for brides, bridesmaids, and festive occasions, our lehengas feature intricate embroidery, rich fabrics, and modern silhouettes. From grand bridal lehengas to chic party wear, find your dream outfit at Undhyu and make a statement at your next big event.
        </p>
      )}

      {isKurtisPage && (
        <p className="text-muted-foreground text-base mb-8 max-w-3xl">
          Experience the perfect blend of comfort and style with our versatile range of kurtis. Ideal for daily wear, office attire, or casual outings, our kurtis come in a variety of prints, colors, and fabrics. At Undhyu, we offer designs that are both trendy and timeless, ensuring you look effortlessly chic every day.
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
