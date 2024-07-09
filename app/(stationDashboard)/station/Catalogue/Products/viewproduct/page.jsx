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
          
          <Link href={"/station/Catalogue/Products"}>
            <Button color="warning">
              <Undo size={20} />
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
      <div className="max-w-5xl mx-auto mt-10  border border-gray-300 rounded-lg overflow-hidden font-sans">
        <h2 className="  text-center py-2 text-xl font-semibold border-b border-gray-300">
          Profit Calculator
        </h2>
        <div className="w-full">
          <div className="flex justify-between p-3 border-b  font-bold">
            <div>Pricing Details</div>
            <div>local</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Listing Price</div>
            <div>5.0000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Shipping Charge to Customer</div>
            <div>0.0000</div>
          </div>
          <div className="flex justify-between p-3  border-b  font-bold ">
            <div>MP Fees</div>
            <div>4.351000000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Commission</div>
            <div className="text-red-500">-0.55000000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Fixed Fee</div>
            <div className="text-red-500">-0.50000000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Shipping Fee</div>
            <div className="text-red-500">-0.05000000</div>
          </div>
          <div className="flex justify-between p-3  border-b  font-bold ">
            <div>GST on MP Fees 18%</div>
            <div>4.351000000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Commission</div>
            <div className="text-red-500">-0.090000000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Fixed Fee</div>
            <div className="text-red-500">-0.009000000</div>
          </div>
          <div className="flex justify-between p-3 border-b border-gray-300">
            <div>Shipping Fee</div>
            <div className="text-red-500">-0.00</div>
          </div>
          <div className="flex justify-between p-3  border-b  font-bold border-t border-gray-300">
            <div>Bank Settlement (Revenue - MP Fees - GST)</div>
            <div>4.351000000</div>
          </div>
          <div className="flex justify-between p-3 border-t border-gray-300">
            <div>Input GST Credits</div>
            <div>0.099000000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
