import React from "react";

const BUTTON_CLASS = "px-4 py-2 rounded";
const BG_ORANGE_CLASS = "bg-orange-500 text-white";
const BG_RED_CLASS = "bg-red-500 text-white";
const BG_BLUE_CLASS = "bg-blue-500 text-white";
const BG_GREEN_CLASS = "bg-green-500 text-white";
const BG_ZINC_CLASS = "bg-zinc-200 text-zinc-700";

const OrderDetails = () => {
  return (
    <div className="p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">
          Edit order details - 1154
        </h1>
        <div className="space-x-2">
          <button className={`${BG_ZINC_CLASS} ${BUTTON_CLASS}`}>Back</button>
          <button className={`${BG_ORANGE_CLASS} ${BUTTON_CLASS}`}>Save</button>
          <button className={`${BG_GREEN_CLASS} ${BUTTON_CLASS}`}>
            Invoice(PDF)
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow-md space-y-4">
        {/* Order Details Section */}
        {/* Split into smaller components if necessary */}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        {/* Billing & Shipping Section */}
        {/* Split into smaller components if necessary */}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        {/* Shipments Section */}
        {/* Split into smaller components if necessary */}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        {/* Products Section */}
        {/* Split into smaller components if necessary */}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        {/* Order Notes Section */}
        {/* Split into smaller components if necessary */}
      </div>
    </div>
  );
};

export default OrderDetails;

