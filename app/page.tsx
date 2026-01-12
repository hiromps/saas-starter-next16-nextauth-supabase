export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>SaaS Starter</h1>
      <p style={{ marginTop: 8 }}>Next.js 16 + NextAuth + Supabase + Vercel</p>
      <a href="/dashboard" style={{ display: "inline-block", marginTop: 16 }}>
        Go to Dashboard
      </a>
    </main>
  );
}
