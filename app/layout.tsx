import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./finly-app.css";
import './account.css';
import './notifications.css';
import './streak-moments.css';
import { GamificationMoments } from "./components/gamification-moments";
import { AccountBoundary } from './components/account-boundary';
import { currentUser } from '../src/lib/supabase/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-finly",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finly — Banii pe înțelesul tău",
  applicationName: "Finly",
  description: "Educație financiară gratuită pentru adolescenți. Învață să economisești și să cheltuiești smart, câte 5 minute pe zi.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await currentUser();
  return (
    <html
      lang="ro"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><AccountBoundary userId={user?.id ?? null}>{children}<GamificationMoments/></AccountBoundary></body>
    </html>
  );
}

