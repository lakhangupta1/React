import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { addToCart } from './cartSlice';
import { fetchProducts } from './productsSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.products || { items: [] });
  const product = items.find((p) => p.id === id);

  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
    document.title = product ? `${product.title} - Shop` : 'Product - Shop';
  }, [dispatch, items, product]);

  if (!product) return (
    <Sidebar>
      <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">Product not found</div>
      </div>
    </Sidebar>
  );

  return (
    <Sidebar>
      <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={product.image || '/placeholder-product.png'} alt={product.title} className="w-full md:w-1/3 h-64 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{product.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</p>
              <div className="mt-4 text-xl font-bold text-gray-800 dark:text-white">${product.price}</div>
              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => dispatch(addToCart({ product }))} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
