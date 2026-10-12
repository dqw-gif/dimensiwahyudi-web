import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBUoyd53GeR03vB4L8h2ftb2uuOuttjOrw',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dimensiwahyudi-web.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dimensiwahyudi-web',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dimensiwahyudi-web.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '800342733175',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:800342733175:web:dcb54eb1205861bed17172',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateAllArticles() {
  const postsPath = path.resolve('data/wordpress-posts.json');
  if (!fs.existsSync(postsPath)) {
    console.error('File data/wordpress-posts.json tidak ditemukan!');
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  console.log(`Memulai migrasi ${posts.length} artikel ke Firebase Firestore...`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const slug = post.slug || `post-${i + 1}`;
    const categoryName = post.categories?.nodes?.[0]?.name || 'News';
    const featuredImage = post.featuredImage?.node?.sourceUrl || 'https://dimensiwahyudi.com/opengraph-image';
    const authorName = post.author?.node?.name || 'Tim Teknis PT Dimensi Quantum Wahyudi';
    const publishedAt = post.date ? new Date(post.date).toISOString() : new Date().toISOString();

    const articleData = {
      id: slug,
      slug: slug,
      title: post.title || 'Untitled',
      excerpt: (post.excerpt || post.title || '').replace(/<[^>]+>/g, '').trim().slice(0, 250),
      content: post.content || '',
      category: categoryName,
      featuredImage: featuredImage,
      author: authorName,
      status: 'published',
      publishedAt: publishedAt,
      updatedAt: publishedAt,
      migratedFrom: 'wordpress',
    };

    try {
      await setDoc(doc(db, 'articles', slug), articleData);
      successCount++;
      if (successCount % 10 === 0 || successCount === posts.length) {
        console.log(`[${successCount}/${posts.length}] Berhasil migrasi: ${post.title.slice(0, 40)}...`);
      }
    } catch (err) {
      console.error(`Gagal migrasi artikel [${slug}]:`, err.message);
      failCount++;
    }
  }

  console.log(`\n=== MIGRASI SELESAI ===`);
  console.log(`Berhasil: ${successCount}`);
  console.log(`Gagal: ${failCount}`);
  process.exit(0);
}

migrateAllArticles();
