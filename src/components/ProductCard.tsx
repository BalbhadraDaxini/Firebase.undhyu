
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.handle}`} className="group block">
        <div className="overflow-hidden rounded-md bg-card">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-2 text-left">
            <h3 className="text-sm font-medium text-foreground">
                {product.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {product.priceRange.minVariantPrice.currencyCode} {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
        </div>
    </Link>
  );
}
