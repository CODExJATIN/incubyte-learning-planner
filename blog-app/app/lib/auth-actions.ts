'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = 'http://localhost:3000';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) return { error: 'Missing fields' };

    try {
        // Mocking the backend response since the exact Rails endpoints aren't set up on this branch
        // const res = await fetch(`${BASE_URL}/login.json`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ user: { email, password } })
        // });

        // if (!res.ok) {
        //     return { error: 'Invalid email or password' };
        // }

        // const data = await res.json();
        // const token = data.token;
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network
        const token = "mock-jwt-token-for-testing";

        if (token) {
            (await cookies()).set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            });
        }
    } catch (err) {
        return { error: 'Something went wrong. Is backend running?' };
    }

    redirect('/');
}

export async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) return { error: 'Missing fields' };

    try {
        // const res = await fetch(`${BASE_URL}/users.json`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ user: { email, password } })
        // });

        // if (!res.ok) {
        //     const errBody = await res.json().catch(() => ({}));
        //     return { error: errBody.error || 'Failed to create account' };
        // }

        // const data = await res.json();
        // const token = data.token;
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network
        const token = "mock-jwt-token-for-testing";

        if (token) {
            (await cookies()).set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            });
        }
    } catch (err) {
        return { error: 'Something went wrong. Is backend running?' };
    }

    redirect('/');
}

export async function logout() {
    (await cookies()).delete('token');
    redirect('/');
}
