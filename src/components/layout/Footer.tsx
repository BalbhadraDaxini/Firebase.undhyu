
"use client";

import Link from 'next/link';

export default function Footer() {
  const categories = [
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'All', slug: 'all' },
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
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Undhyu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
