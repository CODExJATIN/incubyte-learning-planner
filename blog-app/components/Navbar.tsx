import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold tracking-tight text-text-primary hover:text-primary transition-colors">
                        ✦ Blogosphere
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg transition-all"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog/create"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg shadow-sm hover:shadow transition-all"
                        >
                            + New Blog
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}