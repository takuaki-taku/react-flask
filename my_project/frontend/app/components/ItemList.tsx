// app/components/ItemList.tsx
'use client';

import { useState } from 'react';

interface ItemListProps {
  initialItems: string[];
}

export default function ItemList({ initialItems }: ItemListProps) {
  const [items, setItems] = useState<string[]>(initialItems);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}