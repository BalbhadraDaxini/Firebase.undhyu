import type { Product, Category } from './types';

export const categories: Category[] = [
  { name: 'New Arrivals', slug: 'new-arrivals' },
  { name: 'Sarees', slug: 'sarees' },
  { name: 'Lehengas', slug: 'lehengas' },
  { name: 'Suits', slug: 'suits' },
  { name: 'Gowns', slug: 'gowns' },
  { name: 'Kurtis', slug: 'kurtis' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Red Silk Saree',
    price: 199.99,
    image: 'https://placehold.co/600x800.png',
    category: 'sarees',
    description: 'A beautiful handwoven silk saree in a vibrant red, perfect for weddings and festive occasions. Features intricate zari work and a matching blouse piece.',
    attributes: 'Color: Red, Material: Silk, Weave: Banarasi',
    variants: {
      colors: ['Red', 'Blue', 'Green'],
      sizes: [],
    },
    reviews: { rating: 4.5, count: 120 },
  },
  {
    id: '2',
    name: 'Royal Blue Velvet Lehenga',
    price: 299.99,
    image: 'https://placehold.co/600x800.png',
    category: 'lehengas',
    description: 'Feel like royalty in this stunning velvet lehenga choli. The deep blue velvet is adorned with detailed embroidery, making it a showstopper for any grand event.',
    attributes: 'Color: Royal Blue, Fabric: Velvet, Work: Embroidery',
    variants: {
      colors: ['Royal Blue', 'Maroon', 'Black'],
      sizes: ['S', 'M', 'L'],
    },
    reviews: { rating: 4.8, count: 85 },
  },
  {
    id: '3',
    name: 'Classic Cotton Anarkali Suit',
    price: 89.99,
    image: 'https://placehold.co/600x800.png',
    category: 'suits',
    description: 'An elegant and comfortable cotton Anarkali suit, ideal for daily wear or casual outings. The soft fabric and graceful flare offer a blend of style and comfort.',
    attributes: 'Color: Beige, Fabric: Cotton, Style: Anarkali',
    variants: {
      colors: ['Beige', 'Pink', 'Sky Blue'],
      sizes: ['M', 'L', 'XL'],
    },
    reviews: { rating: 4.2, count: 210 },
  },
    {
    id: '4',
    name: 'Pastel Green Georgette Gown',
    price: 159.99,
    image: 'https://placehold.co/600x800.png',
    category: 'gowns',
    description: 'A breathtaking pastel green gown made from lightweight georgette. Its flowing silhouette and subtle embellishments make it perfect for evening parties and receptions.',
    attributes: 'Color: Pastel Green, Fabric: Georgette, Occasion: Party',
    variants: {
      colors: ['Pastel Green', 'Lavender', 'Peach'],
      sizes: ['S', 'M', 'L'],
    },
    reviews: { rating: 4.6, count: 95 },
  },
  {
    id: '5',
    name: 'Printed Rayon Kurti',
    price: 49.99,
    image: 'https://placehold.co/600x800.png',
    category: 'kurtis',
    description: 'A trendy and comfortable printed rayon kurti. Its vibrant print and modern cut make it a versatile addition to your wardrobe, perfect for work or casual wear.',
    attributes: 'Color: Multicolor, Fabric: Rayon, Sleeve: 3/4th',
    variants: {
      colors: ['Multicolor', 'Blue Print', 'Red Print'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    reviews: { rating: 4.3, count: 300 },
  },
  {
    id: '6',
    name: 'Designer Net Saree',
    price: 249.99,
    image: 'https://placehold.co/600x800.png',
    category: 'sarees',
    description: 'Exquisite designer net saree with delicate sequin work. This glamorous saree is perfect for cocktails and high-profile events, ensuring you stand out.',
    attributes: 'Color: Gold, Fabric: Net, Work: Sequin',
    variants: {
      colors: ['Gold', 'Silver', 'Rose Gold'],
      sizes: [],
    },
    reviews: { rating: 4.7, count: 70 },
  },
  {
    id: '7',
    name: 'Bridal Maroon Lehenga',
    price: 499.99,
    image: 'https://placehold.co/600x800.png',
    category: 'lehengas',
    description: 'A magnificent bridal lehenga in traditional maroon. Heavily embroidered with zardozi and stones, this is the perfect attire for your special day.',
    attributes: 'Color: Maroon, Fabric: Silk Blend, Work: Zardozi',
    variants: {
      colors: ['Maroon'],
      sizes: ['S', 'M', 'L'],
    },
    reviews: { rating: 4.9, count: 45 },
  },
  {
    id: '8',
    name: 'Sharara Suit with Peplum Top',
    price: 129.99,
    image: 'https://placehold.co/600x800.png',
    category: 'suits',
    description: 'A fashionable sharara suit featuring a peplum-style top. The unique silhouette and mirror work make it a chic choice for festive gatherings.',
    attributes: 'Color: Yellow, Fabric: Crepe, Work: Mirror',
    variants: {
      colors: ['Yellow', 'Mint Green', 'Coral'],
      sizes: ['M', 'L', 'XL'],
    },
    reviews: { rating: 4.4, count: 150 },
  }
];

products.forEach(p => {
  p.image = `${p.image}?${p.category}&data-ai-hint=${p.category.slice(0, -1)} fashion`
})
