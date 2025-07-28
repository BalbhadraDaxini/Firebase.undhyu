
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
      <path 
        fill="currentColor" 
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.39 1.27 4.86l-1.34 4.91 5.04-1.32c1.4.79 3.01 1.25 4.72 1.25h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.22 15.2c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.62.14-.19.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-1.03-.92-1.73-2.06-2-2.4-.27-.35-.01-.54.12-.68.12-.12.27-.32.4-.48.14-.17.18-.28.27-.47.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.23-.55-.46-.48-.62-.48-.17 0-.36-.01-.54-.01s-.47.07-.7.34c-.23.28-.89 1.04-.89 2.52s.91 2.93 1.04 3.13c.13.2 1.78 2.72 4.31 3.8.55.23 1.04.37 1.4.47.6.17 1.15.14 1.58.09.48-.06 1.61-.66 1.83-1.28.23-.62.23-1.14.16-1.28-.07-.13-.25-.21-.52-.35z"
      />
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
           <p>&copy; {currentYear ?? new Date().getFullYear()} Undhyu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
