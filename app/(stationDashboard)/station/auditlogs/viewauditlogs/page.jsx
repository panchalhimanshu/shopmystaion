import { Button } from '@/components/ui/button';
import { Plus, Undo } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Switch } from "@/components/ui/switch";

function viewauditlogs() {
  return (
    <div>
         <form className="max-w-7xl mx-auto p-6 bg-white dark:bg-black rounded-md shadow-md">
      <div className='flex justify-between items-center mb-6'>
        <div className='text-orange-500 text-2xl bold'>View log entry details</div>
        <Link href={"/station/auditlogs"}>     <Button color="warning" className="shadow-md">
          <Undo size={20} className="pr-1" />
          Back
        </Button> </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="productName" className="w-1/4 font-medium dark:text-white text-gray-700">Log level :</label>
          <div> Error</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="shortDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Short message :</label>
          <div> Assigned on Order Total</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Full message :</label>
          <div>Aashirvaad Superior MP Atta is Made with Love in India</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="sku" className="w-1/4 font-medium dark:text-white text-gray-700">IP address :</label>
          <div>157.55.39.11</div>
        </div>


        <div className="flex items-center space-x-4">
          <label htmlFor="categories" className="w-1/4 font-medium dark:text-white text-gray-700">User :</label>
          <div>Guest </div>

        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="manufactures" className="w-1/4 font-medium dark:text-white text-gray-700">Page URL :</label>
          <div>www.sample.html/products/grocery </div>
        </div>
        <div className="flex space-x-4">
          <label htmlFor="published" className="w-1/4 font-medium dark:text-white text-gray-700">Created on :</label>
          <div>2/22/2024 1:23:13 PM </div>
        </div>
       
       

</div><div className='flex justify-between item-center font-semibold bg-white dark:bg-black mt-5 p-3  ' style={{boxShadow:"5px 5px 5px gray "}}>
    <div className='pt-3 text-1xl'>Products</div>
           <Button color="" className="bg-white text-black">
            <Plus size={20} className="" />
          </Button>
    </div>

{/* <div className='flex justify-end'>
     <button type="submit" className="mt-6 me-3  px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none ">Cancel</button> 
      <button type="submit" className="mt-6  px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none " >Save</button>
      </div> */}

</form>
    </div>
  )
}

export default viewauditlogs