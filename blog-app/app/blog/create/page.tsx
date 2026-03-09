import BlogForm from "@/components/BlogForm"
import Link from "next/link"

export default function CreateBlog() {
    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                    ← Back to all blogs
                </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-6">
                Create a New Blog
            </h1>
            <BlogForm />
        </div>
    )
}