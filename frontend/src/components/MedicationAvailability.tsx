import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Medication {
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

const MedicationAvailability: React.FC<{ medications: Medication[] }> = ({
  medications,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={medications}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" fill="#1f2937" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MedicationAvailability;
