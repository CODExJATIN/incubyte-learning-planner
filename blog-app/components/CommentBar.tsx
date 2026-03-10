"use client";

import { createComment } from "@/app/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentBar({ postId }: { postId: string }) {
    const [commenter, setCommenter] = useState("");
    const [body, setBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!commenter.trim() || !body.trim()) return;

        setIsSubmitting(true);
        try {
            await createComment({ commenter, body, postId });
            setCommenter("");
            setBody("");
            router.refresh();
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="mt-8 bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Leave a Comment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Your name"
                    value={commenter}
                    onChange={(e) => setCommenter(e.target.value)}
                    className="border border-border px-4 py-2.5 rounded-lg text-text-primary placeholder:text-text-muted bg-white focus:border-border-focus focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <textarea
                    placeholder="Share your thoughts…"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="border border-border px-4 py-2.5 rounded-lg text-text-primary placeholder:text-text-muted bg-white focus:border-border-focus focus:ring-2 focus:ring-primary/10 transition-all min-h-[100px] resize-y"
                />
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Posting…" : "Post Comment"}
                    </button>
                </div>
            </form>
        </div>
    );
}
