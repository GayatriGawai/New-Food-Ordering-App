'use client';
import { useState } from 'react';
import MenuItemProps from './MenuItemProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [name, setName] = useState(menuItem?.name || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredients, setExtraIngredients] = useState(
        menuItem?.extraIngredients || []
    );

    return (
        <form
            className="mt-8 max-w-md mx-auto"
            onSubmit={(e) =>
                onSubmit(e, {
                    name,
                    description,
                    basePrice,
                    sizes,
                    extraIngredients,
                })
            }
        >
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
                    <MenuItemProps
                        name={'Sizes'}
                        props={sizes}
                        setProps={setSizes}
                        addLabel={'Add item size'}
                    />
                    <MenuItemProps
                        name={'Extra ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredients}
                        setProps={setExtraIngredients}
                    />
                    <button
                        type="submit"
                        className="w-full button hover:text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
