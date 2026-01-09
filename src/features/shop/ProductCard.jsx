import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
      <Link to={`/shop/${product.id}`} className="block">
        <img src={product.image || '/placeholder-product.png'} alt={product.title} className="w-full h-40 object-cover rounded" />
        <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white">{product.title}</h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 mt-2 flex-1">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800 dark:text-white">${product.price}</div>
        <button onClick={() => dispatch(addToCart({ product }))} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>
    </div>
  );
}
