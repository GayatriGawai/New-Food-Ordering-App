'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const session = useSession();
    console.log(session);
    const status = session.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <div>
            <header className="flex items-center justify-between">
                <nav className="flex  items-center gap-4 text-gray-400 font-semibold">
                    <Link className="text-primary font-bold text-2xl" href="/">
                        OUT
                    </Link>
                    <Link className="hover:text-blue-400" href={'/'}>
                        Home
                    </Link>
                    <Link className="hover:text-blue-400" href={''}>
                        Menu
                    </Link>
                    <Link className="hover:text-blue-400" href={''}>
                        About
                    </Link>
                    <Link className="hover:text-blue-400" href={''}>
                        Contact
                    </Link>
                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    {status === 'authenticated' && (
                        <Link
                            href={'/profile'}
                            className="whitespace-nowrap text-primary py-2 px-8 hover:text-black hover:underline"
                        >
                            Hello, {userName}!
                        </Link>
                    )}
                    {status === 'authenticated' && (
                        <button
                            className="bg-primary py-2 px-8 text-white rounded-full hover:shadow-black/25 hover:shadow-md transition-all"
                            onClick={() => signOut()}
                        >
                            Logout
                        </button>
                    )}
                    {status !== 'authenticated' && (
                        <>
                            <Link href={'/login'}>Login</Link>
                            <Link
                                className="bg-primary py-2 px-8 text-white rounded-full hover:shadow-black/25 hover:shadow-md transition-all"
                                href={'/register'}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
        </div>
    );
}
