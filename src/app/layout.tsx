
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Playfair_Display, Lato } from 'next/font/google';
import { getCollections } from '@/lib/shopify';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: 'Undhyu',
  description: 'A modern e-commerce storefront for your Shopify products.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getCollections();
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-body antialiased', playfairDisplay.variable, lato.variable)} suppressHydrationWarning>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header collections={collections} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
