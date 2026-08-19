'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/context';

const emptySubscribe = () => () => {};
function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLangClosing, setIsLangClosing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const mounted = useIsHydrated();

  const openMobileMenu = () => {
    setIsMobileMenuClosing(false);
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    if (!isMobileMenuOpen || isMobileMenuClosing) return;
    setIsMobileMenuClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, 220);
  };

  const toggleLangDropdown = () => {
    if (isLangOpen) {
      closeLangDropdown();
    } else {
      setIsLangClosing(false);
      setIsLangOpen(true);
    }
  };

  const closeLangDropdown = () => {
    if (!isLangOpen || isLangClosing) return;
    setIsLangClosing(true);
    setTimeout(() => {
      setIsLangOpen(false);
      setIsLangClosing(false);
    }, 160);
  };

  return (
    <>
      <header className="border-b border-zinc-100 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-18 flex items-center justify-between">
          {/* AGNOS Brand Logo (Perfectly Balanced Size) */}
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2 group active:scale-95 transition-transform py-1">
            <Image
              src="/assets/images/logo.png"
              alt="AGNOS Logo"
              width={160}
              height={44}
              style={{ width: 'auto', height: '40px' }}
              className="object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>

          {/* DESKTOP NAVIGATION (> 787px) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <Link
              href="/patient"
              className={`transition-all duration-150 py-1 ${
                pathname === '/patient'
                  ? 'text-primary_blue font-semibold border-b-2 border-primary_blue'
                  : 'hover:text-primary_blue'
              }`}
            >
              {t.nav.patientForm}
            </Link>
            <Link
              href="/staff"
              className={`transition-all duration-150 py-1 ${
                pathname === '/staff'
                  ? 'text-primary_blue font-semibold border-b-2 border-primary_blue'
                  : 'hover:text-primary_blue'
              }`}
            >
              {t.nav.staffView}
            </Link>
          </nav>

          {/* DESKTOP LANGUAGE SWITCHER (> 787px) */}
          <div className="hidden md:block relative">
            <button
              type="button"
              onClick={toggleLangDropdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-white text-xs font-semibold text-zinc-700 active:scale-95 transition-all duration-150 shadow-2xs"
            >
              <span>{language === 'th' ? 'TH' : 'EN'}</span>
              <svg
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isLangOpen && !isLangClosing ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangOpen && (
              <div className={`absolute right-0 mt-2 w-32 bg-white border border-zinc-100/90 rounded-xl shadow-xl py-1 z-50 transform origin-top-right ${isLangClosing ? 'animate-dropdown-exit' : 'animate-dropdown'}`}>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('th');
                    closeLangDropdown();
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors duration-150 hover:bg-zinc-50 ${
                    language === 'th' ? 'text-primary_blue font-semibold bg-blue-50/40' : 'text-zinc-700'
                  }`}
                >
                  <span>ภาษาไทย</span>
                  {language === 'th' && <span className="text-xs">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    closeLangDropdown();
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors duration-150 hover:bg-zinc-50 ${
                    language === 'en' ? 'text-primary_blue font-semibold bg-blue-50/40' : 'text-zinc-700'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span className="text-xs">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON (<= 787px) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openMobileMenu}
              className="p-2 text-zinc-700 hover:text-zinc-900 active:scale-95 transition-all duration-150 focus:outline-none"
              aria-label="Open Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL SCREEN MENU */}
      {mounted && isMobileMenuOpen && createPortal(
        <div className={`fixed inset-0 z-50 md:hidden bg-white flex flex-col justify-between p-6 ${isMobileMenuClosing ? 'animate-slide-up' : 'animate-slide-down'}`}>
          <div className="space-y-6">
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <Image
                src="/assets/images/logo.png"
                alt="AGNOS Logo"
                width={160}
                height={44}
                style={{ width: 'auto', height: '36px' }}
                className="object-contain mix-blend-multiply"
              />
              <button
                type="button"
                onClick={closeMobileMenu}
                className="p-2 text-zinc-500 hover:text-zinc-900 active:scale-95 transition-all duration-150"
                aria-label="Close Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col pt-2">
              <Link
                href="/patient"
                onClick={closeMobileMenu}
                className={`py-4 text-base border-b border-zinc-100 transition-all duration-150 active:scale-[0.99] ${
                  pathname === '/patient'
                    ? 'text-primary_blue font-semibold'
                    : 'text-zinc-800 hover:text-primary_blue font-normal'
                }`}
              >
                {t.nav.patientForm}
              </Link>
              <Link
                href="/staff"
                onClick={closeMobileMenu}
                className={`py-4 text-base border-b border-zinc-100 transition-all duration-150 active:scale-[0.99] ${
                  pathname === '/staff'
                    ? 'text-primary_blue font-semibold'
                    : 'text-zinc-800 hover:text-primary_blue font-normal'
                }`}
              >
                {t.nav.staffView}
              </Link>
            </nav>
          </div>

          {/* Clean Segmented Language Switcher at Bottom */}
          <div className="pt-6 border-t border-zinc-100 pb-2">
            <div className="grid grid-cols-2 p-1 bg-zinc-100/80 rounded-xl border border-zinc-200/50">
              <button
                type="button"
                onClick={() => setLanguage('th')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all duration-200 ease-out active:scale-95 ${
                  language === 'th'
                    ? 'bg-white text-primary_blue shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ภาษาไทย
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all duration-200 ease-out active:scale-95 ${
                  language === 'en'
                    ? 'bg-white text-primary_blue shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
