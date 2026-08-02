type CafeContent = Readonly<{
  name: string;
  welcome: string;
  phoneFallback: string;
  emptyState: Readonly<{
    heading: string;
    body: string;
  }>;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  social: string;
  description: string;
  offerings: string;
  map: string;
  images: string;
}>;

export const cafe = {
  name: 'Café o Alexandre',
  welcome: 'Welcome to Café o Alexandre.',
  phoneFallback: 'Phone number not yet available',
  emptyState: {
    heading: 'Café details coming soon',
    body: 'Verified café information will appear here once it is provided.'
  },
  address: '[FULL ADDRESS]',
  phone: '[PHONE NUMBER]',
  whatsapp: '[WHATSAPP NUMBER]',
  hours: '[OPENING HOURS]',
  social: '[SOCIAL LINKS]',
  description: '[CAFÉ DESCRIPTION]',
  offerings: '[CAFÉ OFFER]',
  map: '[GOOGLE MAPS LINK]',
  images: '[CAFÉ IMAGES]'
} as const satisfies CafeContent;
