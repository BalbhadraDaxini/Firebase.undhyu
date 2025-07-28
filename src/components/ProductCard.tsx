
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.featuredImage || product.images.edges[0]?.node;
  const secondImage = product.images.edges[1]?.node || firstImage;

  const imageUrl = firstImage?.url || 'https://placehold.co/600x750.png';
  const imageAlt = firstImage?.altText || product.title;
  
  const hoverImageUrl = secondImage?.url || imageUrl;
  const hoverImageAlt = secondImage?.altText || imageAlt;

  return (
    <Link href={`/product/${product.handle}`} className="group block">
        <div className="overflow-hidden rounded-md bg-card">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                "group-hover:opacity-0"
              )}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
            <Image
              src={hoverImageUrl}
              alt={hoverImageAlt}
              fill
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-2 text-left">
            <h3 className="text-sm font-medium text-foreground">
                {product.title}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-foreground">
              {product.priceRange.minVariantPrice.currencyCode} {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
        </div>
    </Link>
  );
}
