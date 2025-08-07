
"use client";

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../ui/sheet';
import CartSheet from '../CartSheet';
import { Collection } from '@/lib/types';

const navItems = [
  { title: 'Sarees', handle: 'sarees' },
  { title: 'Lehengas', handle: 'lehengas' },
  { title: 'Kurtis', handle: 'kurtis' },
];

export default function Header({ collections }: { collections: Collection[] }) {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    Undhyu<span className="text-amber-500 font-bold text-3xl md:text-4xl">.</span>
                    </h1>
                </Link>
            </div>
             <nav className="hidden h-full items-center justify-center gap-6 md:flex">
               {navItems.map(item => (
                  <Link key={item.handle} href={`/collections/${item.handle}`} className="relative group flex h-full items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-200 transition-colors hover:text-white outline-none">
                    {item.title}
                     <span className="absolute bottom-5 left-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full w-0"></span>
                  </Link>
                ))}
            </nav>
            
            <div className="flex items-center justify-end gap-2 md:gap-4">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-200 hover:text-white">
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-900">
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
                    <Button variant="ghost" size="icon" className="md:hidden text-gray-200 hover:text-white">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-4 p-4">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                             <h1 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
                                Undhyu<span className="text-amber-500 font-bold text-3xl md:text-4xl">.</span>
                            </h1>
                        </Link>
                        <nav className="flex flex-col gap-3">
                           {navItems.map(item => (
                            <SheetClose asChild key={item.handle}>
                              <Link href={`/collections/${item.handle}`} className="block rounded-md px-3 py-2 text-lg font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground">
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
