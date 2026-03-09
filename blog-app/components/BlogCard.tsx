import { Blog } from "@/app/types/Blog";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: Blog }) {
    return (
        <div className="border border-gray-800 p-4 rounded-lg">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="text-gray-600">{blog.body.slice(0, 100) + "..."}</p>
            <Link href={`/blog/${blog.id}`} className="text-blue-500">Read more</Link>
        </div>
    )
}