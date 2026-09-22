import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { CustomCursor } from '@/components/custom-cursor';

// next/font handles preloading, subsetting, font-display:swap automatically
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Portfolio - ARFID ',
  description: 'Portfolio pribadi Arif Hidayat - Pengembang Web dan Mobile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${firaCode.variable}`}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}