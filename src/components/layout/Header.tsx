
"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../ui/sheet';
import CartSheet from '../CartSheet';
import { cn } from '@/lib/utils';
import { Collection } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('new-arrivals');
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections');
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollections();
  }, []);

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

  const NavLink = ({ slug, name }: { slug: string, name: string }) => (
    <a
      href={`#${slug}`}
      onClick={(e) => handleLinkClick(e, slug)}
      className={cn(
        "relative group flex h-full items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-200 transition-colors hover:text-white",
          activeSection === slug ? 'text-white' : ''
      )}
    >
      {name}
      <span className={cn(
        "absolute bottom-5 left-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full",
        activeSection === slug ? 'w-full' : 'w-0'
      )}></span>
    </a>
  );
  
  const MobileNavLink = ({ slug, name, isDropdown = false, children }: { slug?: string, name: string, isDropdown?: boolean, children?: React.ReactNode }) => {
    if (isDropdown) {
      return (
        <div>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-lg font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            {name}
            <ChevronDown className="h-5 w-5" />
          </button>
          <div className="pl-4">
            {children}
          </div>
        </div>
      )
    }

    return (
      <SheetClose asChild>
        <a
          href={`#${slug}`}
          onClick={(e) => slug && handleLinkClick(e, slug)}
          className={cn(
              "block rounded-md px-3 py-2 text-lg font-medium transition-colors",
              activeSection === slug 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          )}
        >
          {name}
        </a>
      </SheetClose>
    )
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
             <nav className="hidden h-full items-center justify-center gap-4 md:flex">
              {categories.map(category => (
                <NavLink key={category.slug} slug={category.slug} name={category.name} />
              ))}
               {collections.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative group flex h-full items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-200 transition-colors hover:text-white outline-none">
                    Collections
                    <ChevronDown className="ml-1 h-4 w-4" />
                     <span className="absolute bottom-5 left-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full w-0"></span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    {collections.map(collection => (
                      <DropdownMenuItem key={collection.id} asChild>
                        <Link href={`/collections/${collection.handle}`} className="hover:bg-gray-700">
                          {collection.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
                            {categories.map(category => (
                              <MobileNavLink key={category.slug} slug={category.slug} name={category.name} />
                            ))}
                             {collections.length > 0 && (
                               <MobileNavLink name="Collections" isDropdown>
                                  {collections.map(collection => (
                                    <SheetClose asChild key={collection.id}>
                                      <Link href={`/collections/${collection.handle}`} className="block rounded-md px-3 py-2 text-lg font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground">
                                        {collection.title}
                                      </Link>
                                    </SheetClose>
                                  ))}
                               </MobileNavLink>
                             )}
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
