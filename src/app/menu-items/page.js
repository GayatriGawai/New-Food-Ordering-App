'use client';
import Link from 'next/link';
import { useProfile } from '../../components/UseProfile';
import UserTabs from '../../components/layout/UserTabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Right from '../../components/Icons/Right';

export default function MenuItemsPage() {
    const { loading, data } = useProfile();

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
        </section>
    );
}
