import { SectionLabel } from "@/components/section-label";
import { LoginForm } from "@/components/login-form";

export default function LoginPage({ searchParams }: { searchParams: { callbackUrl?: string } }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <SectionLabel text="Sign in" />
      <h1 className="font-display text-4xl">Welcome back to studiio.</h1>
      <p className="text-neutral-700">Sign in to access your library, drop orders, and collaborator requests.</p>
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <LoginForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
}
