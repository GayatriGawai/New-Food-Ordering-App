'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserTabs from '../../components/layout/UserTabs';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState(false);
    const [saving, setSaving] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

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
                    setIsAdmin(data.admin);

                    setProfileFetched(true);
                });
            });
        }
    }, [session, status]);

    async function handleSubmit(e) {
        e.preventDefault();
        setProfile(false);
        setSaving(true);
        toast.info('Saving...');
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                phone,
                streetAddress,
                postalCode,
                city,
                country,
            }),
        });
        setSaving(false);

        if (response.ok) {
            setProfile(true);
            toast.success('Profile saved!');
        } else {
            toast.error('Failed to save profile.');
        }
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }
    const userImage = session.data.user.image;
    console.log(isAdmin);

    return (
        <section className="mt-8">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <UserTabs isAdmin={isAdmin} />
            <h1 className="text-center text-primary text-4xl mt-8 font-semibold mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto paper">
                <div className="flex justify-center ">
                    <Image
                        className="rounded-full w-fit h-fit mb-2"
                        src={userImage}
                        width={250}
                        height={250}
                        alt="avatar"
                    />
                </div>
                <div className="flex gap-2">
                    <form className="grow" onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label>Email</label>{' '}
                        <p className="text-xs text-red-500">
                            *email address can&apos;t be changed
                        </p>
                        <input
                            type="email"
                            value={session.data.user.email}
                            disabled={true}
                        />
                        <label>Phone number</label>
                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label>Street address</label>
                        <input
                            type="text"
                            placeholder="Street address"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <div>
                                <label>Postal Code</label>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>City</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>
                        <label>Country</label>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="border rounded-full whitespace-nowrap bg-primary py-2 px-8 hover:shadow-md w-full transition-all hover:shadow-black/25  hover:text-white hover:underline"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
