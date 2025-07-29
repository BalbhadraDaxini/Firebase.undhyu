
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="url(#instagram-gradient)" 
      stroke="none"
      width="24"
      height="24"
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#f9ce34', stopOpacity: 1 }} />
          <stop offset="25%" style={{ stopColor: '#ee2a7b', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#6228d7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6228d7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
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
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="mb-8 md:mb-0">
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
          <div className="mb-8 md:mb-0">
            <h3 className="font-headline font-semibold">About Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <div className="mb-8 md:mb-0">
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
                <a href="https://www.instagram.com/undhyu.com_/" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all duration-300">
                  <InstagramIcon className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://wa.me/919039037771" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors duration-200" title="Chat with us on WhatsApp"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"></path></svg></a>
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
