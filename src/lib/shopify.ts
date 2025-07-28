import { GraphQLClient, gql } from 'graphql-request';
import { Product } from './types';

const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
  },
});

const PRODUCTS_QUERY = gql`
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                    amount
                    currencyCode
                }
              }
            }
          }
          tags
        }
      }
    }
  }
`;

const PRODUCT_QUERY = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
            price {
                amount
                currencyCode
            }
          }
        }
      }
      tags
    }
  }
`;

const CART_CREATE_MUTATION = gql`
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function getProducts(options: {}): Promise<Product[]> {
  // Use Next.js revalidation to fetch fresh product data every hour
  const { products } = await client.request<{ products: { edges: { node: Product }[] } }>(
    PRODUCTS_QUERY, 
    {},
    { next: { revalidate: 3600 } }
  );
  return products.edges.map(edge => edge.node);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const { product } = await client.request<{ product: Product | null }>(PRODUCT_QUERY, { handle });
  return product;
}

export async function createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<string | null> {
  const input = {
    lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
    })),
  };

  try {
    const { cartCreate } = await client.request<{
      cartCreate: {
        cart: { checkoutUrl: string } | null,
        userErrors: { message: string }[]
      }
    }>(CART_CREATE_MUTATION, { input });

    if (cartCreate.userErrors.length > 0) {
      console.error('Cart creation errors:', cartCreate.userErrors);
      throw new Error(cartCreate.userErrors.map(e => e.message).join('\n'));
    }

    return cartCreate.cart?.checkoutUrl ?? null;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}
