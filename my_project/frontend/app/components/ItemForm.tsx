'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ItemForm() {
  const [newItem, setNewItem] = useState('');
  const router = useRouter();

  const addItem = async () => {
    if (!newItem) return;

    try {
      const res = await fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem }),
      });

      if (!res.ok) {
        throw new Error('Failed to add item');
      }

      // ページをリフレッシュして最新のデータを取得
      router.refresh();
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
      // エラーハンドリング (トーストや alert などを追加)
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter new item"
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}
