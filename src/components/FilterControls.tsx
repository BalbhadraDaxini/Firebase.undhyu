
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Slider } from './ui/slider';
import { Label } from './ui/label';

export default function FilterControls() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        const priceParam = searchParams.get('price');
        if (priceParam) {
            const [min, max] = priceParam.split('-').map(Number);
            setPriceRange([min, max]);
        } else {
            setPriceRange([0, 10000]);
        }
    }, [searchParams]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

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
        <div className="space-y-6">
            <div>
                <Label>Sort by</Label>
                <Select onValueChange={handleSortChange} defaultValue={searchParams.get('sort') ?? 'relevance'}>
                    <SelectTrigger>
                        <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Accordion type="multiple" defaultValue={['price']} className="w-full">
                 <AccordionItem value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <Slider
                            value={priceRange}
                            onValueChange={handlePriceChange}
                            onValueCommit={handlePriceCommit}
                            max={10000}
                            step={100}
                        />
                        <div className="flex justify-between text-sm">
                            <span>Rs. {priceRange[0]}</span>
                            <span>Rs. {priceRange[1]}</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
