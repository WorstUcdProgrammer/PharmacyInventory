import React, { useEffect, useState } from 'react';
import InventoryItems from './InventoryItems';

interface InventoryItem {
  _id: string;
  name: string;
  type: string;
  mgPerUnit: number;
  unitPerDose: number;
  dosePerDay: number;
  maxiDosePerDay: number;
  productionDate: string;
  expirationDate: string;
  quantity: number;
  cost: number;
  price: number;
}

const ITEMS_PER_PAGE = 10;

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/drug');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };
    fetchInventoryItems();
  }, []);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-800 p-4">
      <InventoryItems items={currentItems} />
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-2 px-4 py-2 rounded-md ${
              currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Inventory;