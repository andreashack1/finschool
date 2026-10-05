import { z } from 'zod';
import { accountConfig as config } from '../../content/account-config';
export const UsernameSchema = z.string().min(config.usernameMin).max(config.usernameMax).regex(/^[a-z0-9_]{3,20}$/).refine(value => !config.reservedUsernames.some(name => name === value), 'Username rezervat');
export const normalizeUsername = (value: string) => value.trim().toLowerCase();
export const EmailSchema = z.string().trim().toLowerCase().max(254).pipe(z.email());
export const DisplayNameSchema = z.string().trim().max(config.displayNameMax);
export const PasswordSchema = z.string().min(config.passwordMin).max(128);
export const AgeRangeSchema = z.enum(['14-15','16-17','18-19','20+']);
export const SignupSchema = z.object({ email: EmailSchema, username: z.string().transform(normalizeUsername).pipe(UsernameSchema), displayName: DisplayNameSchema.default(''), ageRange: AgeRangeSchema, password: PasswordSchema, repeatPassword: PasswordSchema, terms: z.literal(true), privacy: z.literal(true), parentalConsent: z.boolean().default(false) }).strict().superRefine((value, ctx) => {
  if (value.password !== value.repeatPassword) ctx.addIssue({ code: 'custom', path: ['repeatPassword'], message: 'Parolele nu coincid.' });
  if (value.ageRange === '14-15' && !value.parentalConsent) ctx.addIssue({ code: 'custom', path: ['parentalConsent'], message: 'Este necesară confirmarea părintelui sau tutorelui.' });
});
export const ProfileUpdateSchema = z.object({ username: z.string().transform(normalizeUsername).pipe(UsernameSchema), displayName: DisplayNameSchema }).strict();
export const ProfileSchema = z.object({ id: z.uuid(), username: UsernameSchema, display_name: DisplayNameSchema.nullable(), age_range: AgeRangeSchema, parental_consent: z.boolean(), parental_consent_at: z.string().nullable(), locale: z.string(), created_at: z.string(), updated_at: z.string() });
export type AccountProfile = z.infer<typeof ProfileSchema>;
export const accountName = (profile: AccountProfile | null) => profile?.display_name?.trim() || profile?.username || 'tu';
