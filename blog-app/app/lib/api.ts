import { Blog } from '../types/Blog'
import { Comment } from '../types/Comment'

// Rails runs on port 3000; Next.js dev server runs on port 3001
const BASE_URL = 'http://localhost:3000'

/** Helper: throw a detailed error showing HTTP status + server message */
async function throwIfNotOk(res: Response, context: string): Promise<void> {
    if (!res.ok) {
        let detail = ''
        try { detail = await res.text() } catch { /* ignore */ }
        throw new Error(`${context} — HTTP ${res.status}: ${detail}`)
    }
}

export async function getBlogs(): Promise<Blog[]> {
    const res = await fetch(`${BASE_URL}/articles.json`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
}

export async function getBlogById(id: string): Promise<Blog | null> {
    const res = await fetch(`${BASE_URL}/articles/${id}.json`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
}

export async function createBlog(blog: Omit<Blog, 'id' | 'comments'>): Promise<Blog> {
    const res = await fetch(`${BASE_URL}/articles.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: blog })
    })
    await throwIfNotOk(res, 'Failed to create blog')
    return res.json()
}

export async function updateBlog(id: string, blog: Omit<Blog, 'id' | 'comments'>): Promise<Blog> {
    const res = await fetch(`${BASE_URL}/articles/${id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: blog })
    })
    await throwIfNotOk(res, 'Failed to update blog')
    return res.json()
}

export async function deleteBlog(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/articles/${id}.json`, {
        method: 'DELETE'
    })
    await throwIfNotOk(res, 'Failed to delete blog')
}

// Comments are nested under articles: POST /articles/:article_id/comments.json
export async function createComment(comment: Omit<Comment, 'id'>): Promise<Comment> {
    const res = await fetch(`${BASE_URL}/articles/${comment.postId}/comments.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: { commenter: comment.commenter, body: comment.body } })
    })
    await throwIfNotOk(res, 'Failed to create comment')
    return res.json()
}

// DELETE /articles/:article_id/comments/:id.json
export async function deleteComment(postId: string, commentId: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/articles/${postId}/comments/${commentId}.json`, {
        method: 'DELETE'
    })
    await throwIfNotOk(res, 'Failed to delete comment')
}