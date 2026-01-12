import React from 'react';

export const metadata = {
  title: 'SaaS Starter',
  description: 'Next.js 16 + NextAuth + Supabase + Vercel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-google-analytics-opt-out="">
      <head />
      <body className="min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
