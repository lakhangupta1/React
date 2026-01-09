import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import ProductForm from './ProductForm';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './productsSlice';

export default function AdminProducts(){
  const dispatch = useDispatch();
  const { items, status } = useSelector((s)=>s.products || { items: [], status: 'idle' });
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(()=>{ dispatch(fetchProducts()); document.title = 'Admin - Products';}, [dispatch]);

  const handleCreate = async (data)=>{
    await dispatch(createProduct(data));
    setCreating(false);
  };

  const handleUpdate = async (data)=>{
    if (!editing) return;
    await dispatch(updateProduct({ id: editing.id, payload: data }));
    setEditing(null);
  };

  return (
    <Sidebar>
      <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin - Products</h1>
            <div>
              <button onClick={()=>setCreating(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">+ Create Product</button>
            </div>
          </div>

          {creating && (
            <div className="bg-white dark:bg-gray-800 rounded p-4 mb-6">
              <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Create Product</h3>
              <ProductForm onSubmit={handleCreate} onCancel={()=>setCreating(false)} />
            </div>
          )}

          {editing && (
            <div className="bg-white dark:bg-gray-800 rounded p-4 mb-6">
              <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Edit Product</h3>
              <ProductForm initial={editing} onSubmit={handleUpdate} onCancel={()=>setEditing(null)} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p)=> (
              <div key={p.id} className="bg-white dark:bg-gray-800 rounded p-4">
                <img src={p.image || '/placeholder-product.png'} alt={p.title} className="w-full h-40 object-cover rounded mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white">{p.title}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">${p.price} • Stock: {p.stock}</div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{p.description}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={()=>setEditing(p)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={()=>dispatch(deleteProduct(p.id))} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
