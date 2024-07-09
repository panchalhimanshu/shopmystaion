"use client"
import { Button } from '@/components/ui/button'
import { Plus, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const editCategory = () => {
    const router = useRouter();
    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <div className='text-orange-500 text-2xl bold font-extrabold'>Edit category details - Computers</div>

                <Button color="warning" className="shadow-md" onClick={() => router.push("/admin/Catalogue/Category")}>
                    <Undo2 size={30} className="pr-1" />
                    Back
                </Button>
            </div>
            <div class="border border-gray-300 p-4">
                <div className='flex justify-between items-center mb-6 border-b border-gray-300'>
                    <div className='text-orange-500 text-2xl bold '>Category info</div>
                </div>
                <div className="ml-20">
                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Name</label>
                        <p className='text-end text-blue-900 dark:text-gray-300'>Computers</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Description</label>
                        <p className='text-end text-blue-900 dark:text-gray-300'>File Edit View Insert Format Tools Table</p>
                    </div>

                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Parent category</label>
                        <p className='text-end text-blue-900 dark:text-gray-300'>None</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Picture</label>
                        <img />
                    </div>
                </div>

            </div>

            <div className=' border mt-7 border-gray-300 flex justify-between items-center'><div className='text-orange-500 text-xl bold p-2 '>Display</div><Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-blue-950 dark:text-white  dark:text-white"><Plus size={30} /></Button></div>

            <div className=' border mt-7 border-gray-300 flex justify-between items-center'><div className='text-orange-500 text-xl bold p-2 '>Mappings</div><Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-blue-950 dark:text-white  dark:text-white"><Plus size={30} /></Button></div>
            <div className=' border mt-7 border-gray-300 flex justify-between items-center'><div className='text-orange-500 text-xl bold p-2 '>SEO</div><Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-blue-950 dark:text-white  dark:text-white"><Plus size={30} /></Button></div>
            <div className=' border mt-7 border-gray-300 flex justify-between items-center'><div className='text-orange-500 text-xl bold p-2 '>Products</div><Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-blue-950 dark:text-white  dark:text-white"><Plus size={30} /></Button></div>

        </>
    )
}

export default editCategory