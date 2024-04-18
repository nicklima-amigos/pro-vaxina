import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Pro Vaxina',
};
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-gray-200 antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
