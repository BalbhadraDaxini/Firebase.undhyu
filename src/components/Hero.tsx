import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full bg-secondary">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="Elegant fashion display"
        fill
        className="object-cover"
        priority
        data-ai-hint="fashion store"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-end px-4 pb-12 text-white">
        <h1 className="font-headline text-4xl font-bold md:text-6xl">
          Timeless Elegance, Modern Style
        </h1>
        <p className="mt-4 max-w-xl text-lg">
          Discover our curated collection of exquisite traditional and contemporary wear.
        </p>
        <Button asChild size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/sarees">Shop New Arrivals</Link>
        </Button>
      </div>
    </div>
  );
}
