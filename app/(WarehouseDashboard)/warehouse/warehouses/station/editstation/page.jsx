import { Button } from "@/components/ui/button";
import { Plus, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Switch } from "@/components/ui/switch";

function editstation() {
  return (
    <div>
      <div className="text-orange-500 text-xl font-semibold p-2">
        Edit Station
      </div>
      <form className="max-w-xl  p-6  ">
        <div className="flex justify-between items-center mb-6">
          {/* <Button color="warning" className="shadow-md">
          <Undo size={20} className="pr-1" />
          Back
        </Button> */}
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Station Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Station Location
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Station User ID
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Manager Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Conform Password
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Fields */}

          <div className="flex items-center space-x-4">
            <label
              htmlFor="gtin"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Is Active
            </label>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href={"/warehouse/warehouses/station"}>
            {" "}
            <button
              type="submit"
              className="mt-6 me-3  px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none "
            >
              Cancel
            </button>{" "}
          </Link>
          <button
            type="submit"
            className="mt-6  px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default editstation;
