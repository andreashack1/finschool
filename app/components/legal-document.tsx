import type { ReactNode } from 'react';
import Link from 'next/link';
import { AccountShell } from './account-screens';
import { legalConfig } from '../../src/content/legal-config';

export type LegalSection = Readonly<{ id: string; title: string; content: ReactNode }>;
export function LegalDocument({ title, version, sections }: { title: string; version: string; sections: readonly LegalSection[] }) {
  const [year, month, day] = legalConfig.lastUpdated.split('-');
  return <AccountShell title={title}><article className="legal-document">
    <p className="legal-draft">Ciornă în lucru — de verificat de un jurist înainte de lansarea publică.</p>
    <p className="account-small">Ultima actualizare: <time dateTime={legalConfig.lastUpdated}>{day}.{month}.{year}</time><br/>Versiune: {version}</p>
    <nav aria-label="Cuprins"><h2>Cuprins</h2><ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
    {sections.map((section, index) => <section id={section.id} key={section.id}><h2>{index + 1}. {section.title}</h2>{section.content}</section>)}
    <p><Link href="/termeni">Termeni</Link> · <Link href="/confidentialitate">Confidențialitate</Link></p>
  </article></AccountShell>;
}
