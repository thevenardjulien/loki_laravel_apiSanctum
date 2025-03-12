import React, { useState } from 'react';
import { fetchCreateProducts } from '@/fetch/products';
import { router } from "@inertiajs/react";

export default function CreateProduct() {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const token = localStorage.getItem('token');

    const handleSizeClick = (size: string) => {
        setSelectedSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size)
                : [...prevSizes, size]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.set('sizes', selectedSizes.join(','));
        console.log(Object.fromEntries(formData));

        if (token) {
            const response = await fetchCreateProducts(formData, token);
            console.log(response);
            router.visit('/products');
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Product</h1>

            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input type="text" name="title" id="title" className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" required />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input type="text" name="category" id="category" className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" required />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                        <input type="file" name="image" id="image" accept="image/*" className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea name="description" id="description" rows={3} className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"></textarea>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                        <input type="number" name="stock" id="stock" className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" required />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input type="number" name="price" id="price" className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" required />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <input type="text" name="color" id="color" className="mt-1 block w-full rounded-md border-1 border-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" required />
                    </div>


                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                        <div className="flex space-x-2 mt-1">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSizeClick(size)}
                                    className={`px-4 py-2 rounded-md border ${selectedSizes.includes(size)
                                        ? 'bg-indigo-600 text-white'
                                        : 'border-gray-300 hover:bg-indigo-100'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="sizes" value={selectedSizes.join(',')} />
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className={`inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${selectedSizes.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            disabled={selectedSizes.length === 0}
                        >
                            Create Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
