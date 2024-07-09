import { Button } from '@/components/ui/button';
import { Undo } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function seequotation() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          Requisition Details
        </div>
        <Link href="/admin/Ordering/Purchase/Requistion">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 p-3">
        <div className="pb-3">
          <label className="font-bold inline-block w-32 ">Req. Date</label>
          <label className="text-orange-300">00121</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32 ">Due Date</label>
          <label> 10-10-10</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32 ">Warehouse</label>
          <label className="text-orange-300">00121</label>
        </div>
        <div>
          <label className="font-bold inline-block w-36 ">Status</label>
          <label>00121</label>
        </div>
      </div>
      <div>
        <div className="text-2xl text-orange-400 mt-7">Requested Items</div>
        <div className="">
          <table>
            <tbody>
              <div className="grid grid-cols-6">
                <th className="py-3 px-6 text-center">#</th>
                <th className="py-3 px-6 text-center">Select Items</th>
                <th className="py-3 px-6 text-center">Attributes</th>
                <th className="py-3 px-6 text-center">Quoted Quantity</th>
                <th className="py-3 px-6 text-center">Quoted Price</th>
                <th className="py-3 px-6 text-center">Accept Quote</th>
              </div>

              <tr>
                <div className="grid grid-cols-6 ">
                  <td className="py-3 px-6 text-center">1</td>
                  <td className="py-3 px-6 text-center">Blackshirt</td>
                  <td className="py-3 px-6 text-center">size:xl color:black</td>
                  <td className="py-3 px-6 text-center">05</td>
                  <td className="py-3 px-6 text-center">2000</td>
                  <td className="py-3 px-6 text-center">
                    <input type="checkbox" />
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Link href="">
            <Button className="text-white bg-blue-950 mr-3 ">Reject</Button>
          </Link>
          <Link href="/admin/Ordering/Purchase/Requistion">
            {" "}
            <Button className="text-white bg-orange-400">Create PO</Button>
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="font-semibold">Comments</div>
        <div className="mt-2 ">
          Aashirvaad Superior MP Atta is made using the 4-step advantage process
          which ensures pure and natural whole wheat Etta{" "}
        </div>
      </div>
    </div>
  );
}

export default seequotation;