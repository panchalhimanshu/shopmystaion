import { Button } from "@/components/ui/button";
import { Plus, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Switch } from "@/components/ui/switch";

function viewrequest() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          SKU Request
        </div>
      </div>

      <form className="max-w-xl  p-6  ">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 justify-between">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="productName"
                className="w-1/2 font-medium dark:text-white text-gray-700"
              >
                Name :
              </label>
              <lable className="flex-grow p-2 ">hi</lable>
            </div>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="gtin"
                className="w-1/2 font-medium dark:text-white text-gray-700"
              >
                Status :
              </label>
              <lable className="flex-grow p-2 ">hi</lable>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Images :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Description :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Keywords:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Price :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Specification :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          {/* Additional Fields */}
        </div>
      </form>
      <div className="flex justify-end">
        <div>
          <Link href="/station/Catalogue/Products/skurequest">
            <Button className="text-white bg-blue-950 mr-3 ">
              Edit Request
            </Button>
          </Link>

          <Button className="text-white bg-red-500">Delete Request</Button>
        </div>
      </div>
    </div>
  );
}

export default viewrequest;
