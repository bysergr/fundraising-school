'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:text-clip">
      <Header />
      <main className="grow scroll-smooth">{children}</main>
      <Footer />
    </div>
  );
}
