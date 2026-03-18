"use client";

import { Blog } from "@/app/types/Blog";
import Link from "next/link";
import { deleteBlog } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function BlogCard({ blog, isLoggedIn = false }: { blog: Blog, isLoggedIn?: boolean }) {
    const router = useRouter();
    async function handleDelete(id: string) {
        await deleteBlog(id);
        router.refresh();
    }

    return (
        <article className="group relative overflow-hidden glass hover:glass-hover glass-hover rounded-2xl p-6 transition-all duration-300 flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 flex flex-col flex-1 gap-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary group-hover:from-primary group-hover:to-primary-light transition-all truncate">
                        {blog.title}
                    </h2>
                    <p className="mt-3 text-[15px] text-text-secondary leading-relaxed line-clamp-3">
                        {blog.body}
                    </p>
                </div>
            </div>
            
            <div className="mt-auto pt-5 border-t border-border/50 flex flex-wrap items-center gap-4 relative z-10">
                {blog.comments && blog.comments.length > 0 && (
                    <span className="text-xs text-text-muted">
                        💬 {blog.comments.length} comment{blog.comments.length !== 1 ? "s" : ""}
                    </span>
                )}
                <div className="flex-1" />
                <Link
                    href={`/blog/${blog.id}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover transition-colors gap-1 group/link"
                >
                    Read more <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
                {isLoggedIn && (
                    <>
                        <Link
                            href={`/blog/${blog.id}/edit`}
                            className="text-sm font-medium px-3 py-1 rounded-full bg-slate-100/50 text-text-secondary hover:bg-slate-200/50 hover:text-text-primary dark:bg-slate-800/50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-sm font-medium px-3 py-1 rounded-full bg-red-50/50 text-red-500 hover:bg-red-100 hover:text-red-700 dark:bg-red-950/20 dark:hover:bg-red-900/30 transition-colors"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
            </div>
        </article>
    )
}