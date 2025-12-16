"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: true,
      email: form.get("email"),
      password: form.get("password"),
      callbackUrl: callbackUrl || "/app",
    });
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm text-neutral-700">Email</label>
        <input
          name="email"
          required
          className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-neutral-700">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-xs text-neutral-600">
        Demo users: fan@studi.io / collab@studi.io / artist@studi.io / admin@studi.io — password demo1234
      </p>
    </form>
  );
}
