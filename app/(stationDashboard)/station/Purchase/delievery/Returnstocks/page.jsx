import { Button } from "@/components/ui/button";
import { Delete, Trash, Undo } from "lucide-react";
import Link from "next/link";
import React from "react";

function Returnstocks() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          RETURN STOCK
        </div>
        <Link href="/station/Purchase/delievery">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 p-3">
        <div className="pb-3">
          <label className="font-bold inline-block w-32 ">Warehouse</label>
          <label className="text-orange-300">00121</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32 ">PO No</label>
          <label> 10-10-10</label>
        </div>

        <div>
          <label className="font-bold inline-block w-32 ">Total Quantity</label>
          <label> 10-10-10</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32 ">Delivery Date</label>
          <input
            type="date"
            className="border border-black dark:border-white p-2 bg-transparent "
          />
          {/* <label className="text-orange-300">00121</label> */}
        </div>
      </div>
      <div>
        <div className="py-8 mt-10 mb-7 max-w-4xl">
          <table className=" border-black dark:border-white">
            <thead>
              <th className="py-3 px-6 text-center">Sr. No</th>
              <th className="py-3 px-6 text-center">Select Product</th>
              <th className="py-3 px-6 text-center">Attributes</th>
              <th className="py-3 px-6 text-center"> Quantity in Delivery</th>
              <th className="py-3 px-6 text-center">Returned Quantity</th>
              <th className="py-3 px-6 text-center">ACTION</th>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-6 text-center">1</td>
                <td className="py-3 px-6 text-center">Blackshirt</td>
                <td className="py-3 px-6 text-center">size:xl color:black</td>
                <td className="py-3 px-6 text-center">05</td>
                <td className="py-3 px-6 text-center">
                  <input
                    type="number"
                    className="text-center w-20 bg-transparent border  border-black dark:border-white rounded-sm "
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <Link href="">
                    <Button className="p-0 bg-red-500 hover:bg-[#1f5081] text-white text-sm px-1">
                      <Trash size={20}></Trash>
                      Delete
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <div>
            <Link href="/station/Purchase/delievery">
              <Button className="text-white bg-[#11375C]">Cancel</Button>
            </Link>
            <Link href="">
              <Button color={"warning"} className="text-white ml-2 ">
                save
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returnstocks;
