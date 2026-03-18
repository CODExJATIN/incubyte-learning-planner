"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, getBlogById, updateBlog } from "@/app/lib/api";

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

    }, [id])

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
        <div className="relative max-w-3xl mx-auto my-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-light/10 rounded-[2rem] blur-2xl opacity-50 -z-10" />
            
            <div className="glass border border-white/20 dark:border-white/10 rounded-[2rem] p-10 relative shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl -z-10 -translate-x-32 translate-y-32"></div>

                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary drop-shadow-sm mb-3">
                        {id ? "Edit your story" : "Write your story"}
                    </h1>
                    <p className="text-text-secondary">Capture your ideas and share them with the world.</p>
                </div>

                <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="group flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-semibold text-text-secondary ml-1 group-focus-within:text-primary transition-colors">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="border border-border px-5 py-4 rounded-xl text-xl font-semibold text-text-primary placeholder:text-text-muted bg-surface/50 focus:outline-none focus:ring-4 focus:ring-primary/10 hover:bg-surface transition-all"
                            placeholder="Give your blog a catchy title…"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    
                    <div className="group flex flex-col gap-2">
                        <label htmlFor="body" className="text-sm font-semibold text-text-secondary ml-1 group-focus-within:text-primary transition-colors">
                            Content
                        </label>
                        <textarea
                            id="body"
                            className="border border-border px-5 py-4 rounded-xl text-lg text-text-primary placeholder:text-text-muted bg-surface/50 focus:outline-none focus:ring-4 focus:ring-primary/10 hover:bg-surface transition-all min-h-[300px] resize-y"
                            placeholder="Share your deepest thoughts…"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6 mt-4 border-t border-border/50">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 sm:flex-none px-10 py-4 text-base font-bold tracking-wide text-white bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                        >
                            {isSubmitting ? "Publishing…" : id ? "Update Blog" : "Publish Blog ✨"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-8 py-4 text-base font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent hover:border-border rounded-xl transition-all active:scale-95 text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}