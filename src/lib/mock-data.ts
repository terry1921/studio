import type { BlogPost, Product, MusicTrack } from './types';

export const storeInfo = {
  name: 'Creative Goods Co.',
  bio: 'Bringing your ideas to life with high-quality custom stickers, magnets, buttons, and apparel. We believe in creativity and self-expression.',
  address: '123 Art Lane, Design City, DC 12345',
  email: 'hello@creativegoods.co',
  phone: '(555) 123-4567',
  profileImageUrl: 'https://placehold.co/128x128.png',
  profileImageAiHint: 'logo abstract',
  storeUrl: 'https://www.stickermule.com/user/123456789/shop',
  qrCodeUrl: 'https://placehold.co/150x150.png',
  qrCodeAiHint: 'qr code',
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Ultimate Guide to Designing Your Own Stickers',
    excerpt: 'Unlock your creativity and learn the ins and outs of designing stickers that stand out. From software tips to color theory, we cover it all.',
    date: '2024-07-15',
    url: '#',
  },
  {
    id: 2,
    title: 'Why T-Shirts Are More Than Just Clothing',
    excerpt: 'Explore the power of the t-shirt as a canvas for self-expression, branding, and art. A deep dive into the culture of custom tees.',
    date: '2024-06-28',
    url: '#',
  },
  {
    id: 3,
    title: 'Marketing Your Brand with Bumper Stickers',
    excerpt: 'Think bumper stickers are a thing of the past? Think again. Discover how this classic marketing tool can drive visibility for your brand.',
    date: '2024-06-10',
    url: '#',
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Abstract Sunset Tee',
    category: 'T-Shirt',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'abstract sunset',
  },
  {
    id: 2,
    name: 'Holographic Cat Sticker',
    category: 'Sticker',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'holographic cat',
  },
  {
    id: 3,
    name: 'Good Vibes Magnet',
    category: 'Magnet',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'good vibes',
  },
  {
    id: 4,
    name: '"I Code" Round Button',
    category: 'Button',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'code button',
  },
  {
    id: 5,
    name: 'Explore More Bumper Sticker',
    category: 'Bumper Sticker',
    imageUrl: 'https://placehold.co/600x200.png',
    aiHint: 'explore mountains',
  },
  {
    id: 6,
    name: 'Minimalist Wave Sticker',
    category: 'Sticker',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'minimalist wave',
  },
];

export const musicTracks: MusicTrack[] = [
    {
        id: 1,
        title: 'Dreamwave',
        artist: 'Synthwave Kid',
        albumArtUrl: 'https://placehold.co/100x100.png',
        spotifyUrl: '#',
        appleMusicUrl: '#',
        aiHint: 'synthwave album',
    },
    {
        id: 2,
        title: 'Lo-Fi Chill',
        artist: 'Study Beats',
        albumArtUrl: 'https://placehold.co/100x100.png',
        spotifyUrl: '#',
        appleMusicUrl: '#',
        aiHint: 'lofi study',
    }
];
