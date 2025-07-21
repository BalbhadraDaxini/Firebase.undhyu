"use client";

import Link from 'next/link';
import { Package2, Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { categories } from '@/lib/mock-data';
import { useState } from 'react';
import { Sheet, SheetTrigger } from '../ui/sheet';
import CartSheet from '../CartSheet';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-semibold">Shopify Connector</span>
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

        <div className="flex items-center gap-4">
          <div className="relative hidden w-64 lg:block">
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
              </Button>
            </SheetTrigger>
            <CartSheet onOpenChange={setIsCartOpen} />
          </Sheet>
        </div>
      </div>
    </header>
  );
}
