
"use client";

import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { createCheckout } from '@/lib/shopify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartSheetProps {
    onOpenChange: (open: boolean) => void;
}

export default function CartSheet({ onOpenChange }: CartSheetProps) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsProcessing(true);
    const lineItems = cartItems.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const checkoutUrl = await createCheckout(lineItems);

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
  };


  return (
    <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg max-h-[90vh]">
      <SheetHeader className="p-6 pb-0">
        <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
      </SheetHeader>
      
      {cartItems.length > 0 ? (
        <>
          <ScrollArea className="flex-1 px-6">
            <div className="flex flex-col gap-4 py-6">
            {cartItems.map(item => (
              <div key={item.variantId} className="flex items-start gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.variantTitle}
                  </p>
                  <p className="mt-1 font-semibold text-primary">Rs. {item.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.variantId)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </ScrollArea>
          <SheetFooter className="bg-secondary p-6 mt-auto">
            <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <Button size="lg" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black font-bold rounded-none transition-colors duration-300" onClick={handleCheckout} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <h3 className="text-lg font-semibold">Your cart is empty</h3>
          <p className="text-center text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg" className="bg-white text-black hover:bg-black hover:text-white border-2 border-black font-bold rounded-none transition-colors duration-300" onClick={() => onOpenChange(false)}>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </SheetContent>
  );
}
