'use client';
import UserTabs from '../../../../components/layout/UserTabs';
import Link from 'next/link';
import Left from '../../../../components/Icons/Left';
import { ToastContainer, toast } from 'react-toastify';
import { useProfile } from '../../../../components/UseProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { redirect } from 'next/navigation';
import MenuItemForm from '../../../../components/layout/MenuItemForm';

export default function EditMenuItemPage() {
    const { id } = useParams();
    const { loading, data } = useProfile();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToMenu, setRedirectToMenu] = useState(false);

    useEffect(() => {
        console.log({ id });
        fetch('/api/menu-items').then((res) => {
            res.json().then((items) => {
                const item = items.find((i) => i._id === id);
                setMenuItem(item);
            });
        });
    }, []);

    async function handleFormSubmit(e, data) {
        e.preventDefault();
        data = { ...data, _id: id };

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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
        </section>
    );
}
