import BlogForm from "@/components/BlogForm";

export default async function EditBlog({params}: {params: Promise<{id: string}>}) {

    const {id} = await params;

    return (
        <div>
            <h1>Edit Blog</h1>
            <BlogForm id={id}/>
        </div>
    )
}