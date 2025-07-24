
"use client";

import { products } from '@/lib/mock-data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your shopping cart.`,
    })
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-lg">
          <div className="relative h-[600px] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={`${product.category} fashion`}
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline lg:text-4xl">{product.name}</h1>
          <p className="mt-2 text-3xl font-semibold text-primary">Rs. {product.price.toFixed(2)}</p>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.reviews.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">{product.reviews.rating.toFixed(1)} ({product.reviews.count} reviews)</p>
          </div>
          <p className="mt-6 text-base text-muted-foreground">{product.description}</p>
          
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Label className="text-base font-medium">Quantity</Label>
                <div className="flex items-center gap-2 rounded-md border">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 md:flex-row">
              <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto bg-white text-black hover:bg-black hover:text-white font-bold rounded-none transition-colors duration-300">Add to Cart</Button>
              <Button onClick={handleBuyNow} size="lg" className="w-full md:w-auto bg-white text-black hover:bg-black hover:text-white font-bold rounded-none transition-colors duration-300">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
