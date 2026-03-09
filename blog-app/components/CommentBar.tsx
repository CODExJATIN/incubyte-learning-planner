"use client";

import { createComment } from "@/app/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentBar({ postId }: { postId: string }) {
    const [commenter, setCommenter] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!commenter.trim() || !body.trim()) return;

        await createComment({ id: "", commenter, body, postId });
        setCommenter("");
        setBody("");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md mt-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Add a Comment</h2>
            <input
                type="text"
                placeholder="Your name"
                value={commenter}
                onChange={(e) => setCommenter(e.target.value)}
                className="border p-2 rounded"
            />
            <textarea
                placeholder="Write your comment..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
}
