import { Blog } from '../types/Blog'
import { Comment } from '../types/Comment'

const BASE_URL = 'http://localhost:3000'

export async function getPosts() {
    const res = await fetch(`${BASE_URL}/posts`)
    return res.json()
}

export async function getPostById(id: string) {
    const res = await fetch(`${BASE_URL}/posts/${id}`)
    console.log(res);
    if (!res.ok) return null;
    return res.json()
}

export async function createPost(post: Blog) {
    const res = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export async function updatePost(id: string, post: Blog) {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export async function deletePost(id: string) {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE'
    })
    return res.json()
}

export async function createComment(comment: Comment) {
    const post = await getPostById(comment.postId)
    if (!post) throw new Error('Post not found')

    const newComment = { ...comment, id: String(Date.now()) }
    post.comments.push(newComment)

    const res = await fetch(`${BASE_URL}/posts/${comment.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export async function updateComment(id: string, comment: Comment) {
    const post = await getPostById(comment.postId)
    if (!post) throw new Error('Post not found')

    post.comments = post.comments.map((c: Comment) =>
        c.id === id ? { ...comment, id } : c
    )

    const res = await fetch(`${BASE_URL}/posts/${comment.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export async function deleteComment(postId: string, commentId: string) {
    const post = await getPostById(postId)
    if (!post) throw new Error('Post not found')

    post.comments = post.comments.filter((c: Comment) => c.id !== commentId)

    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return res.json()
}