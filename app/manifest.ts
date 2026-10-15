import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Finly', short_name: 'Finly', lang: 'ro', start_url: '/', scope: '/', display: 'standalone', background_color: '#faf9f6', theme_color: '#faf9f6', icons: [{ src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' }, { src: '/icons/finly-192.png', type: 'image/png', sizes: '192x192' }, { src: '/icons/finly-512.png', type: 'image/png', sizes: '512x512' }] };
}
