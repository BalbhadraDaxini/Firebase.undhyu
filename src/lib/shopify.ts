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


export async function getProducts(options: {}): Promise<Product[]> {
  const { products } = await client.request<{ products: { edges: { node: Product }[] } }>(PRODUCTS_QUERY);
  return products.edges.map(edge => edge.node);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const { product } = await client.request<{ product: Product | null }>(PRODUCT_QUERY, { handle });
  return product;
}
