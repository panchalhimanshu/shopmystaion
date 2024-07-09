"use client"
import { Button } from '@/components/ui/button'
import { Box, Plus, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const delieveryDetails = () => {
    const router = useRouter();
    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <div className='text-orange-500 text-2xl font-bold'>View shipment details - 50</div>
                <Button className="bg-orange-400" onClick={() => router.push("/admin/Ordering/sales/delivery")}><Undo2 size={20} className='mr-1' />Back</Button>
            </div>

            <div className='ml-16 mt-3' >
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Order #</label>
                    <p className="text-blue-900 dark:text-gray-300 text-end">1154</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">TRACKING #</label>
                    <p className="text-blue-900 dark:text-gray-300 text-end">05246</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Admin comment</label>
                    <p className="text-blue-900 dark:text-gray-300 text-end">vrutika@osiamart.com</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Total weight</label>
                    <p className="text-blue-900 dark:text-gray-300 text-end">0.00 [lb(s)]</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">DATE OF SHIPPING</label>
                    <p className="text-blue-900 dark:text-gray-300 text-end">20-12-2023  5:07:42 PM</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">Date delivered</label>
                    <p className="text-blue-900 dark:text-gray-300 text-end">Not yet</p>
                </div>
            </div>

            <div className='border border-gray-200 mt-3 text-center '>
                <div className='flex justify-between align-middle p-3'>
                    <div className='flex'>
                        <Box size={15}/>
                        Products
                    </div>

                    <Plus size={30}/>
                </div>
            </div>
        </>
    )
}

export default delieveryDetails