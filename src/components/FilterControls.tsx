"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

interface FilterControlsProps {
    availableColors: string[];
    availableSizes: string[];
}

export default function FilterControls({ availableColors, availableSizes }: FilterControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [priceRange, setPriceRange] = useState([0, 500]);

    useEffect(() => {
        const priceParam = searchParams.get('price');
        if (priceParam) {
            const [min, max] = priceParam.split('-').map(Number);
            setPriceRange([min, max]);
        } else {
            setPriceRange([0, 500]);
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
    
    const handleFilterChange = (type: 'color' | 'size', value: string) => {
        const currentFilter = searchParams.get(type);
        const newValue = currentFilter?.toLowerCase() === value.toLowerCase() ? '' : value;
        router.push(pathname + '?' + createQueryString(type, newValue));
    }
    
    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    const applyPriceFilter = () => {
        router.push(pathname + '?' + createQueryString('price', `${priceRange[0]}-${priceRange[1]}`));
    }
    
    const clearPriceFilter = () => {
        setPriceRange([0, 500]);
        router.push(pathname + '?' + createQueryString('price', ''));
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
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Accordion type="multiple" defaultValue={['price', 'color', 'size']} className="w-full">
                 <AccordionItem value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <Slider
                            defaultValue={[0, 500]}
                            value={priceRange}
                            onValueChange={handlePriceChange}
                            max={500}
                            step={10}
                        />
                        <div className="flex justify-between text-sm">
                            <span>Rs. {priceRange[0]}</span>
                            <span>Rs. {priceRange[1]}</span>
                        </div>
                        <div className="flex gap-2">
                           <Button onClick={applyPriceFilter} size="sm" className="w-full">Apply</Button>
                           <Button onClick={clearPriceFilter} size="sm" variant="outline" className="w-full">Clear</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="color">
                    <AccordionTrigger>Color</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {availableColors.map(color => (
                            <div key={color} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`color-${color}`}
                                    checked={searchParams.get('color')?.toLowerCase() === color.toLowerCase()}
                                    onCheckedChange={() => handleFilterChange('color', color)}
                                />
                                <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="size">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {availableSizes.map(size => (
                            <div key={size} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`size-${size}`}
                                    checked={searchParams.get('size')?.toLowerCase() === size.toLowerCase()}
                                    onCheckedChange={() => handleFilterChange('size', size)}
                                />
                                <Label htmlFor={`size-${size}`} className="font-normal">{size}</Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
