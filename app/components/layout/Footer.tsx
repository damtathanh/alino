'use client';

import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/logo.png"
                alt="ALINO"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                ALINO
              </span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Nền tảng hợp tác cho Creator và Brand chuyên nghiệp.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#1877F2] transition-colors hover:scale-110 transform duration-200"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#DD2A7B] transition-colors hover:scale-110 transform duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#000000] transition-colors hover:scale-110 transform duration-200"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#FF0000] transition-colors hover:scale-110 transform duration-200"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#0A66C2] transition-colors hover:scale-110 transform duration-200"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-tight">Sản phẩm</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li>
                <a href="#product" className="hover:text-[#6366F1] transition-colors">
                  Tính năng
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#6366F1] transition-colors">
                  Bảng giá
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#6366F1] transition-colors">
                  Cách hoạt động
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-tight">Công ty</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li>
                <a href="#about" className="hover:text-[#6366F1] transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-[#6366F1] transition-colors">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#6366F1] transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-tight">Pháp lý</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li>
                <a href="#terms" className="hover:text-[#6366F1] transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#6366F1] transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 text-center text-sm text-[#9CA3AF]">
          © 2025 ALINO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

