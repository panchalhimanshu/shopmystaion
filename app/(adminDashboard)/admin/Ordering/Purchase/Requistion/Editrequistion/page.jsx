"use client";
import Link from "next/link";
import React, { useState } from "react";

const sharedClasses = {
  border: "border border-zinc-300 dark:border-zinc-700 rounded p-2",
  button: "p-2 rounded",
};

const EditRequisition = () => {
  const [items, setItems] = useState([{ id: 1 }]); // Initial item

  const handleAddItem = () => {
    const newItemId = items.length + 1;
    setItems([...items, { id: newItemId }]);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div className="p-6 bg-zinc-100 dark:bg-zinc-800 min-h-screen">
      <div className="max-w-7xl mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">
          Create Requisition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center ">
            <label className="text-sm font-medium mb-1 w-1/4">Req. Date</label>
            <input
              type="text"
              className={`${sharedClasses.border} `}
              value="00124"
            />
          </div>
          <div className="flex items-center  ">
            <label className="text-sm font-medium mb-1 w-1/4">Due Date</label>
            <input type="text" className={`${sharedClasses.border} `} />
          </div>
          <div className="flex items-center  ">
            <label className="text-sm font-medium mb-1 w-1/4">Warehouse</label>
            <select className={`${sharedClasses.border} `}>
              <option>Warehouse 1</option>
            </select>
          </div>
          <div className="flex items-center ">
            <label className="text-sm font-medium mb-1 w-1/4">If other</label>
            <input type="text" className={`${sharedClasses.border} `} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-orange-500 mb-4">
          Requested Items
        </h3>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Select Items</th>
              <th className="text-left p-2">Attributes</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <select className={sharedClasses.border}>
                    <option>Black Shirt</option>
                  </select>
                </td>
                <td className="p-2">
                  <select className={sharedClasses.border}>
                    <option>Size: XL</option>
                  </select>
                  <select className={sharedClasses.border}>
                    <option>Color: Black</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    className={`${sharedClasses.border} w-full`}
                    value="05"
                  />
                </td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-green-500 text-white p-2 rounded mb-6"
          onClick={handleAddItem}
        >
          + Add new
        </button>
        <div className="flex justify-end space-x-4">
          <Link href="/admin/Ordering/Purchase/Requistion">
            <button className="bg-zinc-500 text-white p-2 rounded">
              Cancel
            </button>
          </Link>

          <button className="bg-orange-500 text-white p-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditRequisition;
