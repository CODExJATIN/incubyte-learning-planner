import { Blog } from "@/app/types/Blog";

export default function BlogContent({ blog }: { blog: Blog }) {
    return (
        <div className="p-4 border border-gray-800 rounded-lg">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="text-gray-600">{blog.body}</p>
        </div>
    )
}