// ManageItems.tsx
import React, { useEffect, useState } from 'react';
import AddItem from '../pages/AddItem';

type Item = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
};

const ManageItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ✅ This will refresh items from backend
  const fetchItems = async (query = '') => {
  try {
    const res = await fetch(`https://sports-gear-exchange-production.up.railway.app/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setItems(data);
  } catch (error) {
    console.error('Failed to fetch items:', error);
  }
};

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this item?');
    if (!confirm) return;

    const res = await fetch(`https://sports-gear-exchange-production.up.railway.app/items/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Item removed!');
      fetchItems(); // ✅ refresh after deletion
    } else {
      alert('Failed to remove item');
    }
  };

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    fetchItems(searchQuery);
  }, 300); // 300ms debounce for better UX

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Items</h1>

      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full md:w-1/2"
      />

      {/* ✅ AddItem receives the refresh function */}
      <AddItem refreshItems={fetchItems} />
      <AddItem refreshItems={fetchItems} />

      {items.length === 0 ? (
        <p>No items listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {items.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow">
              <img src={item.images[0]} alt={item.title} className="h-40 w-full object-cover rounded mb-2" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-blue-600 font-bold mt-1">₹{item.price}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
};

export default ManageItems;
