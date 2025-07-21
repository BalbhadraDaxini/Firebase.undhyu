import { products, categories } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import FilterControls from '@/components/FilterControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <FilterControls availableColors={allColors} availableSizes={allSizes} />
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <h1 className="mb-6 text-3xl font-headline font-semibold">{category.name}</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
