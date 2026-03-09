import { getBlogs } from "./lib/api"
import { Blog } from "./types/Blog";
import BlogCard from "@/components/BlogCard";

export default async function Home() {
  const blogs: Blog[] = await getBlogs();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Latest Blogs
        </h1>
        <p className="mt-2 text-text-secondary">
          Discover stories, ideas, and insights from our community.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">No blogs yet. Be the first to write one!</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
