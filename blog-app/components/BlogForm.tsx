"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, getBlogById, updateBlog } from "@/app/lib/api";
import { Blog } from "@/app/types/Blog";

export default function BlogForm({ id = "" }: { id?: string }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchBlog(id: string) {
            const post = await getBlogById(id);
            if (post) {
                setTitle(post.title);
                setBody(post.body);
            }
        }

        if (id) {
            fetchBlog(id);
        }

    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        setIsSubmitting(true);
        try {
            if (id) {
                await updateBlog(id, { title, body });
            } else {
                await createBlog({ title, body });
            }
            setTitle("");
            setBody("");
            router.push("/");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-surface border border-border rounded-xl p-8">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium text-text-primary">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="border border-border px-4 py-3 rounded-lg text-text-primary placeholder:text-text-muted bg-white focus:border-border-focus focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Give your blog a title…"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="body" className="text-sm font-medium text-text-primary">
                        Content
                    </label>
                    <textarea
                        id="body"
                        className="border border-border px-4 py-3 rounded-lg text-text-primary placeholder:text-text-muted bg-white focus:border-border-focus focus:ring-2 focus:ring-primary/10 transition-all min-h-[200px] resize-y"
                        placeholder="Write your thoughts…"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Saving…" : id ? "Update Blog" : "Publish Blog"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}