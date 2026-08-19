'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/context';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto py-10 md:py-16 text-center space-y-6 px-4">
      <span className="inline-block px-3.5 py-1 text-xs font-semibold text-primary_blue bg-blue-50 border border-blue-100 rounded-full">
        {t.home.badge}
      </span>
      
      <h1>
        {t.home.title}
      </h1>

      <p className="text-zinc-600 max-w-lg mx-auto font-medium">
        {t.home.subtitle}
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
        <Link href="/patient" className="w-full md:w-auto">
          <Button variant="primary" className="w-full md:w-auto">
            {t.home.patientButton}
          </Button>
        </Link>
        <Link href="/staff" className="w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            {t.home.staffButton}
          </Button>
        </Link>
      </div>
    </div>
  );
}
