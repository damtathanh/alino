import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthGate from './AuthGate';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALINO - Quản lý hợp tác Creator–Brand',
  description: 'Nền tảng quản lý hợp tác giữa Creator và Brand chuyên nghiệp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
