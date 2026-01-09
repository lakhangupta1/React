import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { clearCart } from './cartSlice';

export default function Checkout(){
  const { items } = useSelector((s)=>s.cart || { items: [] });
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);

  const handlePlaceOrder = () => {
    // This is a mock checkout. Integrate with your backend/payment provider.
    alert('Order placed! Total: $' + total);
    dispatch(clearCart());
  };

  return (
    <Sidebar>
      <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>
          <div className="space-y-4">
            {items.map(it=> (
              <div key={it.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{it.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Qty: {it.qty} • ${it.price}</div>
                </div>
                <div className="font-bold text-gray-800 dark:text-white">${(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xl font-bold">Total: ${total}</div>
            <button onClick={handlePlaceOrder} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Place Order</button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
