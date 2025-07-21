
"use client";

import Link from 'next/link';
import { Search, ShoppingCart, Menu, Package2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { categories } from '@/lib/mock-data';
import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../ui/sheet';
import CartSheet from '../CartSheet';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            
            <span className="font-headline text-lg font-semibold">
              <span className="text-foreground">Undhyu</span>
              <span className="text-primary">.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden w-40 sm:block md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
                 <span className="sr-only">Open Cart</span>
              </Button>
            </SheetTrigger>
            <CartSheet onOpenChange={setIsCartOpen} />
          </Sheet>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        
                        <span className="font-headline text-lg font-semibold">
                          <span className="text-foreground">Undhyu</span>
                          <span className="text-primary">.</span>
                        </span>
                    </Link>
                    <nav className="flex flex-col gap-3">
                        {categories.map(category => (
                        <SheetClose asChild key={category.slug}>
                            <Link
                                href={`/${category.slug}`}
                                className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {category.name}
                            </Link>
                        </SheetClose>
                        ))}
                    </nav>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
