

import { Button } from "@/components/ui/button";
import { Plus, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Switch } from "@/components/ui/switch";

function viewauditlogs() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          VIEW LOG ENTRY DETAILS{" "}
        </div>
        <Link href="/warehouse/auditlogs">
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
              Log level :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Short message :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Full message :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              IP address :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              User :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="productName"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Page URL :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>

          {/* Additional Fields */}

          <div className="flex items-center space-x-4">
            <label
              htmlFor="gtin"
              className="w-1/4 font-medium dark:text-white text-gray-700"
            >
              Created on :
            </label>
            <lable className="flex-grow p-2 ">hi</lable>
          </div>
        </div>
      </form>
    </div>
  );
}

export default viewauditlogs;
