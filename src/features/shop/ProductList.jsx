import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { fetchProducts } from './productsSlice';
import Sidebar from '../../components/Sidebar';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products || { items: [], status: 'idle' });

  useEffect(() => {
    dispatch(fetchProducts());
    document.title = 'Shop - MyApp';
  }, [dispatch]);

  return (
    <Sidebar>
      <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">🛍️ Shop</h1>
          {status === 'loading' && <div>Loading products...</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
