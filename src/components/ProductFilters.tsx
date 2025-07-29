
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from './ui/label';

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const [priceRange, setPriceRange] = useState([0, 50000]);

  useEffect(() => {
    const priceParam = searchParams.get('price');
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      if(!isNaN(min) && !isNaN(max)) {
        setPriceRange([min, max]);
      }
    }
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    router.push(pathname + '?' + createQueryString('sort', value));
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handlePriceCommit = (value: number[]) => {
     router.push(pathname + '?' + createQueryString('price', `${value[0]}-${value[1]}`));
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Sort by</Label>
            <Select onValueChange={handleSortChange} defaultValue={searchParams.get('sort') || 'newest'}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-base font-medium">Pricing</Label>
            <div className='mt-4'>
                <Slider
                  min={0}
                  max={50000}
                  step={100}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  onValueCommit={handlePriceCommit}
                />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Rs. {priceRange[0]}</span>
              <span>Rs. {priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
