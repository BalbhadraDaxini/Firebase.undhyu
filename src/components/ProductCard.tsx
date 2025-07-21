import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl border-none shadow-none rounded-lg">
        <CardHeader className="relative p-0">
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-md">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={`${product.category} fashion`}
              />
            </div>
          </Link>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4 pb-2 px-1">
           <Link href={`/product/${product.id}`} className="block">
              <CardTitle className="mb-1 text-sm sm:text-base font-body font-semibold leading-tight group-hover:text-primary">
                {product.name}
              </CardTitle>
           </Link>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-1 pt-0">
            <p className="text-base sm:text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
  );
}
