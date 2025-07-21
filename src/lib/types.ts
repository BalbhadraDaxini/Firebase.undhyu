export type ProductVariant = {
  colors: string[];
  sizes: string[];
};

export type ProductReview = {
  rating: number;
  count: number;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  attributes: string;
  variants: ProductVariant;
  reviews: ProductReview;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type Category = {
  name: string;
  slug: string;
};
