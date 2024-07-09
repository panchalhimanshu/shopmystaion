import { Button } from '@/components/ui/button';
import { Plus, Undo } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Switch } from "@/components/ui/switch";

function viewofferdiscount() {
  return (
    <div>
         <form className="max-w-7xl mx-auto p-6 bg-white dark:bg-black rounded-md shadow-md">
      <div className='flex justify-between items-center mb-6'>
        <div className='text-orange-500 text-2xl bold'>Add OFFERS & DISCOUNTS</div>
        <Link href={"/station/portals/offer&Discount"}>     <Button color="warning" className="shadow-md">
          <Undo size={20} className="pr-1" />
          Back
        </Button> </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="productName" className="w-1/4 font-medium dark:text-white text-gray-700">Name</label>
          <div> WInter offer</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="shortDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Discount type</label>
          <div> Assigned on Order Total</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="fullDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Use percentage</label>
          <div>Yes</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="sku" className="w-1/4 font-medium dark:text-white text-gray-700">Discount Amount</label>
          <div>20 Ruppes </div>
        </div>


        <div className="flex items-center space-x-4">
          <label htmlFor="categories" className="w-1/4 font-medium dark:text-white text-gray-700">Discount Percentage</label>
          <div>20 </div>

        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="manufactures" className="w-1/4 font-medium dark:text-white text-gray-700">Start Date</label>
          <div>20-05-2024 </div>
        </div>
        <div className="flex space-x-4">
          <label htmlFor="published" className="w-1/4 font-medium dark:text-white text-gray-700">End Date</label>
          <div>20-05-2024 </div>
        </div>
        {/* Additional Fields */}
        <div className="flex items-center space-x-4">
          <label htmlFor="productTags" className="w-1/4 font-medium dark:text-white text-gray-700">Discount Limitation</label>
          <div> 20%</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="gtin" className="w-1/4 font-medium dark:text-white text-gray-700">Is Active</label>
          <div> 
            Yes
              </div>
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

export default viewofferdiscount