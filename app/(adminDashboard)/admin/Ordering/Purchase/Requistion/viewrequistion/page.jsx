import { Button } from '@/components/ui/button';
import { Undo } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function viewquotation() {
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
          <label className="font-bold inline-block w-32 ">Station</label>
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
              <div className="grid grid-cols-5 gap-20">
                <th className="py-3 px-6 text-center">#</th>
                <th className="py-3 px-6 text-center">Select Items</th>
                <th className="py-3 px-6 text-center">Attributes</th>
                <th className="py-3 px-6 text-center">Quantity</th>
              </div>

              <tr>
                <div className="grid grid-cols-5 gap-20">
                  <td className="py-3 px-6 text-center">1</td>
                  <td className="py-3 px-6 text-center">Blackshirt</td>
                  <td className="py-3 px-6 text-center">size:xl color:black</td>
                  <td className="py-3 px-6 text-center">05</td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Link href="/admin/Ordering/Purchase/Requistion/Editrequistion">
            <Button className="text-white bg-blue-950 mr-3 ">
              Edit Requisition
            </Button>
          </Link>

          <Button className="text-white bg-orange-400">
            Delete Requisition
          </Button>
        </div>
      </div>
    </div>
  );
}

export default viewquotation;