'use client';
import { useEffect, useState } from 'react';
import { useProfile } from '../../components/UseProfile';
import UserTabs from '../../components/layout/UserTabs';
import { ToastContainer, toast } from 'react-toastify';

//Always import CSS for toast {Mandatory}
import 'react-toastify/dist/ReactToastify.css';

export default function CategoriesPage() {
    const { loading: profileLoading, data: profileData } = useProfile();
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then((res) => {
            res.json().then((categories) => {
                setCategories(categories);
            });
        });
    }

    async function handleNewCategory(e) {
        e.preventDefault();

        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: newCategoryName };

            if (editedCategory) {
                data._id = editedCategory._id;
            }

            const response = await fetch('api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setNewCategoryName('');
            fetchCategories();
            setEditedCategory(null);

            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(creationPromise, {
            loading: editedCategory
                ? 'Updating category'
                : 'Creating new category',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: editedCategory
                ? 'Unable to update category'
                : 'Unable to create category',
        });
    }

    async function handleDelete(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        });

        fetchCategories();
    }

    if (profileLoading) {
        return 'Loading user info....';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <ToastContainer />
            <form className="mt-8" onSubmit={handleNewCategory}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory
                                ? 'Upadate category'
                                : 'New ategory name'}
                            {editedCategory && (
                                <div>
                                    : <b>{editedCategory.name}</b>
                                </div>
                            )}
                        </label>
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="pb-2 flex gap-2">
                        <button type="submit" className="border border-primary">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button
                            className="bg-red-500 text-white"
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setNewCategoryName('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-300">
                    Existing categories
                </h2>

                {categories?.length > 0 &&
                    categories.map((c) => (
                        <div
                            key={c._id}
                            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
                        >
                            <div className="grow">{c.name}</div>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditedCategory(c);
                                        setNewCategoryName(c.name);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(c._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}
