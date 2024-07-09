import { Button } from "@/components/ui/button";
import { Plus, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Switch } from "@/components/ui/switch";

function viewstation() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">Station</div>
        <Link href="/warehouse/warehouses/station">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <form className="max-w-xl  p-6  ">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Station Name:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Station Location:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Station User ID:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Manager Name:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Password:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Conform Password:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          {/* Additional Fields */}

          <div className="flex items-center space-x-4">
            <label
              htmlFor="gtin"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Is Active:
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>
        </div>
      </form>
    </div>
  );
}

export default viewstation;
