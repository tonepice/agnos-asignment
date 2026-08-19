import type { Metadata } from 'next';
import { Anuphan } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/i18n/context';
import { Navbar } from '@/components/layout/Navbar';

const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-anuphan',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Patient Input Form & Real-time Staff View | Agnos Health',
  description: 'Agnos Candidate Assignment - Real-time patient form synchronization',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={anuphan.variable}>
      <body className={`${anuphan.className} min-h-screen flex flex-col bg-zinc-50 text-zinc-900 antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
