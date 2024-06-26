'use client';
import { useState } from 'react';
import Plus from '../../components/Icons/Plus';
import Trash from '../../components/Icons/Trash';
import ChevronDown from '../../components/Icons/ChevronDown';
import ChevronUp from '../../components/Icons/ChevronUp';

export default function MenuItemProps({ name, addLabel, props, setProps }) {
    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps((oldProps) => {
            return [...oldProps, { name: '', price: 0 }];
        });
    }

    function editProps(e, index, prop) {
        const newValue = e.target.value;
        setProps((prevSizes) => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(indexToRemove) {
        setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
    }
    return (
        <div className="bg-gray-200 p-2 rounded mb-2">
            <button
                type="button"
                className="inline-flex p-1 border-0 justify-start"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen && <ChevronUp />}
                {!isOpen && <ChevronDown />}
                <span className="text-black">{name}</span>
                <span className="text-xs">({props?.length})</span>
            </button>

            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 &&
                    props.map((size, index) => (
                        <div key={size} className="flex items-end gap-2">
                            <div>
                                <label className="text-black text-xs">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Size name"
                                    value={size.name}
                                    onChange={(e) =>
                                        editProps(e, index, 'name')
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-black  text-xs">
                                    Extra price
                                </label>
                                <input
                                    type="text"
                                    placeholder="Extra Price"
                                    value={size.price}
                                    onChange={(e) =>
                                        editProps(e, index, 'price')
                                    }
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="bg-red-500  font-normal mb-2 px-2"
                                    onClick={() => removeProp(index)}
                                >
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {isOpen && (
                <button
                    type="button"
                    className="bg-white items-center"
                    onClick={addProps}
                >
                    <Plus />
                    {addLabel}
                </button>
            )}
        </div>
    );
}
