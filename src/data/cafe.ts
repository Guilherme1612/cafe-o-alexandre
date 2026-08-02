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
  whatsapp: string;
  hours: string;
  social: string;
  description: string;
  offerings: string;
  map: string;
  images: string;
  gallery: readonly GalleryImage[];
}>;

export const cafe = {
  name: 'Café o Alexandre',
  welcome: 'Welcome to Café o Alexandre.',
  address: '[FULL ADDRESS]',
  phone: '927 605 689',
  whatsapp: '[WHATSAPP NUMBER]',
  hours: '[OPENING HOURS]',
  social: '[SOCIAL LINKS]',
  description: '[CAFÉ DESCRIPTION]',
  offerings: '[CAFÉ OFFER]',
  map: '[GOOGLE MAPS LINK]',
  images: '[CAFÉ IMAGES]',
  gallery: [] as readonly GalleryImage[]
} as const satisfies CafeContent;
