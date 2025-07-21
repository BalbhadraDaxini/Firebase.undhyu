"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
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
        const newValue = currentFilter === value ? '' : value;
        router.push(pathname + '?' + createQueryString(type, newValue));
    }

    return (
        <div className="space-y-6">
            <div>
                <Label>Sort by</Label>
                <Select onValueChange={handleSortChange} defaultValue={searchParams.get('sort') ?? ''}>
                    <SelectTrigger>
                        <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Accordion type="multiple" defaultValue={['color', 'size']} className="w-full">
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
