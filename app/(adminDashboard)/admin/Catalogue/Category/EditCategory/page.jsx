"use client"
import { useRouter } from 'next/navigation';


const editCategory = () => {
  const router = useRouter()

  const handleclick = (e) => {
    e.preventDefault()
    router.push("/station/Catalogue/Categories")
  
  }

  return (
    <div>
      <form className="max-w-7xl mx-auto p-6 bg-white dark:bg-black   rounded-md shadow-md">
        <div className='flex justify-between items-center mb-6'>
          <div className='text-orange-500 text-2xl bold'>Categories</div>

          {/* <Button color="warning" className="shadow-md">
           <Plus size={20} className="pr-1" />
           Request SKU
          </Button> */}
        </div>
        <div className="grid grid-cols-1 gap-4  ">
          <div className="flex items-center space-x-4">
            <label htmlFor="productName" className="w-1/4 font-medium dark:text-white text-gray-700">Name*</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="fullDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Description</label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              rows="4"
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">

            <label htmlFor="sku" className="w-1/4 font-medium dark:text-white text-gray-700">Parent Category</label>
            <select className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" >
              <option>hi</option>
            </select>

          </div>
          <div className="flex items-center mb-2">
            <label className="w-1/6 font-medium mr-2">Is Active</label>
            <div>
              <label class="inline-flex items-end cursor-pointer ">
                <input type="checkbox" class="sr-only peer" checked />
                <div class="relative w-11 h-6 bg-orange-600-200 rounded-full peer peer-focus:ring-4 border border-black peer-focus:ring-blue-950 dark:peer-focus:ring-blue-950-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-blue-950 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-orange-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-950 peer-checked:bg-blue-950"></div>
              </label>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type="submit" className="mt-6 me-3  px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none " onClick={(e) => {e.preventDefault();router.push("/admin/Catalogue/Category")}}>Cancel</button>
          <button type="submit" className="mt-6  px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none " onClick={handleclick}>Save</button>
        </div>
      </form>

    </div>
  )
}

export default editCategory