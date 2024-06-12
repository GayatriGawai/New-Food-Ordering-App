'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
        }
    }, [session, status]);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(
            session,
            '######################### triggered by handleSubmit function #############################'
        );
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName }),
        });
    }

    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }
    const userImage = session.data.user.image;

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
                <h2 className="text-center bg-green-100 p-4">Profile saved!</h2>
                <div className="flex gap-2">
                    <div>
                        <div className="p-2 relative h-24">
                            <Image
                                className="rounded-full w-full h-full mb-2"
                                src={userImage}
                                width={250}
                                height={250}
                                alt="avatar"
                            ></Image>
                        </div>
                        <button type="button">Edit</button>
                    </div>
                    <form className="grow" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type="email"
                            value={session.data.user.email}
                            disabled={true}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
