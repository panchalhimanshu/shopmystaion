import { Button } from '@/components/ui/button'
import React from 'react'

const profile = () => {
    return (
        <>
            <div className='flex '>
                <h1 className="text-[20px] pl-2 font-semibold mb-4 text-orange-400">Profile</h1>
            </div>
            <div className='grid grid-cols-2' >
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-medium mr-2">Name</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded w-3/4"
                        placeholder="Enter Name"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-medium mr-2">Station</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded w-3/4"
                        placeholder="Enter station"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-medium mr-2">User ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded w-3/4"
                        placeholder="Enter UserID"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-medium mr-2">Warehouse</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded w-3/4"
                        placeholder="Enter Warehouse "
                    />
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-medium mr-2">Email ID</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded w-3/4"
                        placeholder="Enter EmailID"
                    />
                </div>
            </div>
            <div className='text-center mt-3'>
                <Button className="bg-orange-400">Update Profile</Button>
            </div>
        </>
    )
}

export default profile