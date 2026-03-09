import { getBlogById } from "@/app/lib/api";
import { Blog } from "@/app/types/Blog";
import BlogContent from "@/components/BlogContent";
import CommentBar from "@/components/CommentBar";
import CommentList from "@/components/CommentList";
import { notFound } from "next/navigation";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);
    const blog: Blog = await getBlogById(id);
    console.log(blog);

    if (!blog) return notFound();

    return (
        <div>
            <BlogContent blog={blog} />
            <CommentBar postId={id} />
            <CommentList comments={blog.comments} />
        </div>
    )
}