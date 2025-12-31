'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Image
            src="/logo/logo.png"
            alt="ALINO"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
            ALINO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm text-[#6B7280]">
          <a href="#about" className="underline-gradient hover:text-[#6366F1] transition-colors">
            Về chúng tôi
          </a>
          <a href="#product" className="underline-gradient hover:text-[#6366F1] transition-colors">
            Sản phẩm
          </a>
          <a href="#news" className="underline-gradient hover:text-[#6366F1] transition-colors">
            Tin tức
          </a>
          <a href="#contact" className="underline-gradient hover:text-[#6366F1] transition-colors">
            Liên hệ
          </a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="/login"
            className="text-[#6B7280] hover:text-[#6366F1] transition-colors"
          >
            Đăng nhập
          </a>
          <a
            href="/register"
            className="px-5 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/25"
          >
            Đăng ký
          </a>
        </div>
      </div>
    </header>
  );
}

