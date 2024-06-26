'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserTabs({ isAdmin }) {
    const path = usePathname();
    console.log(path);
    return (
        <div className="flex justify-center gap-4 mx-auto tabs">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Profile
            </Link>
            {isAdmin && (
                <>
                    <Link
                        href={'/categories'}
                        className={path === '/categories' ? 'active' : ''}
                    >
                        Categories
                    </Link>
                    <Link
                        href={'/menu-items'}
                        className={path.includes('menu-items') ? 'active' : ''}
                    >
                        Menu Items
                    </Link>
                    <Link
                        href={'/'}
                        className={path === '/users' ? 'active' : ''}
                    >
                        Users
                    </Link>
                </>
            )}
        </div>
    );
}
