import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-headline font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/sarees" className="text-muted-foreground hover:text-foreground">Sarees</Link></li>
              <li><Link href="/lehengas" className="text-muted-foreground hover:text-foreground">Lehengas</Link></li>
              <li><Link href="/suits" className="text-muted-foreground hover:text-foreground">Suits</Link></li>
              <li><Link href="/gowns" className="text-muted-foreground hover:text-foreground">Gowns</Link></li>
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
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
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
          <p>&copy; {new Date().getFullYear()} Shopify Connector. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
