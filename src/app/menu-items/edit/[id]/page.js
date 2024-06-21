'use client';
import UserTabs from '../../../../components/layout/UserTabs';
import Link from 'next/link';
import Left from '../../../../components/Icons/Left';
import { ToastContainer, toast } from 'react-toastify';
import { useProfile } from '../../../../components/UseProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { redirect } from 'next/navigation';

export default function EditMenuItemPage() {
    const { id } = useParams();
    const { loading, data } = useProfile();
    const [name, setName] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [description, setDescription] = useState('');
    const [redirectToMenu, setRedirectToMenu] = useState(false);

    useEffect(() => {
        console.log({ id });
        fetch('/api/menu-items').then((res) => {
            res.json().then((items) => {
                const item = items.find((i) => i._id === id);
                setName(item.name);
                setBasePrice(item.basePrice);
                setDescription(item.description);
            });
        });
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = { name, description, basePrice, _id: id };

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: `Updating ${e.target.value}`,
            success: 'Item updated',
            error: 'Unable to update the Item',
        });
        setRedirectToMenu(true);
    }

    if (redirectToMenu) {
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <ToastContainer />
            <div className="mt-8 max-w-md mx-auto">
                <Link href={'/menu-items'} className="button flex">
                    <Left />
                    Show all menu items
                </Link>
            </div>
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex items-start gap-4">
                    {/*
                    Will implement a dropzone for this
                    <div>Image</div>
                    */}
                    <div className="grow">
                        <label>Item name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="flex gap-1">
                            <label>Description</label>
                            <p className="text-red-500 italic text-xs">
                                eg. Indegridients
                            </p>
                        </div>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label>Base Price</label>

                        <input
                            type="text"
                            value={basePrice}
                            onChange={(e) => setBasePrice(e.target.value)}
                        />

                        <button type="submit" className="w-full button">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
