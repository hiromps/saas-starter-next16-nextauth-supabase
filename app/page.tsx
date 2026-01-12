import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'SaaS Starter',
  description: 'Next.js 16 + NextAuth + Supabase + Vercel',
};

type ButtonLinkProps = {
  href: string;
  label?: string;
  className?: string;
  ariaLabel?: string;
};

function ButtonLink({ href, label, className = '', ariaLabel, children }: PropsWithChildren<ButtonLinkProps>) {
  const defaultClass = 'mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded';
  const content = children ?? label ?? href;
  return (
    <Link href={href} aria-label={ariaLabel ?? String(content)} className={className || defaultClass}>
      {content}
    </Link>
  );
}

export default function Home(): JSX.Element {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-extrabold">SaaS Starter</h1>
      <p className="mt-2">Next.js 16 + NextAuth + Supabase + Vercel</p>
      <ButtonLink href="/dashboard" ariaLabel="Open dashboard">
        Go to Dashboard
      </ButtonLink>
    </main>
  );
}
