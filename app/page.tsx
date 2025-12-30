'use client';

import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import HomeBody from '@/app/components/home';

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-white">
      <Header />
      <HomeBody />
      <Footer />
    </div>
  );
}
