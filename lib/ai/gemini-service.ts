import {
  INDUSTRIAL_KNOWLEDGE_BASE,
  STRICT_HUMANIZER_RULES,
  SEO_TOC_AND_LINKING_RULES,
} from './industrial-prompt';

export interface TrendingTopic {
  topic: string;
  industry: string;
  targetProblem: string;
  recommendedProduct: string;
  searchRationale: string;
}

export interface OutlineInput {
  topic: string;
  industry: string;
  productFocus: string;
  problemTarget: string;
  tone?: string;
}

export interface ArticleOutline {
  title: string;
  slug: string;
  category: string;
  targetAudience: string;
  sections: {
    heading: string;
    level: 'h2' | 'h3';
    keyPoints: string[];
  }[];
}

export interface FullArticleInput {
  outline: ArticleOutline;
  additionalNotes?: string;
  existingArticles?: { title: string; slug: string; category?: string }[];
}

export interface ImagePromptItem {
  id: string;
  label: string;
  placement: string;
  prompt: string;
  concept: string;
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  category: string;
  metaDescription: string;
  content: string; // Markdown or HTML formatted article content with TOC and internal links
  tags: string[];
  imagePrompt: string; // Photorealistic Midjourney/DALL-E prompt (Main / backward-compat)
  imageConcept: string; // Indonesian concept explanation (Main / backward-compat)
  imagePrompts?: ImagePromptItem[]; // Multi-image technical prompts (>2 images)
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }
  return key.trim();
}

/**
 * Call Gemini API with automatic model fallback
 */
async function callGemini(
  systemInstruction: string,
  promptText: string,
  asJson = true
): Promise<string> {
  const apiKey = getApiKey();
  const models = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];

  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload: Record<string, unknown> = {
        contents: [
          {
            parts: [{ text: `${systemInstruction}\n\n${promptText}` }],
          },
        ],
      };

      if (asJson) {
        payload.generationConfig = {
          responseMimeType: 'application/json',
          temperature: 0.4,
        };
      } else {
        payload.generationConfig = {
          temperature: 0.5,
        };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Gemini ${model} failed (${res.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error(`No text generated from ${model}`);
      }

      return rawText;
    } catch (err) {
      lastError = err as Error;
      console.warn(`Model ${model} failed, trying next fallback:`, (err as Error).message);
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

/**
 * Clean AI markers from generated text (Post-processing guardrail)
 */
function cleanAiMarkers(text: string): string {
  return text
    // Remove em dashes and double hyphens
    .replace(/—/g, ', ')
    .replace(/\s--\s/g, ', ')
    // Replace typical AI buzzwords if any slipped through
    .replace(/\bdelve into\b/gi, 'mempelajari')
    .replace(/\bdelve\b/gi, 'meninjau')
    .replace(/\bgame-changer\b/gi, 'solusi efektif')
    .replace(/\brobust\b/gi, 'andal')
    .replace(/\bseamless\b/gi, 'lancar')
    .replace(/\bseamlessly\b/gi, 'tanpa kendala')
    .replace(/\btapestry\b/gi, 'rangkaian')
    .replace(/\btestament to\b/gi, 'bukti nyata');
}

/**
 * Generate Trending Topics (Magic Wand 🪄 in Step 1)
 * Uses high-intent industrial queries and real search intent
 */
export async function generateTrendingTopics(
  industry: string,
  currentTopic?: string
): Promise<TrendingTopic[]> {
  const systemInstruction = `
${INDUSTRIAL_KNOWLEDGE_BASE}

TUGAS ANDA:
Anda adalah SEO Intelligence & Industrial Research Analyst untuk PT Dimensi Quantum Wahyudi.
Lakukan analisis terhadap pola pencarian penelusuran Google nyata di Indonesia untuk para manajer pabrik, tim HSE (K3), dan engineering.
Temukan 4 topik artikel B2B spesifik yang memiliki intensi pencarian (search intent) dan urgensi tinggi di sektor industri: "${industry}".

ATURAN KETAT:
1. Topik HARUS spesifik memuat bobot beban nyata (kg), tantangan lini operasional, atau regulasi Permenaker/NIOSH.
2. DILARANG membuat judul generik seperti "Pentingnya Ergonomi". Buat judul bernilai klik tinggi (CTR) seperti "Standar Batas Angkat Sak 50 kg di Pabrik Semen Sesuai Permenaker No. 5/2018".
3. Berikan alasan mengapa topik ini sedang dicari (searchRationale) dengan jelas.
4. Hubungkan dengan produk Schmalz atau Binar Handling yang paling tepat.

Format output WAJIB berupa JSON murni dengan array objek:
[
  {
    "topic": "Judul Topik yang Menarik dan Berorientasi SEO",
    "industry": "${industry}",
    "targetProblem": "Masalah nyata di lantai pabrik yang ingin diselesaikan",
    "recommendedProduct": "Produk Schmalz atau Binar Handling yang sesuai",
    "searchRationale": "Alasan singkat mengapa topik ini banyak dicari oleh tim HSE atau manajer pabrik di Google"
  }
]
`;

  const prompt = `
Sektor Industri: ${industry}
Kata Kunci Saat Ini (jika ada): ${currentTopic || 'Belum diisi'}

Hasilkan 4 topik tren penelusuran terbaik sekarang.
`;

  const rawJson = await callGemini(systemInstruction, prompt, true);
  try {
    const parsed = JSON.parse(rawJson) as TrendingTopic[];
    return parsed.map((item) => ({
      ...item,
      topic: cleanAiMarkers(item.topic),
      searchRationale: cleanAiMarkers(item.searchRationale),
    }));
  } catch (e) {
    console.error('Failed to parse trending topics JSON from Gemini:', rawJson);
    throw new Error('Gagal meriset topik tren dari AI');
  }
}

/**
 * Generate Article Outline (Step 2 of Wizard)
 */
export async function generateArticleOutline(input: OutlineInput): Promise<ArticleOutline> {
  const systemInstruction = `
${INDUSTRIAL_KNOWLEDGE_BASE}
${STRICT_HUMANIZER_RULES}

TUGAS ANDA:
Buat outline (kerangka) artikel B2B tingkat tinggi untuk PT Dimensi Quantum Wahyudi berdasarkan data input pengguna.
Format output WAJIB berupa JSON murni dengan struktur berikut:
{
  "title": "Judul Artikel SEO yang Kuat dan Lugas (maksimal 70 karakter, tanpa tanda tanya klise)",
  "slug": "slug-url-ramah-seo",
  "category": "Kategori yang relevan (Ergonomics / Products / Tips / News / Blog)",
  "targetAudience": "Target pembaca spesifik (misal: Plant Manager & HSE Industri Kimia)",
  "sections": [
    {
      "heading": "Nama Sub-Heading H2 (Lugas, tanpa emoji, tanpa pola klise)",
      "level": "h2",
      "keyPoints": [
        "Poin bahasan teknis 1",
        "Poin bahasan teknis 2"
      ]
    }
  ]
}
`;

  const prompt = `
INPUT PENGGUNA:
- Topik Utama: ${input.topic}
- Target Sektor Industri: ${input.industry}
- Fokus Produk: ${input.productFocus}
- Masalah / Tantangan Pabrik: ${input.problemTarget}
- Gaya Bahasa (Tone): ${input.tone || 'Otoritatif Teknikal & Standar K3'}

Buat kerangka artikel 4 sampai 5 section yang logis, tajam, dan siap dieksekusi.
`;

  const rawJson = await callGemini(systemInstruction, prompt, true);
  try {
    const parsed = JSON.parse(rawJson) as ArticleOutline;
    parsed.title = cleanAiMarkers(parsed.title);
    return parsed;
  } catch (e) {
    console.error('Failed to parse outline JSON from Gemini:', rawJson);
    throw new Error('Gagal memproses format kerangka dari AI');
  }
}

/**
 * Generate Full Article with TOC, Internal Linking, and Text-to-Image Prompt (Step 3 of Wizard)
 */
export async function generateFullArticle(input: FullArticleInput): Promise<GeneratedArticle> {
  const systemInstruction = `
${INDUSTRIAL_KNOWLEDGE_BASE}
${STRICT_HUMANIZER_RULES}
${SEO_TOC_AND_LINKING_RULES}

TUGAS ANDA:
Tulis artikel lengkap berbahasa Indonesia yang matang, komprehensif, dan profesional berdasarkan outline yang disetujui.

FITUR WAJIB DALAM KONTEN:
1. DAFTAR ISI OTOMATIS (TABLE OF CONTENTS):
   - Sisipkan kotak Daftar Isi visual tepat setelah paragraf pembuka (sebelum <h2> pertama).
   - Format:
     <div class="p-5 my-6 rounded-2xl bg-slate-50 border border-slate-200">
       <p class="font-bold text-slate-900 text-sm mb-3">Daftar Isi Pembahasan:</p>
       <ul class="space-y-1.5 text-xs sm:text-sm list-none p-0 m-0">
         <li><a href="#id-section-1" class="text-[#005596] hover:underline font-medium">1. Judul Section 1</a></li>
         ...
       </ul>
     </div>
   - Setiap tag <h2> berikutnya WAJIB dipasangi atribut id yang sama persis: <h2 id="id-section-1">Judul Section 1</h2>

2. INTERNAL LINKING KE ARTIKEL LAMA:
   - Pilih 1 sampai 3 artikel yang relevan dari daftar yang disediakan di bawah.
   - Pasang tautan alami berformat: <a href="/news/slug-artikel" class="text-[#005596] font-bold underline hover:text-[#004276]">Anchor Text Relevan</a>

3. REKOMENDASI PROMPT GAMBAR AI (MULTI-IMAGE > 2 FOTO):
   - Hasilkan TEPAT 3 prompt gambar photorealistic bahasa Inggris (8k, authentic factory lighting, industrial engineering details, Midjourney v6/DALL-E 3 parameters) dengan fokus berbeda:
     1. Cover Utama (Wide Shot 16:9): Pabrik modern Indonesia, operator mengenakan APD lengkap mengoperasikan lifter Schmalz/Binar secara ergonomis.
     2. Detail Suction Pad (Close-Up Macro): Fokus teknis bantalan hisap mencengkeram beban dengan presisi dan aman tanpa merusak material.
     3. Sistem Crane / Lintasan (Medium Shot): Sistem rel modular aluminium ringan di atas kepala untuk jangkauan paletisasi luas.

4. FORMAT OUTPUT WAJIB BERUPA JSON MURNI:
{
  "title": "Judul artikel akhir",
  "slug": "slug-url",
  "category": "Kategori artikel",
  "metaDescription": "Meta deskripsi SEO berbobot 150-160 karakter",
  "content": "Konten artikel lengkap dalam format HTML bersih (dimulai dengan intro, kotak Ringkasan Eksekutif, kotak Daftar Isi DQW, tag <h2> ber-id, tabel komparasi, <h3>, <ul>, <li>, <strong>, <blockquote>, internal link, dan penanda lokasi gambar <!-- [Lokasi Gambar X: ...] -->). Dilarang menyisipkan tag <h1> dan <html>.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "imagePrompt": "Prompt cover utama (string bahasa Inggris)",
  "imageConcept": "Penjelasan konsep cover utama (string bahasa Indonesia)",
  "imagePrompts": [
    {
      "id": "cover",
      "label": "Gambar 1: Cover Utama (Rasio 16:9)",
      "placement": "Header Artikel / Thumbnail Berita",
      "prompt": "Photorealistic 8k, modern clean Indonesian manufacturing plant, an industrial worker in high-vis vest and safety helmet operating a Schmalz JumboErgo vacuum tube lifter, lifting a 50kg raw material sack effortlessly, ambient industrial lighting, 35mm lens --ar 16:9",
      "concept": "Foto lanskap lantai pabrik modern memperlihatkan postur tegak operator saat mengangkat karung tanpa beban fisik."
    },
    {
      "id": "detail",
      "label": "Gambar 2: Detail Bantalan Hisap (Suction Pad)",
      "placement": "Tengah Artikel (Sebelum Sub-Heading Solusi Teknis)",
      "prompt": "Macro photorealistic close-up shot, heavy-duty industrial vacuum suction pad firmly gripping a woven sack without tears, engineered vacuum suction bellows, high detail industrial texture, soft factory lighting --ar 16:9",
      "concept": "Close-up bantalan hisap silikon industri yang menempel rapat di permukaan karung tanpa merusak kemasan."
    },
    {
      "id": "crane",
      "label": "Gambar 3: Lintasan Rel Crane Modular Aluminium",
      "placement": "Bagian Alur Penataan Palet / Penutup",
      "prompt": "Medium shot, sleek overhead aluminum crane rail system mounted on factory ceiling, smooth gliding trolley carrying a vacuum tube lifter, clean production facility, depth of field --ar 16:9",
      "concept": "Tampilan sistem rel modular aluminium yang ringan dan halus digerakkan oleh operator di area paletisasi."
    }
  ]
}
`;

  // Sample or formatted list of available articles for internal linking
  const existingArticlesText = (input.existingArticles || [])
    .slice(0, 30)
    .map((a) => `- Judul: "${a.title}" | URL: /news/${a.slug}`)
    .join('\n');

  const prompt = `
KERANGKA ARTIKEL YANG DISETUJUI:
${JSON.stringify(input.outline, null, 2)}

DAFTAR ARTIKEL YANG SUDAH TERBIT DI WEBSITE (PILIH 1-3 YANG PALING COCOK UNTUK INTERNAL LINKING):
${existingArticlesText || 'Tidak ada artikel lama yang dimuat. Fokus pada internal link ke produk /products/vacuum-lifter'}

CATATAN TAMBAHAN DARI EDITOR:
${input.additionalNotes || 'Tulis dengan kedalaman teknis dan kepatuhan standar K3 maksimal.'}
`;

  const rawJson = await callGemini(systemInstruction, prompt, true);
  try {
    const parsed = JSON.parse(rawJson) as GeneratedArticle;
    parsed.title = cleanAiMarkers(parsed.title);
    parsed.content = cleanAiMarkers(parsed.content);

    // Normalize imagePrompts & ensure backward compatibility
    if (!parsed.imagePrompts || !Array.isArray(parsed.imagePrompts) || parsed.imagePrompts.length === 0) {
      parsed.imagePrompts = [
        {
          id: 'cover',
          label: 'Gambar 1: Cover Utama (Rasio 16:9)',
          placement: 'Header Artikel / Thumbnail Berita',
          prompt: parsed.imagePrompt || '',
          concept: parsed.imageConcept || 'Visualisasi lantai produksi dan pengangkatan ergonomis.',
        },
      ];
    } else {
      parsed.imagePrompts = parsed.imagePrompts.map((img, idx) => ({
        id: img.id || `img-${idx + 1}`,
        label: img.label || `Gambar ${idx + 1}`,
        placement: img.placement || 'Badan Artikel',
        prompt: cleanAiMarkers(img.prompt || ''),
        concept: cleanAiMarkers(img.concept || ''),
      }));
    }

    // Ensure top-level backward compatibility
    if (!parsed.imagePrompt && parsed.imagePrompts[0]) {
      parsed.imagePrompt = parsed.imagePrompts[0].prompt;
    }
    if (!parsed.imageConcept && parsed.imagePrompts[0]) {
      parsed.imageConcept = parsed.imagePrompts[0].concept;
    }

    return parsed;
  } catch (e) {
    console.error('Failed to parse article JSON from Gemini:', rawJson);
    throw new Error('Gagal memproses artikel utuh dari AI');
  }
}
