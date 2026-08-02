export type GalleryImage = Readonly<{
  src: `/images/${string}`;
  alt: string;
  caption: string;
  width: number;
  height: number;
}>;

type CafeContent = Readonly<{
  name: string;
  welcome: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  offerings: string;
  map: string;
  images: string;
  gallery: readonly GalleryImage[];
}>;

export const cafe = {
  name: 'Café o Alexandre',
  welcome: 'Bem-vindo ao Café o Alexandre.',
  address: 'Av. Principal 51, 2665-305 Milharado, Portugal',
  phone: '927 605 689',
  hours: '07:00–20:00',
  description: '[DESCRIÇÃO DO CAFÉ]',
  offerings: '[OFERTA DO CAFÉ]',
  map: 'https://www.google.com/maps/dir/?api=1&destination=Av.%20Principal%2051%2C%202665-305%20Milharado%2C%20Portugal',
  images: '[IMAGENS DO CAFÉ]',
  gallery: [] as readonly GalleryImage[]
} as const satisfies CafeContent;
