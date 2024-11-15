// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // 型を明示的に定義
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/items');
      
      if (!res.ok) {
        throw new Error('Failed to fetch items');
      }
      
      const data: string[] = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      // エラーハンドリング（オプション）
      alert('アイテムの取得に失敗しました');
    }
  };

  const addItem = async () => {
    // 入力のバリデーション
    if (!newItem.trim()) return;

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

      const data: string = await res.json();
      setItems([...items, data]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
      // エラーハンドリング（オプション）
      alert('アイテムの追加に失敗しました');
    }
  };

  return (
    <div>
      <h1>Next.js + Flask + SQLite</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
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