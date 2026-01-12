import { auth } from "@/lib/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export default async function DashboardPage() {
  const session = await auth();
  const appUserId = (session?.user as any)?.id as string | undefined;

  if (!appUserId) {
    return <main style={{ padding: 24 }}>No session</main>;
  }

  const supabase = createSupabaseAdmin();
  const { data: me } = await supabase
    .from("users")
    .select("id,email,name,image_url,created_at")
    .eq("id", appUserId)
    .single();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Dashboard</h1>
      <pre style={{ marginTop: 16 }}>{JSON.stringify(me, null, 2)}</pre>
    </main>
  );
}
