import { useEffect } from 'react';
import { fetchProducts, fetchDeleteProduct } from '../../fetch/products';
import { useState } from 'react';
import { products } from '@/types/product';
import { router } from '@inertiajs/react';

const ProductList = () => {

    const token = localStorage.getItem('token');
    const [products, setProducts] = useState<products | undefined>(undefined);

    useEffect(() => {
        if (token) {
            fetchProducts(token).then((response) => {
                setProducts(response);
            });
        }
    }, []);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        router.get(`/products/edit/${id}`)
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        if (confirm('Etes vous sûr de vouloir supprimer ce produit? Cette action est irréversible.') && token && id) {
            const response = await fetchDeleteProduct(token, String(id))
            if (response.ok && response.status === 200) {
                console.log('deleted!');
                router.visit('/products');
            }
        }
    };

    return (
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Product List</h1>
            <div className="overflow-x-auto">
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gray-800 mb-4 hover:scale-105 hover:cursor-pointer" onClick={() => router.get('/products/create')}>
                    Create Product
                </button>
                <table className="min-w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className='px-4 py-2'>Image</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2">Color</th>
                            <th className="px-4 py-2">Sizes</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ?
                            products.map((product) => (
                                <tr key={product.id} className="bg-gray-100 hover:bg-gray-200">
                                    <td className="px-4 py-2">
                                        {product.image_url ?
                                            <img src={product.image_url} alt="product image" className="w-20 h-20 rounded-md" /> :
                                            <p>No image</p>
                                        }
                                    </td>
                                    <td className="px-4 py-2">{product.title}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2 text-center">{product.price}</td>
                                    <td className="px-4 py-2 text-center">{product.stock}</td>
                                    <td className="px-4 py-2">{product.color}</td>
                                    <td className="px-4 py-2">{product.sizes}</td>
                                    <td className="px-4 py-2 flex justify-center items-center">
                                        <button className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:scale-105 hover:cursor-pointer" onClick={(e) => handleEdit(e, product.id)}>
                                            Edit
                                        </button>
                                        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:scale-105 hover:cursor-pointer" onClick={(e) => handleDelete(e, product.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={7} className="text-center">
                                    <h2 className="text-3xl font-bold text-gray-800 my-8">No products found</h2>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
