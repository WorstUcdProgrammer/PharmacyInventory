import React, { useEffect, useState } from "react";
import MedicationAvailability from "../components/MedicationAvailability";

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

interface RecordItem {
  _id: string;
  drug: string;
  type: string;
  mgPerUnit: number;
  cost: number;
  price: number;
  quantity: number;
  time: string;
}

const Overview: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [histories, setHistories] = useState<RecordItem[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [responseItem, responseHistory] = await Promise.all([
          fetch("http://localhost:5000/drug"),
          fetch("http://localhost:5000/history"),
        ]);
        const dataItem = await responseItem.json();
        const dateHistory = await responseHistory.json();
        setItems(dataItem);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);
  return (
    <div>
      <div className="flex justify-left mt-8">
        <div className="w-1/4">
          <h2 className="text-center">Low Stock Medication</h2>
          <MedicationAvailability medications={items} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
