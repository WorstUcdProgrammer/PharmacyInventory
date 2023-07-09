import React, { useEffect, useState } from 'react';
import PatientInfo from './PatientInfo';

interface InventoryItem {
  _id: string;
  name: string;
  number: string;
}

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/patient');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };
    fetchInventoryItems();
  }, []);

  return (
    <div className="bg-gray-800 p-4">
      <PatientInfo items={items} />
    </div>
  );
};

export default Inventory;