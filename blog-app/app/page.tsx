import { getPosts } from "./lib/api"
import { Blog } from "./types/Blog";
import BlogCard from "@/components/BlogCard";

export default async function Home() {

  const blogs: Blog[] = await getPosts();

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Blog App</h1>

      <ul className="space-y-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </ul>



    </div>
  );
}
