"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, getPostById, updatePost } from "@/app/lib/api";
import { Blog } from "@/app/types/Blog";

export default function BlogForm({id}: {id: string}) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();

    useEffect(()=>{
        async function fetchBlog(id:string){
            const post = await getPostById(id);
            if(post){
                setTitle(post.title);
                setBody(post.body);
            }
        }

        if(id){
            fetchBlog(id);
        }

    },[])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("submitting...")
        if (!title.trim() || !body.trim()) return;

        console.log(title, body);

        if(id){
            await updatePost(id, { id, title, body });
        }else{
            await createPost({ id: crypto.randomUUID(), title, body });
        }
        setTitle("");
        setBody("");
        router.refresh();
    }
    return (
        <div className="p-4">
            <form className="flex flex-col gap-2 w-1/2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 rounded"
                    placeholder="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {id ? "Update" : "Create"}
                </button>
            </form>
        </div>
    )
}