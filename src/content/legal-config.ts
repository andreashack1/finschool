import { accountConfig } from './account-config';

type LegalConfig = Readonly<{
  controllerName: string;
  controllerAddress: string;
  privacyContactEmail: string;
  generalContactEmail: string;
  dataRegion: string;
  termsVersion: typeof accountConfig.termsVersion;
  privacyVersion: typeof accountConfig.privacyVersion;
  lastUpdated: `${number}-${number}-${number}`;
}>;

export const legalConfig = {
  controllerName: '[DE COMPLETAT ÎNAINTE DE LANSARE]',
  controllerAddress: '[DE COMPLETAT ÎNAINTE DE LANSARE]',
  privacyContactEmail: '[DE COMPLETAT ÎNAINTE DE LANSARE]',
  generalContactEmail: '[DE COMPLETAT ÎNAINTE DE LANSARE]',
  dataRegion: '[DE VERIFICAT ÎNAINTE DE LANSARE]',
  termsVersion: accountConfig.termsVersion,
  privacyVersion: accountConfig.privacyVersion,
  lastUpdated: '2026-10-07',
} as const satisfies LegalConfig;
