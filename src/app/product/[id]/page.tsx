
import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import ProductPageContent from './ProductPageContent';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
