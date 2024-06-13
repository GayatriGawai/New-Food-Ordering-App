'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState(false);
    const [saving, setSaving] = useState(false);

    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);

            fetch('/api/profile').then((response) => {
                response.json().then((data) => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                });
            });
        }
    }, [session, status]);

    async function handleSubmit(e) {
        e.preventDefault();
        setProfile(false);
        setSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                streetAddress,
                postalCode,
                city,
                country,
            }),
        });
        setSaving(false);

        if (response.ok) {
            setProfile(true);
        }
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
                {profile && (
                    <h2 className="text-center bg-success p-4 rounded-lg text-white font-semibold">
                        Profile saved!
                    </h2>
                )}
                {saving && (
                    <h2 className="text-center bg-warning p-4 rounded-lg text-white font-semibold">
                        Saving...
                    </h2>
                )}
                <div className="flex gap-2">
                    <div>
                        <div className="p-2 relative h-24">
                            <Image
                                className="rounded w-full h-full mb-2"
                                src={userImage}
                                width={250}
                                height={250}
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <p className="text-xs text-red-500 italic">
                            *email address can&apos;t be changed
                        </p>
                        <input
                            type="email"
                            value={session.data.user.email}
                            disabled={true}
                        />
                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Street address"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
