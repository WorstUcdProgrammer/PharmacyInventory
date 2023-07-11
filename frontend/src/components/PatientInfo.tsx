import React, { useState } from "react";

interface PatientInfomation {
  _id: string;
  name: string;
  number: string;
}

interface PatientInfoProps {
  items: PatientInfomation[];
  refreshPage: () => Promise<void>;
}

interface FormData {
  name: string | null;
  number: string | null;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ items, refreshPage }) => {
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: null,
    number: null,
  });

  const handleAddClick = () => {
    setShowAddOverlay(true);
  };

  const handleConfirmAdd = async () => {
    try {
      const response = await fetch("http://localhost:5000/patient/", {
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
    setFormData({
      name: null,
      number: null,
    });
    setShowAddOverlay(false);
  };

  const handleCancleAdd = () => {
    setFormData({
      name: null,
      number: null,
    });
    setShowAddOverlay(false);
  };

  const handleEditClick = (id: string, name: string, number: string) => {
    setEditItemId(id);
    setFormData({
      name: name,
      number: number,
    });
    setShowEditOverlay(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/patient/" + editItemId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
    setEditItemId(null);
    setFormData({
      name: null,
      number: null,
    });
    setShowEditOverlay(false);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setFormData({
      name: null,
      number: null,
    });
    setShowEditOverlay(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteItemId(id);
    setShowDeleteOverlay(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        const response = await fetch(
          "http://localhost:5000/patient/" + deleteItemId,
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
    setDeleteItemId(null);
    setShowDeleteOverlay(false);
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setShowDeleteOverlay(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="realtive">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">id</th>
            <th className="text-left px-4 py-2">name</th>
            <th className="text-left px-4 py-2">number</th>
            <th className="text-left px-4 py-2 flex justify-end">
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                onClick={handleAddClick}
              >
                Add Patient
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="border-t px-4 py-2">{item._id}</td>
              <td className="border-t px-4 py-2">{item.name}</td>
              <td className="border-t px-4 py-2">{item.number}</td>
              <td className="border-t px-4 py-2 flex justify-end">
                <button
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mr-2 px-4 py-2 rounded"
                  onClick={() =>
                    handleEditClick(item._id, item.name, item.number)
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Patient</h3>
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
              <div>
                <label className="block text-gray-700">Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number || ""}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
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
      {showEditOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Edit the patient information
            </h3>
            <div className="flex mb-4">
              <div>
                <label className="block text-gray-700">Patient id</label>
                <p>{editItemId}</p>
              </div>
            </div>
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
              <div>
                <label className="block text-gray-700">Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number || ""}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmEdit}
              >
                Submit
              </button>
              <button
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete this patient?
            </p>
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
    </div>
  );
};

export default PatientInfo;
