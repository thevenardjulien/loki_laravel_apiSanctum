import { useEffect } from 'react';
import { fetchProducts } from '../../fetch/products';
import { useState } from 'react';
import { products } from '@/types/product';

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

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Product List</h1>
            {products && products.map((product) => (
                <div key={product.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                        <div>
                            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Category: {product.category}</p>
                            <p className="text-sm font-medium text-gray-600">Price: {product.price}</p>
                            <p className="text-sm font-medium text-gray-600">Stock: {product.stock}</p>
                            <p className="text-sm font-medium text-gray-600">Color: {product.color}</p>
                        </div>
                        <div>
                            <button className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
