// src/components/CategoryForm.js
import { Button } from "@/components/ui/button";
import { Plus, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoryForm = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl text-orange-500 font-bold mb-4">
          Edit category details - Computers
        </h2>
        <Link href="/warehouse/Catalogue/Categories">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <form className="space-y-6">
        <div className="shadow-md rounded p-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-500 border-b-2">
            Category info
          </h3>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Name</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue="Computers"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Description</label>
            <textarea
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              rows="5"
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Parent category</label>
            <select className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
              <option>None</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Picture</label>
            <div className="flex items-center w-2/3">
              <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                Upload a file
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Remove picture
              </button>
            </div>
          </div>
        </div>

        <div className="shadow-md rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Display</h3>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">
              <input type="checkbox" className="mr-2" />
              Published
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Include in top menu</label>
            <input
              type="number"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue="4"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">
              Allow customers to select page size
            </label>
            <input type="checkbox" className="mt-1 block" />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Page size options</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue="6, 3, 9"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Price range filtering</label>
            <input type="checkbox" className="mt-1 block" />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Enter price range manually</label>
            <input
              type="number"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue="0"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Display order</label>
            <input
              type="number"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <div className="shadow-md rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Mappings</h3>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Discounts</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Limited to customer roles</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Limited to stores</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <div className="shadow-md rounded p-4">
          <h3 className="text-lg font-semibold mb-2">SEO</h3>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">
              Search engine friendly page name
            </label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              defaultValue="computers"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Meta title</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Meta keywords</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block w-1/3">Meta description</label>
            <input
              type="text"
              className="w-3/4 mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        <div className="shadow-md rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <div className="mb-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="w-1/4 px-4 py-2">Product</th>
                  <th className="w-1/4 px-4 py-2">Is featured product</th>
                  <th className="w-1/4 px-4 py-2">Display order</th>
                  <th className="w-1/4 px-4 py-2">View</th>
                  <th className="w-1/4 px-4 py-2">Edit</th>
                  <th className="w-1/4 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2" colSpan="6">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Add a new product
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/warehouse/Catalogue/Categories">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
