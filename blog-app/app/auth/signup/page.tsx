'use client'

import { useActionState } from 'react';
import { signup } from '@/app/lib/auth-actions';
import Link from 'next/link';

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <div className="relative max-w-md mx-auto mt-24 flex flex-col items-center">
      {/* Decorative background glow */}
      <div className="absolute -inset-1 bg-gradient-to-l from-primary-light to-primary rounded-3xl blur opacity-25" />
      
      <div className="relative p-8 glass w-full rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-12 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-12 -translate-y-12"></div>
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-text-primary to-text-secondary drop-shadow-sm mb-2 text-glow">
            Join the Club
          </h1>
          <p className="text-text-secondary">Create a free account and start writing.</p>
        </div>
        
        {state?.error && (
          <div className="mb-6 p-4 bg-danger/10 text-danger border border-danger/20 rounded-xl text-sm font-medium animate-pulse relative z-10">
            🚨 {state.error}
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-5 relative z-10">
          <div className="group">
            <label className="block text-sm font-medium text-text-secondary mb-1.5 transition-colors group-focus-within:text-primary">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-5 py-3 border border-border rounded-xl bg-surface/50 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-primary/10 hover:bg-surface transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="group">
            <label className="block text-sm font-medium text-text-secondary mb-1.5 transition-colors group-focus-within:text-primary">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-5 py-3 border border-border rounded-xl bg-surface/50 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-primary/10 hover:bg-surface transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-text-secondary mb-1.5 transition-colors group-focus-within:text-primary">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              required
              className="w-full px-5 py-3 border border-border rounded-xl bg-surface/50 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-primary/10 hover:bg-surface transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 px-5 py-3.5 text-white font-semibold tracking-wide bg-gradient-to-l from-primary to-primary-light hover:from-primary-hover hover:to-primary rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-secondary relative z-10">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:text-primary-hover font-bold transition-colors">
            Log in 👋
          </Link>
        </p>
      </div>
    </div>
  );
}
