"use client"
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'

const returDetail = () => {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <div className='text-orange-500 text-2xl font-bold'>Return request details</div>
        <Button className="bg-orange-400" onClick={() => router.push("/admin/Ordering/sales/Returned")}><Undo2 size={20} className='mr-1' />Back</Button>
      </div>
      <div className='ml-16 mt-3' >
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">ID</label>
          <p className="text-blue-900 dark:text-gray-300 ">1154</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Order #</label>
          <p className="text-blue-900 dark:text-gray-300 ">1154</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Customer</label>
          <p className="text-blue-900 dark:text-gray-300 ">admin@yourstore.com</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Product</label>
          <p className="text-blue-900 dark:text-gray-300 ">HTC OneM8Android L5. Lollipop</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Quantity*</label>
          {/* <input type='number' className='border border-blue-950 dark:border-white dark:text-gray-300' /> */}
          <p className="text-blue-900 dark:text-gray-300 ">5</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Quantity returned to stock*</label>
          {/* <input type='number' className='border border-blue-950 dark:border-white dark:text-gray-300' /> */}
          <p className="text-blue-900 dark:text-gray-300 ">1</p>

        </div>
        {/* <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white"> Return request status*</label>
          <select
            className='border border-blue-950 dark:border-white dark:text-gray-300'
          >
            <option>
              Received Wrong Product
            </option>
            <option>
              Received good Product
            </option>
          </select>
        </div> */}
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white"> Return request status*</label>
          {/* <input type='number' className='border border-blue-950 dark:border-white dark:text-gray-300' /> */}
          <p className="text-blue-900 dark:text-gray-300 ">Approved</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Reason for return*</label>
          {/* <input type='text' className='border border-blue-950 dark:border-white dark:text-gray-300' value="Repair" /> */}
          <p className="text-blue-900 dark:text-gray-300 ">Damaged</p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white"> Requested action*</label>
          {/* <input type='text' className='border border-blue-950 dark:border-white dark:text-gray-300' value="Warehouse 1" /> */}
          <p className="text-blue-900 dark:text-gray-300 ">Pick up </p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Customer comments</label>
          {/* <input type='number' className='border border-blue-950 dark:border-white dark:text-gray-300' /> */}
          {/* <textarea className='border border-blue-950 dark:border-white dark:text-gray-300' rows={4} cols={50} /> */}
          <p className="text-blue-900 dark:text-gray-300 ">Received product damaged</p>
        </div>

        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Staff notes</label>
          {/* <input type='number' className='border border-blue-950 dark:border-white dark:text-gray-300' /> */}
          {/* <textarea className='border border-blue-950 dark:border-white dark:text-gray-300' rows={4} cols={50} /> */}
          <p className="text-blue-900 dark:text-gray-300 "> N/A </p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Date</label>
          <p className="text-blue-900 dark:text-gray-300 ">2/2/2022 12:08:59 PM</p>
        </div>
      </div>
    </>
  )
}

export default returDetail