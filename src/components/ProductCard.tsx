import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
        <div className="overflow-hidden rounded-md bg-card">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={`${product.category} fashion`}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-2 text-center">
            <h3 className="text-sm font-medium text-foreground">
                {product.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-foreground">Rs. {product.price.toFixed(2)}</p>
        </div>
    </Link>
  );
}
