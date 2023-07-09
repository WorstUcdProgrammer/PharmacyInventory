import React from 'react';

interface PatientInfomation {
  _id: string;
  name: string;
  number: string;
}

interface PatientInfoProps {
  items: PatientInfomation[];
}

const PatientInfo: React.FC<PatientInfoProps> = ({ items }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="text-left px-4 py-2">id</th>
          <th className="text-left px-4 py-2">name</th>
          <th className="text-left px-4 py-2">number</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td className="border-t px-4 py-2">{item._id}</td>
            <td className="border-t px-4 py-2">{item.name}</td>
            <td className="border-t px-4 py-2">{item.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientInfo;