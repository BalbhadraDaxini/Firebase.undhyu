
"use client";

import { createCheckout } from '@/lib/shopify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import type { Product as ProductType } from '@/lib/types';

export default function ProductPageContent({ product }: { product: ProductType }) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.variants.edges.length) {
      setSelectedVariantId(product.variants.edges[0].node.id);
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>; // Or a skeleton loader
  }
  
  const selectedVariant = product.variants.edges.find(edge => edge.node.id === selectedVariantId)?.node;

  const handleAddToCart = () => {
    if (product && selectedVariant) {
        addToCart({
            id: selectedVariant.id,
            name: product.title,
            price: parseFloat(selectedVariant.price.amount),
            image: product.featuredImage.url,
            quantity,
            variantId: selectedVariant.id,
            variantTitle: selectedVariant.title
        });
        toast({
            title: "Added to cart!",
            description: `${product.title} has been added to your shopping cart.`,
        })
    }
  };

  const handleBuyNow = async () => {
     if (product && selectedVariant) {
        setIsProcessing(true);
        const checkoutUrl = await createCheckout([{ variantId: selectedVariant.id, quantity }]);
        if (checkoutUrl) {
            router.push(checkoutUrl);
        } else {
            toast({
                title: "Error",
                description: "Could not proceed to checkout. Please try again.",
                variant: "destructive"
            });
            setIsProcessing(false);
        }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-lg">
          <div className="relative h-[600px] w-full">
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline lg:text-4xl">{product.title}</h1>
          <p className="mt-2 text-3xl font-semibold text-primary">
            {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
          </p>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">(No reviews yet)</p>
          </div>
          <p className="mt-6 text-base text-muted-foreground">{product.description}</p>
          
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Label className="text-base font-medium">Quantity</Label>
                <div className="flex items-center gap-2 rounded-md border">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isProcessing}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)} disabled={isProcessing}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Button onClick={handleAddToCart} size="lg" className="w-full bg-white text-black hover:bg-gray-200 font-bold rounded-none transition-colors duration-300" disabled={isProcessing}>Add to Cart</Button>
              <Button onClick={handleBuyNow} size="lg" className="w-full bg-black text-white hover:bg-gray-800 font-bold rounded-none transition-colors duration-300" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
