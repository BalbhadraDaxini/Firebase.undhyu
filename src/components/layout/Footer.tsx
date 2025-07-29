
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
                <a href="https://wa.me/919039037771" target="_blank" aria-label="Chat on WhatsApp" className="group inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                      className="w-6 h-6 text-black group-hover:text-[#25D366] transition-colors duration-300 fill-current">
                    <path d="M380.9 97.1C339 10.6 222.7-28.3 132.1 43.4C41.5 115.1 26.3 240.2 94 330.8l-30.9 91.1c-4.2 12.3 8.6 23.3 20.4 17.7l97.8-45.5c91.1 41.5 196.1-4.9 238.1-95.2C420.2 191.9 412 99.8 380.9 97.1zM248 352c-7.5-3.7-44.4-22-51.3-24.5-6.9-2.5-12-3.7-17.1 3.7s-19.6 24.5-24 29.5c-4.4 5-8.9 5.6-16.4 1.9-44.4-22.2-73.5-39.7-102.7-89.2-29.2-49.5-42.3-71.4-42.3-71.4s-1.9-4.4 1.9-8.1c3.7-3.7 8.1-9.5 12.5-14.4 4.4-4.9 8.9-8.1 13.1-12.5 4.2-4.4 3.7-8.1 1.9-12.5-1.9-4.4-24.5-58.4-33.8-81.4-9.3-23-18.4-19.6-26.7-19.6-8.1 0-17.2 1.9-26.7 11.2-9.5 9.3-36.9 36.9-36.9 89.2 0 52.3 37.8 102.7 42.3 109.4 4.4 6.9 73.5 117.8 181.1 160.2 107.6 42.3 107.6 28.1 126.3 26.2 18.8-1.9 58.4-24.5 66.8-48.4 8.4-23.8 8.4-44.4 5.6-48.4-2.8-4.2-10.3-6.9-21.3-11.4z"/>
                  </svg>
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
