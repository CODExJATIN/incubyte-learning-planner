'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = 'http://localhost:3000';

/**
 * Login Server Action
 * Rails endpoint: POST /login
 * Expects: { email, password }
 * Returns: { message, token }
 */
export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) return { error: 'Email and password are required' };

    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            return { error: data.error || 'Invalid email or password' };
        }

        const data = await res.json();
        const token = data.token;

        if (token) {
            (await cookies()).set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            });
        }
    } catch {
        return { error: 'Something went wrong. Is the Rails backend running on port 3000?' };
    }

    redirect('/');
}

/**
 * Signup Server Action
 * Rails endpoint: POST /signup
 * Expects: { email, password, password_confirmation }
 * Returns: { message } on success
 * Then auto-logs in the user by calling /login
 */
export async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const passwordConfirmation = formData.get('password_confirmation')?.toString();

    if (!email || !password) return { error: 'Email and password are required' };
    if (password !== passwordConfirmation) return { error: 'Passwords do not match' };

    try {
        // Step 1: Create the user
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, password_confirmation: passwordConfirmation })
        });

        if (!signupRes.ok) {
            const errBody = await signupRes.json().catch(() => ({}));
            return { error: errBody.errors?.join(', ') || 'Failed to create account' };
        }

        // Step 2: Auto-login to get the JWT token
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!loginRes.ok) {
            return { error: 'Account created but login failed. Please try logging in manually.' };
        }

        const loginData = await loginRes.json();
        const token = loginData.token;

        if (token) {
            (await cookies()).set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            });
        }
    } catch {
        return { error: 'Something went wrong. Is the Rails backend running on port 3000?' };
    }

    redirect('/');
}

/**
 * Logout Server Action
 * Simply clears the JWT cookie
 */
export async function logout() {
    (await cookies()).delete('token');
    redirect('/');
}
