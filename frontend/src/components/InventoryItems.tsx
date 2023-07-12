import React, { useState } from "react";
import BarCodeGen from "./BarCodeGen";

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
  refreshPage: () => Promise<void>;
}

interface FormData {
  name: string | null;
  type: string | null;
  mgPerUnit: number | null;
  unitPerDose: number | null;
  dosePerDay: number | null;
  maxiDosePerDay: number | null;
  productionDate: string | null;
  expirationDate: string | null;
  quantity: number | null;
  cost: number | null;
  price: number | null;
}

const InventoryItems: React.FC<InventoryItemsProps> = ({
  items,
  refreshPage,
}) => {
  /* The state to control the overlays */
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [showOrderOverlay, setShowOrderOverlay] = useState(false);
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  /* Corresponding variable for overlay fields */
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [orderItemId, setOrderItemId] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [maxOrder, setMaxOrder] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: null,
    type: null,
    mgPerUnit: null,
    unitPerDose: null,
    dosePerDay: null,
    maxiDosePerDay: null,
    productionDate: null,
    expirationDate: null,
    quantity: null,
    cost: null,
    price: null,
  });

  /* Functions to handle add a new drug to inventory */

  const handleAddClick = () => {
    setShowAddOverlay(true);
  };

  const handleConfirmAdd = async () => {
    if (
      formData.name &&
      formData.type &&
      formData.mgPerUnit &&
      formData.unitPerDose &&
      formData.dosePerDay &&
      formData.maxiDosePerDay &&
      formData.productionDate &&
      formData.expirationDate &&
      formData.quantity &&
      formData.cost &&
      formData.price &&
      formData.productionDate < formData.expirationDate
    ) {
      try {
        const response = await fetch("http://localhost:5000/drug/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          await refreshPage();
          console.log("Success");
        } else {
          console.error("Failed to order");
        }
      } catch (error) {
        console.error("An error occured", error);
      }
    }
    setFormData({
      name: null,
      type: null,
      mgPerUnit: null,
      unitPerDose: null,
      dosePerDay: null,
      maxiDosePerDay: null,
      productionDate: null,
      expirationDate: null,
      quantity: null,
      cost: null,
      price: null,
    });
    setShowAddOverlay(false);
  };

  const handleCancleAdd = () => {
    setFormData({
      name: null,
      type: null,
      mgPerUnit: null,
      unitPerDose: null,
      dosePerDay: null,
      maxiDosePerDay: null,
      productionDate: null,
      expirationDate: null,
      quantity: null,
      cost: null,
      price: null,
    });
    setShowAddOverlay(false);
  };

  /* Functions to handle delete a drug from inventory */

  const handleDeleteClick = (id: string) => {
    setDeleteItemId(id);
    setShowDeleteOverlay(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        const response = await fetch(
          "http://localhost:5000/drug/" + deleteItemId,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          await refreshPage();
          console.log("Success");
        } else {
          console.error("Failed to delete");
        }
      } catch (error) {
        console.error("An error occured", error);
      }
    }
    setShowDeleteOverlay(false);
    setDeleteItemId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteOverlay(false);
    setDeleteItemId(null);
  };

  /* Functions to handle order a drug for customer */

  const handleOrderClick = (item: InventoryItem) => {
    setOrderItemId(item._id);
    setOrderQuantity(null);
    setShowOrderOverlay(true);
    setMaxOrder(String(item.quantity));
    setFormData({
      name: item.name,
      type: item.type,
      mgPerUnit: item.mgPerUnit,
      unitPerDose: item.unitPerDose,
      dosePerDay: item.dosePerDay,
      maxiDosePerDay: item.maxiDosePerDay,
      productionDate: item.productionDate,
      expirationDate: item.expirationDate,
      quantity: item.quantity,
      cost: item.cost,
      price: item.price,
    });
  };

  const parseDate = (str: string) => {
    const byDot: string[] = str.split(".");
    const byT: string[] = byDot[0].split("T");
    return byT[0];
  };

  const handleConfirmOrder = async () => {
    if (
      orderItemId &&
      orderQuantity &&
      Number(orderQuantity) <= Number(maxOrder)
    ) {
      try {
        let response1 = await fetch("http://localhost:5000/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient: patientId,
            drug: orderItemId,
            type: formData.type,
            mgPerUnit: formData.mgPerUnit,
            cost: formData.cost,
            price: formData.price,
            quantity: orderQuantity,
          }),
        });
        if (response1.status === 201) {
          console.log(response1.json());
          let response2 = await fetch(
            "http://localhost:5000/drug/" + orderItemId,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ need: -1 * Number(orderQuantity) }),
            }
          );
          if (response2.ok) {
            await refreshPage();
            console.log("Success on order");
          } else {
            console.error("Failed to order");
          }
        } else {
          console.error("Failed to add history");
        }
      } catch (error) {
        console.error("An error occured", error);
      }
    }
    setShowOrderOverlay(false);
    setOrderItemId(null);
    setOrderQuantity(null);
    setPatientId(null);
    setMaxOrder("");
    setFormData({
      name: null,
      type: null,
      mgPerUnit: null,
      unitPerDose: null,
      dosePerDay: null,
      maxiDosePerDay: null,
      productionDate: null,
      expirationDate: null,
      quantity: null,
      cost: null,
      price: null,
    });
  };

  const handleCancelOrder = () => {
    setShowOrderOverlay(false);
    setOrderItemId(null);
    setOrderQuantity(null);
    setPatientId(null);
    setMaxOrder("");
    setFormData({
      name: null,
      type: null,
      mgPerUnit: null,
      unitPerDose: null,
      dosePerDay: null,
      maxiDosePerDay: null,
      productionDate: null,
      expirationDate: null,
      quantity: null,
      cost: null,
      price: null,
    });
  };

  /* Helper function to help set the form data according to user input */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const openOverlay = (id: string) => {
    setIsOverlayOpen(true);
    setImageURL("https://barcodeapi.org/api/128/" + id);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setImageURL("");
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
            <th className="text-left px-12 py-2">
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                onClick={handleAddClick}
              >
                Add Drug
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td
                className="border-t px-4 py-2 cursor-pointer"
                onClick={() => {
                  openOverlay(item._id);
                }}
              >
                {item._id}
              </td>
              <td className="border-t px-4 py-2">{item.name}</td>
              <td className="border-t px-4 py-2">{item.type}</td>
              <td className="border-t px-4 py-2">{item.mgPerUnit}</td>
              <td className="border-t px-4 py-2">{item.unitPerDose}</td>
              <td className="border-t px-4 py-2">{item.dosePerDay}</td>
              <td className="border-t px-4 py-2">{item.maxiDosePerDay}</td>
              <td className="border-t px-4 py-2">
                {parseDate(item.productionDate)}
              </td>
              <td className="border-t px-4 py-2">
                {parseDate(item.expirationDate)}
              </td>
              <td className="border-t px-4 py-2">{item.quantity}</td>
              <td className="border-t px-4 py-2">{item.cost}</td>
              <td className="border-t px-4 py-2">{item.price}</td>
              <td className="border-t px-4 py-2">
                <button
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mr-2 px-4 py-2 rounded"
                  onClick={() => handleOrderClick(item)}
                >
                  Order
                </button>
                <button
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mr-2 px-4 py-2 rounded"
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
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
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
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmOrder}
              >
                Confirm
              </button>
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                onClick={handleCancelOrder}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Add Drug to Inventory
            </h3>
            <div className="flex mb-4">
              <div className="mr-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div className="mr-4">
                <label className="block text-gray-700">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type || ""}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">mgPerUnity</label>
                <input
                  type="number"
                  name="mgPerUnit"
                  value={formData.mgPerUnit || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <label className="block text-gray-700">unitPerDose</label>
                <input
                  type="number"
                  name="unitPerDose"
                  value={formData.unitPerDose || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div className="mr-4">
                <label className="block text-gray-700">dosePerDay</label>
                <input
                  type="number"
                  name="dosePerDay"
                  value={formData.dosePerDay || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">maxiDosePerDay</label>
                <input
                  type="number"
                  name="maxiDosePerDay"
                  value={formData.maxiDosePerDay || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <label className="block text-gray-700">productionDate</label>
                <input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate || ""}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div className="mr-4">
                <label className="block text-gray-700">expirationDate</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate || ""}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                  min={formData.productionDate ? formData.productionDate : ""}
                />
              </div>
              <div>
                <label className="block text-gray-700">quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <label className="block text-gray-700">cost</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || 0}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                  min={formData.productionDate ? formData.productionDate : ""}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmAdd}
              >
                Submit
              </button>
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                onClick={handleCancleAdd}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isOverlayOpen && (
        <BarCodeGen url={imageURL} closeOverlay={closeOverlay} />
      )}
    </div>
  );
};

export default InventoryItems;
