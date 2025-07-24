"use client";

import { products } from '@/lib/mock-data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DescriptionGenerator from '@/components/DescriptionGenerator';
import { Separator } from '@/components/ui/separator';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.variants.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.variants.sizes[0]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your shopping cart.`,
    })
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
            {product.variants.colors.length > 0 && (
                <div>
                    <Label className="text-base font-medium">Color: <span className="font-normal text-muted-foreground">{selectedColor}</span></Label>
                    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="mt-2 flex flex-wrap gap-2">
                        {product.variants.colors.map(color => (
                            <RadioGroupItem key={color} value={color} id={`color-${color}`} className="sr-only" />
                        ))}
                         {product.variants.colors.map(color => (
                           <Label key={color} htmlFor={`color-${color}`} className={`cursor-pointer rounded-md border-2 px-4 py-2 transition-colors ${selectedColor === color ? 'border-accent' : 'border-border'}`}>{color}</Label>
                        ))}
                    </RadioGroup>
                </div>
            )}

            {product.variants.sizes.length > 0 && (
                <div>
                    <Label className="text-base font-medium">Size: <span className="font-normal text-muted-foreground">{selectedSize}</span></Label>
                    <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="mt-2 flex flex-wrap gap-2">
                        {product.variants.sizes.map(size => (
                            <RadioGroupItem key={size} value={size} id={`size-${size}`} className="sr-only" />
                        ))}
                        {product.variants.sizes.map(size => (
                           <Label key={size} htmlFor={`size-${size}`} className={`cursor-pointer rounded-md border-2 px-4 py-2 transition-colors ${selectedSize === size ? 'border-accent' : 'border-border'}`}>{size}</Label>
                        ))}
                    </RadioGroup>
                </div>
            )}

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
            
            <Button onClick={handleAddToCart} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto">Add to Cart</Button>
          </div>

          <DescriptionGenerator productTitle={product.name} productAttributes={product.attributes} />
        </div>
      </div>
    </div>
  );
}
