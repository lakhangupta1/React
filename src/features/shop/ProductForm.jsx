import React, { useState, useEffect } from 'react';

export default function ProductForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    ...initial,
  });

  const [preview, setPreview] = useState(initial.image || '');

  useEffect(()=>{
    setForm((f)=>({ ...f, ...initial }));
    setPreview(initial.image || '');
  }, [initial]);

  const handle = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);
      setForm({ ...form, image: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      image: form.image || preview || '',
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{initial && initial.id ? 'Edit Product' : 'Create Product'}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Provide the details for the product. Images can be uploaded or a remote URL can be used.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input value={form.title} onChange={handle('title')} className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Classic Cotton Tee" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (USD)</label>
              <input type="number" value={form.price} onChange={handle('price')} className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
              <input type="number" value={form.stock} onChange={handle('stock')} className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea value={form.description} onChange={handle('description')} rows={6} className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Short description for product listing" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-900">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3l-4 4m0 0L8 3m4 4V0" /></svg>
                Upload
              </label>
              <input value={form.image && !form.image.startsWith('data:') ? form.image : ''} onChange={handle('image')} placeholder="Or paste image URL" className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
            {preview && (
              <div className="mt-3">
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex items-center justify-center">
                  <img src={preview} alt="preview" className="object-contain h-full" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Actions</label>
            <div className="flex items-center gap-2 mt-2">
              <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">Save Product</button>
              <button type="button" onClick={onCancel} className="inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
