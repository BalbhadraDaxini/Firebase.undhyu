import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="relative h-96 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={`${product.category} fashion`}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <CardTitle className="mb-2 text-lg font-headline font-semibold leading-tight">
            {product.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
