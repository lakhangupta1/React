import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { removeFromCart, updateQty, clearCart } from './cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items } = useSelector((s) => s.cart || { items: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);

  return (
    <Sidebar>
      <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">🛒 Cart</h1>
          {items.length === 0 ? (
            <div className="p-6 bg-white dark:bg-gray-800 rounded">Your cart is empty. <Link to="/shop" className="text-blue-600">Shop now</Link></div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded p-6">
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-4">
                    <img src={it.image || '/placeholder-product.png'} alt={it.title} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 dark:text-white">{it.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">${it.price} x {it.qty}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <input type="number" value={it.qty} min={1} onChange={(e)=>dispatch(updateQty({id: it.id, qty: Math.max(1, Number(e.target.value))}))} className="w-20 p-1 border rounded" />
                        <button onClick={()=>dispatch(removeFromCart(it.id))} className="text-red-600">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-xl font-bold">Total: ${total}</div>
                <div className="flex items-center gap-3">
                  <button onClick={()=>{dispatch(clearCart());}} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">Clear</button>
                  <button onClick={()=>navigate('/checkout')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Checkout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
