"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import React from 'react'

const addWarehouse = () => {
    const router = useRouter();

    const handlecancelBtn =(e)=>{
        e.preventDefault();
        router.push("/admin/Warehouse/list")
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        router.push("/admin/Warehouse/list")
    }
    return (
        <>
            <div className='text-2xl text-orange-400'>
                Add Warehouse
            </div>

            <div className='text-center' >
                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Warehouse Name*</label>
                        <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Enter Warehouse Name"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Warehouse Location*</label>
                        <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Enter Warehouse Location"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Warehouse User ID</label>
                        <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Warehouse User ID"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Manger Name</label>
                        <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Enter Manger Name"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Password*</label>
                        <input
                            type="password"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Enter password "
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Confirm Password*</label>
                        <input
                            type="password"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="flex items-center mb-2">
                        <label className="w-1/6 font-medium mr-2">isActive</label>
                        <div>
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" />
                                <div class="relative w-11 h-6 bg-orange-600-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-950 border border-black dark:peer-focus:ring-blue-950-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-blue-950 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-orange-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-950 peer-checked:bg-blue-950"></div>
                            </label>
                        </div>
                    </div>


                </div>
                <div className='text-center'>
                    <Button className="text-white bg-blue-950 m-1" onClick={handlecancelBtn}>
                        Cancel
                    </Button>
                    <Button className="text-white bg-orange-400" onClick={handleSubmit}>Save</Button>
                </div>
        </>
    )
}

export default addWarehouse