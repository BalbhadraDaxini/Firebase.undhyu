
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
    title: 'Exquisite Sarees',
    description: 'Discover the perfect blend of tradition and modernity in our latest saree collection.',
    link: '#product-grid',
    aiHint: 'saree fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1610189025857-f42fe6e8dd91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FyZWV8ZW58MHx8MHx8fDA%3D',
    alt: 'Woman in an elegant lehenga',
    title: 'Lehengas for Every Occasion',
    description: 'From bridal wear to festive outfits, find the lehenga that tells your story.',
    link: '#product-grid',
    aiHint: 'lehenga fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhcmVlfGVufDB8fDB8fHww',
    alt: 'Stylish suits for modern women',
    title: 'Contemporary Suit Sets',
    description: 'Chic and comfortable suits that make a statement wherever you go.',
    link: '#product-grid',
    aiHint: 'indian suit',
  },
  {
    image: 'https://images.unsplash.com/photo-1610030469668-8e9f641aaf27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhcmVlfGVufDB8fDB8fHww',
    alt: 'Stylish suits for modern women',
    title: 'Graceful Gowns',
    description: 'Explore our collection of elegant gowns for any special event.',
    link: '#product-grid',
    aiHint: 'gowns fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Stylish suits for modern women',
    title: 'Casual Kurtis',
    description: 'Discover comfortable and stylish kurtis for your everyday look.',
    link: '#product-grid',
    aiHint: 'kurti fashion',
  },
  {
    image: 'https://images.unsplash.com/photo-1667665970124-2273c6ef3489?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Stylish suits for modern women',
    title: 'Vibrant Collections',
    description: 'Explore our vibrant collection of traditional and modern wear.',
    link: '#product-grid',
    aiHint: 'fashion collection',
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
       opts={{
        align: "start",
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-0">
        {heroSlides.map((slide, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-0">
            <div className="relative h-[70vh] min-h-[500px] w-full group">
              <img
                src={slide.image}
                alt={slide.alt}
                className="object-cover w-full h-full"
                data-ai-hint={slide.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="container mx-auto relative z-10 flex h-full flex-col items-start justify-end p-6 text-white">
                <div className="max-w-xl">
                  <h1 className="font-headline text-3xl font-bold md:text-4xl">
                    {slide.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-base md:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {slide.description}
                  </p>
                  <Button asChild size="lg" className="mt-4 bg-white text-black hover:bg-black hover:text-white border border-transparent hover:border-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href="#product-grid">Shop Now</Link>
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
