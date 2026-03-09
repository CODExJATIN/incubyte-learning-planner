import BlogForm from "@/components/BlogForm";
import Link from "next/link";

export default async function EditBlog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <div className="mb-6">
                <Link
                    href={`/blog/${id}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                    ← Back to blog
                </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-6">
                Edit Blog
            </h1>
            <BlogForm id={id} />
        </div>
    )
}