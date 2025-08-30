
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Playfair_Display, Lato } from 'next/font/google';
import { getCollections } from '@/lib/shopify';
import type { Collection } from '@/lib/types';

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
  metadataBase: new URL('https://undhyu.com'),
  title: 'Undhyu - Designer Sarees, Lehengas & Kurtis for Every Indian Woman',
  description: 'Shop stylish sarees, lehengas, and kurtis for women aged 18 to 60. Undhyu offers premium Indian ethnic wear across Tier 1, 2 & 3 cities.',
  keywords: ['Undhyu', 'sarees online', 'lehengas online', 'kurtis online', 'Indian ethnic wear', 'women ethnic fashion', 'traditional wear for women', 'affordable sarees', 'festive kurtis', 'bridal lehengas'],
  authors: [{ name: 'Undhyu' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Undhyu - Stylish Ethnic Wear for Indian Women',
    description: "Explore Undhyu's exclusive collection of sarees, lehengas, and kurtis designed for women in every Indian city.",
    url: 'https://undhyu.com',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Replaced with a relative path
        width: 1200,
        height: 630,
        alt: 'Undhyu Ethnic Wear Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undhyu - Shop Ethnic Wear for Women',
    description: 'Sarees, Lehengas, and Kurtis for Indian women aged 18 to 60.',
    images: ['/twitter-image.jpg'], // Replaced with a relative path
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let collections: Collection[] = [];
  try {
    collections = await getCollections();
  } catch (error) {
    console.error('Failed to fetch collections for layout:', error);
    // Gracefully handle the error, collections will be an empty array
  }
  
  return (
    <html lang="en">
       <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Undhyu",
            "url": "https://undhyu.com",
            "logo": "https://undhyu.com/logo.png",
            "sameAs": [
              "https://www.instagram.com/undhyu.com_"
            ]
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Undhyu",
            "url": "https://undhyu.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://undhyu.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }) }}
        />
      </head>
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
