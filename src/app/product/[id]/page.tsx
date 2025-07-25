
import { getProduct, createCheckout } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import type { Product as ProductType } from '@/lib/types';
import ProductPageContent from './ProductPageContent';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
