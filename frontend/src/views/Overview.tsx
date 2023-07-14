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

const Overview: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/drug");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };
    fetchInventoryItems();
  }, []);
  return (
    <div>
      <div className="flex justify-left mt-8">
        <div className="w-1/4">
          <MedicationAvailability medications={items} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
