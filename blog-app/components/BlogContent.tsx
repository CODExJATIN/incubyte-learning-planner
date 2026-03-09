import { Blog } from "@/app/types/Blog";

export default function BlogContent({ blog }: { blog: Blog }) {
    return (
        <article className="bg-surface border border-border rounded-xl p-8">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                {blog.title}
            </h1>
            <div className="mt-6 text-text-secondary leading-relaxed whitespace-pre-wrap">
                {blog.body}
            </div>
        </article>
    )
}