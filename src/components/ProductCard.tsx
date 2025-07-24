import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="overflow-hidden rounded-md">
          <div className="relative h-64 w-full sm:h-80 md:h-96">
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
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
                {product.name}
            </h3>
          </div>
          <p className="text-sm font-semibold text-foreground">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}
