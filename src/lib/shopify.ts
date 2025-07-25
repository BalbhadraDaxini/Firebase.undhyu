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

const CHECKOUT_CREATE_MUTATION = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function getProducts(options: {}): Promise<Product[]> {
  const { products } = await client.request<{ products: { edges: { node: Product }[] } }>(PRODUCTS_QUERY);
  return products.edges.map(edge => edge.node);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const { product } = await client.request<{ product: Product | null }>(PRODUCT_QUERY, { handle });
  return product;
}

export async function createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<string | null> {
  const input = {
    lineItems,
  };

  try {
    const { checkoutCreate } = await client.request<{ 
      checkoutCreate: { 
        checkout: { webUrl: string } | null, 
        checkoutUserErrors: { message: string }[] 
      } 
    }>(CHECKOUT_CREATE_MUTATION, { input });

    if (checkoutCreate.checkoutUserErrors.length > 0) {
      console.error('Checkout creation errors:', checkoutCreate.checkoutUserErrors);
      throw new Error(checkoutCreate.checkoutUserErrors.map(e => e.message).join('\n'));
    }

    return checkoutCreate.checkout?.webUrl ?? null;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}
