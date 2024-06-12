'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';

export default function ProfilePage() {
    const session = useSession();
    const status = session.status;

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
            <form className="max-w-md mx-auto border">
                <div className="flex gap-2">
                    <div>
                        <Image
                            className="rounded-full"
                            src={userImage}
                            width={124}
                            height={124}
                            alt="avatar"
                        ></Image>
                        <button type="button border-0">Change</button>
                    </div>
                    <div className="grow">
                        <input type="text" placeholder="First and last name" />
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}
