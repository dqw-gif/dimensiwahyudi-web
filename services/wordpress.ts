
// services/wordpress.ts

/**
 * Service to handle WordPress GraphQL data fetching.
 * Decouples the UI from the specific API implementation.
 */
export async function getHomeData() {
  const query = `
  query HomePageQuery {
    generalSettings {
      title
      description
    }
    posts(first: 6, where: { categoryName: "Produk" }) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
  `;

  // Fail gracefully if API URL is not set (e.g. during build)
  if (!process.env.WORDPRESS_API_URL) {
    console.warn('WORDPRESS_API_URL is not defined');
    return null;
  }

  try {
    const res = await fetch(process.env.WORDPRESS_API_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 1 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching WordPress data:', error);
    return null;
  }
}

export async function getAllPosts() {
  const query = `
    query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                id
                slug
                title
                excerpt
                date
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
    `;

  if (!process.env.WORDPRESS_API_URL) {
    console.warn('WORDPRESS_API_URL is not defined in environment variables.');
    return [];
  }

  try {
    const res = await fetch(process.env.WORDPRESS_API_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 1 },
    });

    if (!res.ok) {
      console.error(`WP API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching posts from WordPress API:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  const query = `
    query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            slug
            title
            content
            date
            featuredImage {
                node {
                    sourceUrl
                }
            }
            author {
                node {
                    name
                }
            }
            categories {
                nodes {
                    name
                    slug
                }
            }
        }
    }
    `;

  try {
    const res = await fetch(process.env.WORDPRESS_API_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
      next: { revalidate: 1 },
    });

    const json = await res.json();
    return json.data?.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getRelatedPosts(categorySlug: string, excludeId: string) {
  const query = `
    query RelatedPosts($categorySlug: String, $excludeId: [ID]) {
        posts(first: 3, where: { categoryName: $categorySlug, notIn: $excludeId }) {
            nodes {
                id
                slug
                title
                excerpt
                date
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
    `;

  try {
    const res = await fetch(process.env.WORDPRESS_API_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { categorySlug, excludeId: [excludeId] },
      }),
      next: { revalidate: 1 },
    });

    const json = await res.json();
    return json.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}
