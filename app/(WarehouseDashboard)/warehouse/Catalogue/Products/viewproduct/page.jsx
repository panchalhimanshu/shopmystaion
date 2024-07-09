import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function viewproduct() {
  return (
    <div>
      <div className="p-6 rounded-lg shadow-md space-y-2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4 text-orange-500">Product</h2>
          <Link href="/warehouse/Catalogue/Products">
            <Button color="warning" className="shadow-md">
              <Undo size={20} className="pr-1" />
              Back
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">SR. NO</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Product Name :</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">
            Short Description :
          </label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">
            Full Description :
          </label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">SKU :</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Published :</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">
            Reviews allowed :
          </label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Category</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Price</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Manufactures</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Image</label>
          <lable className="w-3/4 mt-1 block p-2 ">hi</lable>
        </div>
        <div className="flex justify-end">
          <Link href={"/station/Catalogue/Products/editproduct"}>
            {" "}
            <button
              type="submit"
              className="mt-6 me-3  px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none "
            >
              Edit Product
            </button>{" "}
          </Link>
          <button
            type="submit"
            className="mt-6  px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none "
          >
            Delete Product
          </button>
        </div>
      </div>

      {/* //////profit cal///// */}
    </div>
  );
}
