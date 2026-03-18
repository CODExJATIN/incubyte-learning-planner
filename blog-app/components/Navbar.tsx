import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/app/lib/auth-actions";

export default async function Navbar() {
    const isLoggedIn = (await cookies()).has('token');
    return (
        <nav className="sticky top-4 z-50 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl flex items-center justify-between h-16 px-6 shadow-sm border border-white/20 dark:border-white/10">
                <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary hover:from-primary hover:to-primary-light transition-all flex items-center gap-2">
                    <span className="text-primary text-glow">✺</span> Blogosphere
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                    >
                        Home
                    </Link>
                    
                    {isLoggedIn && (
                        <Link
                            href="/blog/create"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all border border-primary-light/50"
                        >
                            <span className="mr-1">+</span> New Blog
                        </Link>
                    )}
                    
                    <div className="w-px h-6 bg-border mx-1"></div>

                    {isLoggedIn ? (
                        <form action={logout}>
                            <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                                Logout
                            </button>
                        </form>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/auth/login"
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="px-4 py-2 text-sm font-medium text-text-primary bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white rounded-xl shadow-sm border border-border transition-all"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}