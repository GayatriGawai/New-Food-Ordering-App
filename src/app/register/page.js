'use client'; // refers that we are using the client components if we receive the error for using this server components

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            setUserCreated(true);
        } else {
            setError(true);
        }
        setCreatingUser(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-8 font-semibold ">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User is registered <br /> you can{' '}
                    <Link className="underline" href={'/login'}>
                        Login &gt;
                    </Link>
                </div>
            )}

            {error && (
                <div className="my-4 text-center">
                    An error has occured <br />
                    Please try again
                </div>
            )}

            <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
                <input
                    disabled={creatingUser}
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    disabled={creatingUser}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={creatingUser}
                    className="w-full"
                >
                    Register
                </button>
                <div className="text-gray-500 text-xs p-2 text-center">
                    or login with provider
                </div>
                <button
                    className="flex gap-2 justify-center w-full"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
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
                    Already have an account?{' '}
                    <Link
                        className="underline hover:text-blue-500"
                        href={'/login'}
                    >
                        Login &gt;&gt;
                    </Link>
                </div>
            </form>
        </section>
    );
}
