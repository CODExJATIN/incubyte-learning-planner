import { getBlogs } from "./lib/api"
import { Blog } from "./types/Blog";
import BlogCard from "@/components/BlogCard";
import { cookies } from "next/headers";

export default async function Home() {
  const blogs: Blog[] = await getBlogs();
  const isLoggedIn = (await cookies()).has('token');

  return (
    <div>
      <div className="mb-12 relative overflow-hidden rounded-3xl p-10 glass">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary-light/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-center h-full">
            <h1 className="text-5xl font-extrabold tracking-tight text-text-primary mb-4 drop-shadow-sm">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light text-glow">Ideas</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
            Read stories, thoughts, and insights from a community shaping the future.
            </p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">No blogs yet. Be the first to write one!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      )}
    </div>
  );
}
