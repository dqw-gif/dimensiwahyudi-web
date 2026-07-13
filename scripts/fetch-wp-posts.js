const fs = require('fs');
const path = require('path');

const wpUrl = 'https://wp.dimensiwahyudi.com/graphql';
const cacheDir = path.join(__dirname, '../data');
const cacheFile = path.join(cacheDir, 'wordpress-posts.json');

const query = `
  query AllPostsFull {
      posts(first: 100) {
          nodes {
              id
              slug
              title
              excerpt
              content
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

async function fetchAndCachePosts() {
  console.log('Fetching all posts from WordPress to build local fallback cache...');
  try {
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`WordPress returned status: ${res.status}`);
    }

    const json = await res.json();
    const posts = json.data?.posts?.nodes;

    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      throw new Error('WordPress returned empty posts data');
    }

    // Ensure data directory exists
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    // Write to local json file
    fs.writeFileSync(cacheFile, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`Successfully cached ${posts.length} posts to ${cacheFile}`);
  } catch (error) {
    console.warn(`[PRE-BUILD CACHE WARNING] Failed to fetch posts from WordPress: ${error.message}`);
    if (fs.existsSync(cacheFile)) {
      console.log('Using existing local wordpress-posts.json cache file for build.');
    } else {
      console.error('No existing cache file found! Build fallback data might be empty.');
      // Create empty array to prevent code crashes
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      fs.writeFileSync(cacheFile, JSON.stringify([], null, 2), 'utf-8');
    }
  }
}

fetchAndCachePosts();
