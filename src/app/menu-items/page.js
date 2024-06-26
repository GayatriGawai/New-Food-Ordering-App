'use client';
import Link from 'next/link';
import { useProfile } from '../../components/UseProfile';
import UserTabs from '../../components/layout/UserTabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Right from '../../components/Icons/Right';
import { useEffect, useState } from 'react';

export default function MenuItemsPage() {
    const { loading, data } = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('api/menu-items').then((res) => {
            res.json().then((menuItems) => {
                setMenuItems(menuItems);
            });
        });
    }, []);

    if (loading) {
        return 'Loading user info';
    }

    if (!data.admin) {
        return 'Not an Admin';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link href={'/menu-items/new'} className="button flex">
                    Create a new Menu Item
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 &&
                        menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href={'/menu-items/edit/' + item._id}
                                className="button mb-1 text-center flex-col"
                            >
                                <div>{item.name}</div>
                                <div className="text-xs">
                                    {item.description}
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    );
}
