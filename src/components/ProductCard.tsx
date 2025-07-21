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
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
        <CardHeader className="relative p-0">
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative h-96 w-full overflow-hidden">
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
        <CardContent className="flex flex-1 flex-col p-4">
           <Link href={`/product/${product.id}`} className="block">
              <CardTitle className="mb-2 text-lg font-headline font-semibold leading-tight group-hover:text-primary">
                {product.name}
              </CardTitle>
           </Link>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
            <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            <Button variant="outline" size="icon" asChild>
                <Link href={`/product/${product.id}`}>
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Add to Cart</span>
                </Link>
            </Button>
        </CardFooter>
      </Card>
  );
}
