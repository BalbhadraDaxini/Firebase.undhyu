
"use client";

import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M19.05 4.94A9.96 9.96 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.39 1.22 4.86L2 22l5.26-1.38c1.41.71 3 1.12 4.74 1.12h.01c5.52 0 10-4.48 10-10c0-2.76-1.12-5.26-2.95-7.07zm-1.19 10.94c-.28-.14-1.64-.81-1.9-.9s-.45-.14-.64.14s-.72.9-.88 1.08s-.32.2-.59.07s-1.14-.42-2.17-1.34s-1.05-1.55-1.17-1.81s-.01-.35.13-.48s.28-.32.42-.48s.14-.28.21-.46s.03-.35-.04-.5s-.64-1.55-.88-2.12s-.48-.48-.65-.49s-.35-.01-.52-.01s-.45.07-.68.35s-.9 1.08-.9 2.62s.92 3.04 1.05 3.25s1.81 2.76 4.39 3.88s1.75.48 2.35.38s1.08-.44 1.23-.85s.15-1.18.11-1.28s-.14-.15-.42-.29z"/>
    </svg>
  );
}


export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const categories = [
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'Sarees', slug: 'sarees' },
    { name: 'Lehengas', slug: 'lehengas' },
    { name: 'Suits', slug: 'suits' },
    { name: 'Gowns', slug: 'gowns' },
    { name: 'Kurtis', slug: 'kurtis' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-headline font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.map(category => (
                <li key={category.slug}>
                  <a href={`#${category.slug}`} onClick={(e) => handleLinkClick(e, category.slug)} className="text-muted-foreground hover:text-foreground">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">About Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Shipping</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
                <a href="https://www.instagram.com/undhyu.com_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-[#E1306C]">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://wa.me/919039037771" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-[#25D366]">
                  <WhatsAppIcon className="h-6 w-6" />
                  <span className="sr-only">WhatsApp</span>
                </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
           <p>&copy; {currentYear ?? ''} Undhyu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
