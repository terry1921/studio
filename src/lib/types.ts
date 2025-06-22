export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'T-Shirt' | 'Sticker' | 'Magnet' | 'Button' | 'Bumper Sticker';
  imageUrl: string;
  storeUrl: string;
  aiHint: string;
}

export interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  albumArtUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  aiHint: string;
}
