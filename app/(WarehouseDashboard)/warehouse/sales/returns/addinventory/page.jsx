import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import Link from "next/link";
import React from "react";

function addinventory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          Add to Inventory
        </div>
        <Link href="/warehouse/sales/returns">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 pl-3 pt-3 pb-10">
        <div className="pb-3">
          <label className="font-bold inline-block ">From : </label>
          <label> Station 4</label>
        </div>
        <div>
          <label className="font-bold inline-block ">To : </label>
          <label> 10-10-10</label>
        </div>
        <div>
          <label className="font-bold inline-block ">Received On : </label>
          <label> 25</label>
        </div>
        <div>
          <label className="font-bold inline-block ">Total Quantity : </label>
          <label> 25</label>
        </div>
      </div>
      <div>
        <div className="pl-5 mt-4">
          <table>
            <thead>
              <th className="py-3 px-6 text-center">#</th>
              <th className="py-3 px-6 text-center">Select Product</th>
              <th className="py-3 px-6 text-center">Attributes</th>
              <th className="py-3 px-6 text-center">Total QTY</th>
              <th className="py-3 px-6 text-center">Returned QTY </th>
              <th className="py-3 px-6 text-center">Accept QTY</th>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-6 text-center">1</td>
                <td className="py-3 px-6 text-center">Blackshirt</td>
                <td className="py-3 px-6 text-center">size:xl color:black</td>
                <td className="py-3 px-6 text-center">05</td>
                <td className="py-3 px-6 text-center">4</td>
                <td className="py-3 px-6 text-center">
                  <input className="w-20 border border-black dark:border-white rounded-sm" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Link href="/warehouse/sales/returns">
            <Button className="text-white bg-blue-950 mr-3 ">Cancel</Button>
          </Link>

          <Button className="text-white bg-orange-400">Save</Button>
        </div>
      </div>
    </div>
  );
}

export default addinventory;
