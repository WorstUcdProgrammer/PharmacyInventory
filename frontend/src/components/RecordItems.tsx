import React, { useState } from "react";

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

interface RecordItemsProps {
  items: RecordItem[];
  refreshPage: () => Promise<void>;
}

const RecordItems: React.FC<RecordItemsProps> = ({ items, refreshPage }) => {
  const parseDate = (str: string) => {
    const byDot: string[] = str.split(".");
    const byT: string[] = byDot[0].split("T");
    return byT.join(" - ");
  };

  return (
    <div className="relative">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">id</th>
            <th className="text-left px-4 py-2">drug id</th>
            <th className="text-left px-4 py-2">type</th>
            <th className="text-left px-4 py-2">mgPerUnit</th>
            <th className="text-left px-4 py-2">cost</th>
            <th className="text-left px-4 py-2">price</th>
            <th className="text-left px-4 py-2">quantity</th>
            <th className="text-left px-4 py-2">time</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="border-t px-4 py-2">{item._id}</td>
              <td className="border-t px-4 py-2">{item.drug}</td>
              <td className="border-t px-4 py-2">{item.type}</td>
              <td className="border-t px-4 py-2">{item.mgPerUnit}</td>
              <td className="border-t px-4 py-2">{item.cost}</td>
              <td className="border-t px-4 py-2">{item.price}</td>
              <td className="border-t px-4 py-2">{item.quantity}</td>
              <td className="border-t px-4 py-2">{parseDate(item.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordItems;
