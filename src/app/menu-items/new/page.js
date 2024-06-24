'use client';
import { useProfile } from '../../../components/UseProfile';
import UserTabs from '../../../components/layout/UserTabs';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Link from 'next/link';
import Left from '../../../components/Icons/Left';
import MenuItemForm from '../../../components/layout/MenuItemForm';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';

export default function NewMenuItemPage() {
    const { loading, data } = useProfile();
    const [redirectToMenu, setRedirectToMenu] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();

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
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}
