export type ShopifyProductVariant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
};

export type ProductImage = {
  url: string;
  altText: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ProductImage;
  images: {
    edges: {
      node: ProductImage;
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  tags: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
};

export type Category = {
  name: string;
  slug: string;
};
