
"use client";

import { createCheckout } from '@/lib/shopify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useMemo } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import type { Product as ProductType, ProductImage, ShopifyProductVariant } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ProductPageContent({ product }: { product: ProductType }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Generate random rating between 3.6 and 4.9
    setRating(Math.random() * (4.9 - 3.6) + 3.6);
    // Generate random review count between 9 and 38
    setReviewCount(Math.floor(Math.random() * (38 - 9 + 1)) + 9);
  }, []);

  useEffect(() => {
    if (product?.variants.edges.length) {
      const defaultOptions: Record<string, string> = {};
      product.options.forEach(option => {
        defaultOptions[option.name] = option.values[0];
      });
      setSelectedOptions(defaultOptions);
    }
    if (product?.featuredImage) {
      setSelectedImage(product.featuredImage);
    }
  }, [product]);

  useEffect(() => {
    if (product && Object.keys(selectedOptions).length > 0) {
      const variant = product.variants.edges.find(edge => {
        return edge.node.selectedOptions.every(
          option => selectedOptions[option.name] === option.value
        );
      })?.node;
      
      if(variant) {
        setSelectedVariant(variant);
        const variantImage = product.images.edges.find(edge => edge.node.altText === variant.title)?.node;
        if (variantImage) {
          setSelectedImage(variantImage);
        }
      } else {
        // Fallback to the first variant if no match is found
        setSelectedVariant(product.variants.edges[0].node);
      }
    } else if (product && product.variants.edges.length === 1 && product.variants.edges[0].node.title === 'Default Title') {
        setSelectedVariant(product.variants.edges[0].node)
    }
  }, [selectedOptions, product]);


  if (!product) {
    return <div>Loading...</div>; // Or a skeleton loader
  }
  
  const allImages = [product.featuredImage, ...(product.images.edges.map(edge => edge.node))].filter(
    (img, index, self) => img && self.findIndex((t) => t.url === img.url) === index
  );
  

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

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };
  
  const price = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2);
  const compareAtPrice = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2) : (product.compareAtPriceRange?.minVariantPrice ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount).toFixed(2) : null);
  const isOnSale = compareAtPrice && compareAtPrice > price;

  const ratingValue = rating;
  const integerPart = Math.floor(ratingValue);
  const decimalPart = ratingValue - integerPart;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-lg">
                <div className="relative h-[600px] w-full">
                    {selectedImage && (
                        <Image
                        src={selectedImage.url}
                        alt={selectedImage.altText || product.title}
                        fill
                        className="object-cover"
                        />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {allImages.map((image, index) => (
                    image && <button 
                        key={index} 
                        onClick={() => setSelectedImage(image)} 
                        className={cn(
                            "overflow-hidden rounded-md border-2",
                            selectedImage?.url === image.url ? "border-primary" : "border-transparent"
                        )}
                    >
                        <div className="relative aspect-square w-full">
                            <Image
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline lg:text-4xl">{product.title}</h1>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-foreground">
                <span className="mr-2">Rs. {price}</span>
                 {isOnSale && (
                    <s className="text-xl font-medium text-destructive">
                     Rs. {compareAtPrice}
                    </s>
                )}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <div className="rating" role="img" aria-label={`${rating.toFixed(2)} out of 5 stars`}>
                <span 
                    aria-hidden="true" 
                    className="rating-star" 
                    style={{ '--rating': rating, '--star-size': '1.25rem' } as React.CSSProperties}
                ></span>
            </div>
            {reviewCount > 0 && <p className="ml-2 text-sm text-muted-foreground">({reviewCount} reviews)</p>}
          </div>

          <Separator className="my-6" />
          
          <div className="mt-6 space-y-6">
            {product.options.map(option => (
              option.values.length > 1 && (
                <div key={option.name}>
                  <Label className="text-base font-medium">{option.name}</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {option.values.map(value => (
                      <Button 
                        key={value}
                        variant={selectedOptions[option.name] === value ? 'default' : 'outline'}
                        onClick={() => handleOptionChange(option.name, value)}
                        className="rounded-full"
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </div>
              )
            ))}

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
              <Button onClick={handleAddToCart} size="lg" className="w-full bg-white text-black hover:bg-black hover:text-white border-2 border-black font-bold rounded-none transition-colors duration-300" disabled={isProcessing || !selectedVariant}>Add to Cart</Button>
              <Button onClick={handleBuyNow} size="lg" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black font-bold rounded-none transition-colors duration-300" disabled={isProcessing || !selectedVariant}>
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </Button>
            </div>
          </div>
          
           <Separator className="my-6" />

           <div
            className="prose prose-sm mt-4 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

        </div>
      </div>
    </div>
  );
}
