
"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../ui/sheet';
import CartSheet from '../CartSheet';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('new-arrivals');

  const categories = [
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'All', slug: 'all' },
    { name: 'Sarees', slug: 'sarees' },
    { name: 'Lehengas', slug: 'lehengas' },
    { name: 'Suits', slug: 'suits' },
    { name: 'Gowns', slug: 'gowns' },
    { name: 'Kurtis', slug: 'kurtis' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(slug);
      setIsMenuOpen(false); 
    }
  };

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
             <nav className="hidden h-full items-center justify-center gap-1 md:flex">
              {categories.map(category => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  onClick={(e) => handleLinkClick(e, category.slug)}
                  className={cn(
                    "flex h-full items-center border-b-2 px-3 py-2 text-sm font-medium transition-colors text-gray-200 hover:text-white",
                    activeSection === category.slug
                      ? 'border-amber-500 text-white'
                      : 'border-transparent'
                  )}
                >
                  {category.name}
                </a>
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
                            <span className="font-headline text-xl font-semibold">
                            <span className="text-foreground">Undhyu</span>
                            <span className="text-primary">.</span>
                            </span>
                        </Link>
                        <nav className="flex flex-col gap-3">
                            {categories.map(category => (
                            <SheetClose asChild key={category.slug}>
                                <a
                                    href={`#${category.slug}`}
                                    onClick={(e) => handleLinkClick(e, category.slug)}
                                    className={cn(
                                        "rounded-md px-3 py-2 text-lg font-medium transition-colors",
                                        activeSection === category.slug 
                                            ? 'bg-foreground text-background' 
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    )}
                                >
                                    {category.name}
                                </a>
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
