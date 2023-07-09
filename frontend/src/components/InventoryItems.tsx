import React, { useState } from 'react';

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

interface InventoryItemsProps {
  items: InventoryItem[];
}

const InventoryItems: React.FC<InventoryItemsProps> = ({ items }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setDeleteItemId(id);
        setShowOverlay(true);
      };
    
      const handleConfirmDelete = () => {
        if (deleteItemId) {
          // delete here
        }
        setShowOverlay(false);
        setDeleteItemId(null);
      };
    
      const handleCancelDelete = () => {
        setShowOverlay(false);
        setDeleteItemId(null);
      };

    return (
      <div className="relative">
        <table className="min-w-full bg-white">
        <thead>
            <tr>
            <th className="text-left px-4 py-2">id</th>
            <th className="text-left px-4 py-2">name</th>
            <th className="text-left px-4 py-2">type</th>
            <th className="text-left px-4 py-2">mgPerUnit</th>
            <th className="text-left px-4 py-2">unitPerDose</th>
            <th className="text-left px-4 py-2">dosePerDay</th>
            <th className="text-left px-4 py-2">maxiDosePerDay</th>
            <th className="text-left px-4 py-2">productionDate</th>
            <th className="text-left px-4 py-2">expirationDate</th>
            <th className="text-left px-4 py-2">quantity</th>
            <th className="text-left px-4 py-2">cost</th>
            <th className="text-left px-4 py-2">price</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item) => (
            <tr key={item._id}>
                <td className="border-t px-4 py-2">{item._id}</td>
                <td className="border-t px-4 py-2">{item.name}</td>
                <td className="border-t px-4 py-2">{item.type}</td>
                <td className="border-t px-4 py-2">{item.mgPerUnit}</td>
                <td className="border-t px-4 py-2">{item.unitPerDose}</td>
                <td className="border-t px-4 py-2">{item.dosePerDay}</td>
                <td className="border-t px-4 py-2">{item.maxiDosePerDay}</td>
                <td className="border-t px-4 py-2">{item.productionDate}</td>
                <td className="border-t px-4 py-2">{item.expirationDate}</td>
                <td className="border-t px-4 py-2">{item.quantity}</td>
                <td className="border-t px-4 py-2">{item.cost}</td>
                <td className="border-t px-4 py-2">{item.price}</td>
                <td className="border-t px-4 py-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
            ))}
        </tbody>
        </table>
        {showOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this drug?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    );
};

export default InventoryItems;