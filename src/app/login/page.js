'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLogInProgress] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLogInProgress(true);
        await signIn('credentials', { email, password, callbackUrl: '/' });
        setLogInProgress(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center mb-8 text-primary text-4xl font-semibold">
                Login
            </h1>

            <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loginInProgress}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loginInProgress}
                />

                <button
                    type="submit"
                    className="w-full"
                    disabled={loginInProgress}
                >
                    Login
                </button>

                <div className="text-gray-500 text-xs p-2 text-center">
                    or login with provider
                </div>

                <button
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex gap-2 justify-center w-full"
                >
                    <Image
                        src={'/google.png'}
                        width={24}
                        height={24}
                        alt=""
                    ></Image>
                    Login with Google
                </button>

                <div className="text-sm text-center text-gray-500 border-t my-4 p-2">
                    Don&apos;t have an account?{' '}
                    <Link
                        className="underline hover:text-blue-500"
                        href={'/register'}
                    >
                        Register &gt;&gt;
                    </Link>
                </div>
            </form>
        </section>
    );
}
