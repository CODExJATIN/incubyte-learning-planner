import { getBlogById } from "@/app/lib/api";
import { Blog } from "@/app/types/Blog";
import BlogContent from "@/components/BlogContent";
import CommentBar from "@/components/CommentBar";
import CommentList from "@/components/CommentList";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog: Blog = await getBlogById(id);

    if (!blog) return notFound();

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
            <BlogContent blog={blog} />
            <CommentList comments={blog.comments} />
            <CommentBar postId={id} />
        </div>
    )
}