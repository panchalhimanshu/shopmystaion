import { Button } from '@/components/ui/button';
import { Plus, Undo } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Switch } from "@/components/ui/switch";

function addofferdiscount() {
  return (
    <div>
         <form className="max-w-7xl mx-auto p-6 bg-white dark:bg-black rounded-md shadow-md">
      <div className='flex justify-between items-center mb-6'>
        <div className='text-orange-500 text-2xl bold'>Add OFFERS & DISCOUNTS</div>
        {/* <Button color="warning" className="shadow-md">
          <Undo size={20} className="pr-1" />
          Back
        </Button> */}
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="productName" className="w-1/4 font-medium dark:text-white text-gray-700">Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="shortDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Discount type</label>
          <select name="" id=""   className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value=""></option>
            <option value="">d</option>
            <option value="">d</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Use percentage</label>
          <input
            type="checkbox"
            id="categories"
            name="categories"
            className=" p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="sku" className="w-1/4 font-medium dark:text-white text-gray-700">Discount Amount</label>
          <input
            type="text"
            id="categories"
            name="categories"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="flex items-center space-x-4">
          <label htmlFor="categories" className="w-1/4 font-medium dark:text-white text-gray-700">Discount Percentage</label>
          <input
            type="number"
            id="categories"
            name="categories"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="manufactures" className="w-1/4 font-medium dark:text-white text-gray-700">Start Date</label>
          <input
            type="date"
            id="manufactures"
            name="manufactures"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <label htmlFor="published" className="w-1/4 font-medium dark:text-white text-gray-700">End Date</label>
          <input
            type="date"
            id="categories"
            name="categories"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Additional Fields */}
        <div className="flex items-center space-x-4">
          <label htmlFor="productTags" className="w-1/4 font-medium dark:text-white text-gray-700">Discount Limitation</label>
          <input
            type="text"
            id="productTags"
            name="productTags"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="gtin" className="w-1/4 font-medium dark:text-white text-gray-700">Is Active</label>
          <div>
                <Switch defaultChecked />
              </div>
        </div>
       

</div><div className='flex justify-between item-center font-semibold bg-white dark:bg-black mt-2 p-3  ' style={{boxShadow:"5px 5px 5px gray "}}>
    <div className='pt-3 text-1xl'>Products</div>
           <Button color="" className="bg-white text-black">
            <Plus size={20} className="" />
          </Button>
    </div>

<div className='flex justify-end'>
      <Link href={"/station/portals/offer&Discount"}>  <button type="submit" className="mt-6 me-3  px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none ">Cancel</button> </Link>
      <button type="submit" className="mt-6  px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none " >Save</button>
      </div>

</form>
    </div>
  )
}

export default addofferdiscount