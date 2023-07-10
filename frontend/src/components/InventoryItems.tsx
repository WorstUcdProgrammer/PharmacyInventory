import React, { useState } from "react";

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
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [showOrderOverlay, setShowOrderOverlay] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [orderItemId, setOrderItemId] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [maxOrder, setMaxOrder] = useState<string>("");

  const handleDeleteClick = (id: string) => {
    setDeleteItemId(id);
    setShowDeleteOverlay(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      // delete here
    }
    setShowDeleteOverlay(false);
    setDeleteItemId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteOverlay(false);
    setDeleteItemId(null);
  };

  const handleOrderClick = (id: string, num: string) => {
    setOrderItemId(id);
    setOrderQuantity(null);
    setShowOrderOverlay(true);
    setMaxOrder(num);
  };

  const handleConfirmOrder = () => {
    if (orderItemId && orderQuantity) {
      // order here
    }
    setShowOrderOverlay(false);
    setOrderItemId(null);
    setOrderQuantity(null);
    setPatientId(null);
    setMaxOrder("");
  };

  const handleCancelOrder = () => {
    setShowOrderOverlay(false);
    setOrderItemId(null);
    setOrderQuantity(null);
    setPatientId(null);
    setMaxOrder("");
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
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() =>
                    handleOrderClick(item._id, String(item.quantity))
                  }
                >
                  Order
                </button>
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
      {showDeleteOverlay && (
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
      {showOrderOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-80 bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Place order</h3>
            <div className="mb-4">
              <label className="block text-gray-700">ID</label>
              <p>{orderItemId}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Patient ID</label>
              <input
                type="text"
                value={patientId || ""}
                onChange={(e) => setPatientId(String(e.target.value))}
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Quantity({maxOrder} in stock)
              </label>
              <input
                type="number"
                value={orderQuantity || 0}
                onChange={(e) => setOrderQuantity(String(e.target.value))}
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                min={1}
                max={maxOrder}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmOrder}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCancelOrder}
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
