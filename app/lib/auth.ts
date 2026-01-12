import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { upsertUserFromOAuthSchema } from "@/lib/validators";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // NextAuthが自社ドメイン配下で完結するので、ユーザーにsupabase.coは出ません
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // OAuthでログイン成功したら、アプリDB(users)に upsert
      const parsed = upsertUserFromOAuthSchema.safeParse({
        email: user.email,
        name: user.name,
        image: user.image,
      });
      if (!parsed.success) return false;

      const supabase = createSupabaseAdmin();

      // emailをキーに upsert
      const { data, error } = await supabase
        .from("users")
        .upsert(
          {
            email: parsed.data.email,
            name: parsed.data.name ?? null,
            image_url: parsed.data.image ?? null,
          },
          { onConflict: "email" }
        )
        .select("id,email,name,image_url")
        .single();

      if (error || !data) return false;

      // JWTにアプリユーザーIDを載せたいので、一旦 user に詰める
      (user as any).appUserId = data.id;
      return true;
    },

    async jwt({ token, user }) {
      // 初回ログイン時：user に appUserId が入る
      if (user && (user as any).appUserId) {
        token.appUserId = (user as any).appUserId;
      }
      return token;
    },

    async session({ session, token }) {
      // session.user に appUserId を渡す
      (session.user as any).id = token.appUserId as string | undefined;
      return session;
    },
  },
});
