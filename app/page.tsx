import FinlyClient from './finly-client';
import { PrivateLayout } from './components/private-layout';
import { redirect } from 'next/navigation';
export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const { tab } = await searchParams;
  if ((Array.isArray(tab) ? tab[0] : tab) === 'simulator') redirect('/simulator');
  return <PrivateLayout><FinlyClient/></PrivateLayout>;
}
