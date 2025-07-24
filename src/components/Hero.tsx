
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lRTIlODAlOTFpbiVFMiU4MCU5MXNhcmVlfGVufDB8fDB8fHww',
    alt: 'Model wearing a beautiful saree',
    aiHint: 'saree fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1610189025857-f42fe6e8dd91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FyZWV8ZW58MHx8MHx8fDA%3D',
    alt: 'Woman in an elegant lehenga',
    aiHint: 'lehenga fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhcmVlfGVufDB8fDB8fHww',
    alt: 'Stylish suits for modern women',
    aiHint: 'indian suit',
  },
  {
    image: 'https://images.unsplash.com/photo-1610030469668-8e9f641aaf27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhcmVlfGVufDB8fDB8fHww',
    alt: 'Stylish suits for modern women',
    aiHint: 'gowns fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Stylish suits for modern women',
    aiHint: 'kurti fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1667665970124-2273c6ef3489?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Stylish suits for modern women',
    aiHint: 'fashion collection',
  },
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="relative w-full">
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
                align: "start",
                loop: true,
            }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="-ml-0">
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index} className="pl-0 md:basis-1/2 lg:basis-1/3">
                        <div className="relative h-[70vh] min-h-[500px]">
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="object-cover w-full h-full"
                                data-ai-hint={slide.aiHint}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden text-white md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden text-white md:flex" />
        </Carousel>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-[10%] md:-translate-x-0 md:-translate-y-1/2 z-10 text-white text-center md:text-left px-4">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Timeless Indian Ethnic Wear
            </h1>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 rounded-md">
                <Link href="#product-grid">Shop Now</Link>
            </Button>
        </div>
    </div>
  );
}
