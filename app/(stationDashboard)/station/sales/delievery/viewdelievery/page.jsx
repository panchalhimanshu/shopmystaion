import { Button } from '@/components/ui/button'
import { Plus, Undo } from 'lucide-react'
import React from 'react'
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';


function viewdelievery() {
  return (
    <div>
<div className="max-w-7xl mx-auto p-6 bg-white dark:bg-black   rounded-md shadow-md">
    <div className='flex justify-between items-center mb-6'>
    <div className='text-orange-500 text-2xl bold'>View shipment details - 50</div>
     
    <Link href={"/station/sales/delievery"}>    <Button color="warning" className="shadow-md">
           <Undo size={25} className="pr-1 text-2xl" />
           Back
          </Button>  </Link>
    </div>
      <div className="grid grid-cols-1 gap-4  ">

        <div className="flex items-center space-x-4">
          <label htmlFor="productName" className="w-1/4 font-semibold dark:text-white text-gray-700">ORDER #  </label>
            <div>hello</div>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-semibold dark:text-white text-gray-700">TRACKING # </label>
         <div>jdj</div>
         <div className='ms-10'>  <button className='px-3 py-2 ms-10 text-1xl bg-[#11357C] text-white '> Set Tracking number</button> </div>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-semibold dark:text-white text-gray-700">Admin comment </label>
         <div>jdj</div>
         <div className='ms-10'>  <button className='px-3 py-2 ms-10 text-1xl bg-[#11357C] text-white '> Set Tracking number</button> </div>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-semibold dark:text-white text-gray-700">Total weight </label>
         <div>jdj</div>
         <div className='ms-10'>  <button className='px-3 py-2 ms-10 text-1xl bg-[#11357C] text-white '> Set Tracking number</button> </div>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-semibold dark:text-white text-gray-700">DATE OF SHIPPING </label>
         <div>jdj</div>
         <div className='ms-10'>  <button className='px-3 py-2 ms-10 text-1xl bg-[#11357C] text-white '> edit</button> </div>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-semibold dark:text-white text-gray-700">Date delivered </label>
         <div>jdj</div>
         <div className='ms-10'>  <button className='px-3 py-2 ms-10 text-1xl bg-[#11357C] text-white '> Set Tracking Delivered</button> </div>
        </div>

        
      </div>

    
    </div>



    <div className='flex justify-between item-center font-semibold bg-white dark:bg-black mt-2 p-3'>
    <div className='pt-3 text-1xl'>Products</div>
           <Button color="" className="bg-white text-black">
            <Plus size={20} className="" />
          </Button>
    </div>

    </div>
  )
}

export default viewdelievery