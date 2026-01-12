import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Login</h1>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          style={{
            marginTop: 16,
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: 10,
          }}
        >
          Sign in with Google
        </button>
      </form>
    </main>
  );
}
