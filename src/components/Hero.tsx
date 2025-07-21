"use client"

import * as React from "react"
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay"

import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1610047879156-17b33d3d2c10?q=80&w=1974&auto=format&fit=crop',
    alt: 'Model wearing a beautiful saree',
    title: 'Exquisite Sarees',
    description: 'Discover the perfect blend of tradition and modernity in our latest saree collection.',
    link: '/sarees',
    aiHint: 'saree fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1621335829837-7740e536142e?q=80&w=1964&auto=format&fit=crop',
    alt: 'Woman in an elegant lehenga',
    title: 'Lehengas for Every Occasion',
    description: 'From bridal wear to festive outfits, find the lehenga that tells your story.',
    link: '/lehengas',
    aiHint: 'lehenga fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1617924734399-966a3a99252a?q=80&w=1964&auto=format&fit=crop',
    alt: 'Stylish suits for modern women',
    title: 'Contemporary Suit Sets',
    description: 'Chic and comfortable suits that make a statement wherever you go.',
    link: '/suits',
    aiHint: 'indian suit',
  },
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {heroSlides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[70vh] min-h-[500px] w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                data-ai-hint={slide.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center text-white">
                <div className="max-w-xl">
                  <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg md:text-xl">
                    {slide.description}
                  </p>
                  <Button asChild size="lg" className="mt-8 bg-white text-black hover:bg-gray-200">
                    <Link href={slide.link}>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden text-white md:flex" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden text-white md:flex" />
    </Carousel>
  );
}
