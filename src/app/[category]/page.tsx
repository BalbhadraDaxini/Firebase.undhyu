
import { products, categories } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/CategoryPageClient';

export function generateStaticParams() {
  return categories.map(category => ({
    category: category.slug,
  }));
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = categories.find(c => c.slug === params.category);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category === params.category);

  let filteredProducts: Product[] = [...categoryProducts];

  const sort = searchParams.sort as string;
  const color = searchParams.color as string;
  const size = searchParams.size as string;
  const price = searchParams.price as string;

  if (color) {
    filteredProducts = filteredProducts.filter(p => p.variants.colors.map(c => c.toLowerCase()).includes(color.toLowerCase()));
  }
  if (size) {
    filteredProducts = filteredProducts.filter(p => p.variants.sizes.map(s => s.toLowerCase()).includes(size.toLowerCase()));
  }
  if (price) {
    const [min, max] = price.split('-').map(Number);
    filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
  }

  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    filteredProducts.sort((a, b) => Number(b.id) - Number(a.id));
  }
  
  const allColors = [...new Set(categoryProducts.flatMap(p => p.variants.colors))];
  const allSizes = [...new Set(categoryProducts.flatMap(p => p.variants.sizes))];

  return (
    <CategoryPageClient 
      category={category}
      filteredProducts={filteredProducts}
      allColors={allColors}
      allSizes={allSizes}
    />
  );
}
