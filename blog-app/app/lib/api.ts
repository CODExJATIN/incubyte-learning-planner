import { Blog } from '../types/Blog'
import { Comment } from '../types/Comment'

const BASE_URL = 'http://localhost:3000'

export async function getBlogs() {
    const res = await fetch(`${BASE_URL}/blogs`)
    return res.json()
}

export async function getBlogById(id: string) {
    const res = await fetch(`${BASE_URL}/blogs/${id}`)
    console.log(res);
    if (!res.ok) return null;
    return res.json()
}

export async function createBlog(blog: Omit<Blog, 'comments'>) {
    const res = await fetch(`${BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...blog,comments:[]})
    })
    return res.json()
}

export async function updateBlog(id: string, blog: Omit<Blog, 'comments'>) {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
    return res.json()
}

export async function deleteBlog(id: string) {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: 'DELETE'
    })
    return res.json()
}

export async function createComment(comment: Comment) {
    const post = await getBlogById(comment.postId)
    if (!post) throw new Error('Post not found')

    const newComment = { ...comment, id: String(Date.now()) }
    post.comments.push(newComment)

    const res = await fetch(`${BASE_URL}/blogs/${comment.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export async function updateComment(id: string, comment: Comment) {
    const post = await getBlogById(comment.postId)
    if (!post) throw new Error('Post not found')

    post.comments = post.comments.map((c: Comment) =>
        c.id === id ? { ...comment, id } : c
    )

    const res = await fetch(`${BASE_URL}/blogs/${comment.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export async function deleteComment(postId: string, commentId: string) {
    const post = await getBlogById(postId)
    if (!post) throw new Error('Post not found')

    post.comments = post.comments.filter((c: Comment) => c.id !== commentId)

    const res = await fetch(`${BASE_URL}/blogs/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}