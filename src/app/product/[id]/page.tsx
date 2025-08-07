
import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import ProductPageContent from './ProductPageContent';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.id);
 
  if (!product) {
    return {
        title: 'Product not found',
    }
  }

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.featuredImage.url,
    "description": product.descriptionHtml.replace(/<[^>]*>?/gm, ''), // Simple strip of HTML tags
    "brand": {
      "@type": "Brand",
      "name": "Undhyu"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://undhyu.com/product/${product.handle}`,
      "priceCurrency": product.priceRange.minVariantPrice.currencyCode,
      "price": product.priceRange.minVariantPrice.amount,
      "availability": "https://schema.org/InStock" // Assuming all shown products are in stock
    }
  };
 
  return {
    title: `${product.title} | Undhyu`,
    description: product.descriptionHtml.replace(/<[^>]*>?/gm, '').substring(0, 160),
    openGraph: {
      title: `${product.title} | Undhyu`,
      description: product.descriptionHtml.replace(/<[^>]*>?/gm, '').substring(0, 160),
      images: [
        {
          url: product.featuredImage.url,
          width: 800,
          height: 800,
          alt: product.featuredImage.altText || product.title,
        },
      ],
    },
    alternates: {
      canonical: `/product/${product.handle}`,
    },
    other: {
      'application/ld+json': JSON.stringify(productJsonLd),
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
