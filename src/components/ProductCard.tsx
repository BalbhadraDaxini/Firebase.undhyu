
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Rating } from './ui/rating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    setRating(Math.random() * (4.9 - 3.6) + 3.6);
    setReviewCount(Math.floor(Math.random() * (38 - 9 + 1)) + 9);
  }, []);

  const firstImage = product.featuredImage || product.images.edges[0]?.node;
  const secondImage = product.images.edges[1]?.node || firstImage;

  const imageUrl = firstImage?.url || 'https://placehold.co/600x750.png';
  const imageAlt = firstImage?.altText || product.title;
  
  const hoverImageUrl = secondImage?.url || imageUrl;
  const hoverImageAlt = secondImage?.altText || imageAlt;

  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount).toFixed(2) : null;
  
  const isOnSale = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants.edges[0].node;
    addToCart({
        id: defaultVariant.id,
        name: product.title,
        price: parseFloat(defaultVariant.price.amount),
        image: imageUrl,
        quantity: 1,
        variantId: defaultVariant.id,
        variantTitle: defaultVariant.title
    });
    toast({
        title: "Added to cart!",
        description: `${product.title} has been added to your shopping cart.`,
    })
  }

  return (
    <Link href={`/product/${product.handle}`} className="group relative block">
        <div className="overflow-hidden bg-card">
          <div className="relative h-80 w-full">
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
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button onClick={handleAddToCart} size="sm" className="w-full bg-white text-black hover:bg-black hover:text-white border-2 border-black font-bold rounded-none">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
            <h3 className="text-sm font-medium uppercase text-foreground">
                {product.title}
            </h3>
            <div className="mt-1 flex items-center justify-center gap-2">
                <p className="text-md font-semibold text-foreground">
                  Rs. {price}
                </p>
                {isOnSale && (
                    <p className="text-md font-semibold text-muted-foreground line-through">
                      Rs. {compareAtPrice}
                    </p>
                )}
            </div>
             <div className="mt-1 flex justify-center items-center">
                <Rating rating={rating} size={16} fill="#FBBF24" stroke="#FBBF24" emptyFill="transparent" emptyStroke="#FBBF24" />
                {reviewCount > 0 && <p className="ml-1 text-xs text-muted-foreground">({reviewCount})</p>}
            </div>
        </div>
    </Link>
  );
}
