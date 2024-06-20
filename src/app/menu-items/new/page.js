'use client';
import { useProfile } from '../../../components/UseProfile';
import UserTabs from '../../../components/layout/UserTabs';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function NewMenuItemPage() {
    const { loading, data } = useProfile();
    const [name, setName] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [description, setDescription] = useState('');

    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = { name, description, basePrice };

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
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
            loading: `Saving ${e.target.value}`,
            success: 'Item saved',
            error: 'Unable to save the Item',
        });
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
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex items-start gap-4">
                    {/*
                        Will implement a dropzone for this
                    */}
                    <div>Image</div>
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

                        <button type="submit" className="w-full">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
