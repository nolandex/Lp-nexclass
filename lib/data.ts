export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Module {
  id: string;
  title: string;
  content_type: 'youtube' | 'download';
  youtube_link?: string;
  download_url?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string;
  modules?: Module[];
}

const categories: Category[] = [
  { id: '1', name: 'Dasar Investasi', slug: 'dasar-investasi' },
  { id: '2', name: 'Analisis Saham', slug: 'analisis-saham' },
  { id: '3', name: 'Pasar Kripto', slug: 'pasar-kripto' },
  { id: '4', name: 'Manajemen Keuangan', slug: 'manajemen-keuangan' },
];

const courses: Course[] = [
  // Dasar Investasi
  {
    id: '101',
    title: 'Langkah Awal Investor',
    description: 'Pelajari dasar-dasar investasi saham, reksadana, dan obligasi. Cocok untuk pemula yang ingin memulai perjalanan investasi dengan benar.',
    image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    category_id: '1',
    modules: [
      { id: 'm101-1', title: 'Mengapa Harus Berinvestasi?', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm101-2', title: 'Instrumen Investasi Populer', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm101-3', title: 'Membuka Akun Sekuritas', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm101-4', title: 'Manajemen Risiko untuk Pemula', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  {
    id: '102',
    title: 'Psikologi Trading & Investasi',
    description: 'Kendalikan emosi Anda dan buat keputusan investasi yang rasional. Pelajari cara menghindari jebakan psikologis di pasar.',
    image_url: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=800&q=80',
    category_id: '1',
    modules: [
       { id: 'm102-1', title: 'Fear, Greed, and Hope', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
       { id: 'm102-2', title: 'Cognitive Bias dalam Trading', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
       { id: 'm102-3', title: 'Membangun Trading Plan', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  
  // Analisis Saham
  {
    id: '201',
    title: 'Analisis Fundamental 101',
    description: 'Belajar membaca laporan keuangan dan menilai kesehatan perusahaan untuk menemukan saham berkualitas (undervalued).',
    image_url: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&q=80',
    category_id: '2',
    modules: [
      { id: 'm201-1', title: 'Membedah Laporan Laba Rugi', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm201-2', title: 'Analisis Neraca Keuangan', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm201-3', title: 'Rasio Keuangan Penting (PER, PBV, ROE)', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm201-4', title: 'Studi Kasus: Analisis Saham Big Caps', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  {
    id: '202',
    title: 'Masterclass Analisis Teknikal',
    description: 'Kuasai seni membaca grafik harga untuk menentukan waktu jual dan beli yang optimal menggunakan indikator populer.',
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    category_id: '2',
    modules: [
      { id: 'm202-1', title: 'Prinsip Dasar Teori Dow', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm202-2', title: 'Support, Resistance, dan Trendline', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm202-3', title: 'Pola Candlestick Reversal & Continuation', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm202-4', title: 'Indikator Moving Average & MACD', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  {
    id: '203',
    title: 'Valuasi Saham Lanjutan',
    description: 'Metode valuasi mendalam seperti Discounted Cash Flow (DCF) untuk menemukan nilai intrinsik sebuah saham.',
    image_url: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&q=80',
    category_id: '2',
    modules: [
      { id: 'm203-1', title: 'Konsep Time Value of Money', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm203-2', title: 'Menghitung Free Cash Flow', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm203-3', title: 'Proyeksi Keuangan & Model DCF', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },

  // Pasar Kripto
  {
    id: '301',
    title: 'Pengenalan Aset Kripto',
    description: 'Pahami teknologi blockchain, Bitcoin, Ethereum, dan altcoin potensial lainnya. Pelajari cara aman membeli dan menyimpan aset kripto.',
    image_url: 'https://images.unsplash.com/photo-1621405788342-65b3a8b41812?w=800&q=80',
    category_id: '3',
    modules: [
       { id: 'm301-1', title: 'Apa itu Blockchain & Bitcoin?', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
       { id: 'm301-2', title: 'Mengenal Altcoin & Tokenomics', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
       { id: 'm301-3', title: 'Cara Kerja Exchange & Wallet', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  {
    id: '302',
    title: 'Strategi Trading Kripto',
    description: 'Pelajari berbagai strategi trading di pasar kripto yang volatil, mulai dari scalping, day trading, hingga swing trading.',
    image_url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80',
    category_id: '3',
    modules: [
      { id: 'm302-1', title: 'Analisis On-Chain', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm302-2', title: 'Membaca Order Book', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm302-3', title: 'Manajemen Risiko di Pasar Kripto', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },

  // Manajemen Keuangan
  {
    id: '401',
    title: 'Membangun Dana Darurat',
    description: 'Langkah demi langkah menyiapkan dana darurat yang ideal untuk melindungi kondisi finansial Anda dari kejadian tak terduga.',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059ee355?w=800&q=80',
    category_id: '4',
    modules: [
      { id: 'm401-1', title: 'Pentingnya Dana Darurat', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm401-2', title: 'Menghitung Kebutuhan Dana Darurat', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm401-3', title: 'Instrumen Penyimpanan Terbaik', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
  {
    id: '402',
    title: 'Perencanaan Pensiun Dini',
    description: 'Strategi investasi dan perencanaan keuangan untuk mencapai kebebasan finansial dan pensiun lebih awal (FIRE Movement).',
    image_url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
    category_id: '4',
    modules: [
      { id: 'm402-1', title: 'Konsep FIRE Movement', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm402-2', title: 'Menghitung Angka Pensiun Anda', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'm402-3', title: 'Alokasi Aset untuk Jangka Panjang', content_type: 'youtube', youtube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ]
  },
];


export const getCourses = async (categorySlug?: string): Promise<Course[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
  if (!categorySlug || categorySlug === 'popular') return courses;
  
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  
  return courses.filter(c => c.category_id === category.id);
};

export const getCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return categories;
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return courses.find(c => c.id === id);
};

export const extractYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};