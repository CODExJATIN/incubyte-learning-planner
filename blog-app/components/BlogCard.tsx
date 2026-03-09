import { Blog } from "@/app/types/Blog";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: Blog }) {
    return (
        <article className="group bg-surface border border-border rounded-xl p-6 hover:shadow-md hover:border-border-focus/50 transition-all duration-300">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors truncate">
                        {blog.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
                        {blog.body.length > 120 ? blog.body.slice(0, 120) + "…" : blog.body}
                    </p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                {blog.comments && blog.comments.length > 0 && (
                    <span className="text-xs text-text-muted">
                        💬 {blog.comments.length} comment{blog.comments.length !== 1 ? "s" : ""}
                    </span>
                )}
                <div className="flex-1" />
                <Link
                    href={`/blog/${blog.id}`}
                    className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                    Read more →
                </Link>
                <Link
                    href={`/blog/${blog.id}/edit`}
                    className="text-sm font-medium text-text-muted hover:text-text-secondary transition-colors"
                >
                    Edit
                </Link>
            </div>
        </article>
    )
}