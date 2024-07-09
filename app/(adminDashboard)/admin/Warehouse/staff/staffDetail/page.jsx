"use client"
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter();
    return (
        <>
            <div className=' justify-between flex gap-1 pb-3 '>
                <div className='text-2xl text-orange-400'>
                    STAFF
                </div>
                <Button color="warning" onClick={() => router.push("/admin/Warehouse/staff")}>
                    <Undo2 className='mr-2' />
                    Back
                </Button>
            </div>

            <div className=' grid grid-cols-2 ml-16' >
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">First Name</label>
                    <p className='text-blue-900 dark:text-white ml-4'>Jay</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Last Name</label>
                    <p className='text-blue-900 dark:text-white ml-4'>Jay</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Email ID</label>
                    <p className='text-blue-900 dark:text-white ml-4'>Jay@shopmystation.com</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Phone No</label>
                    <p className='text-blue-900 dark:text-white ml-4'>********00</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Emp ID</label>
                    <p className='text-blue-900 dark:text-white ml-4'>St0015</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Role</label>
                    <p className='text-blue-900 dark:text-white ml-4'>Employee</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">User ID</label>
                    <p className='text-blue-900 dark:text-white ml-4'>oow115</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Password</label>
                    <p className='text-blue-900 dark:text-white ml-4'>Jay@2024</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white"> Is Active</label>
                    <p className='text-blue-900 dark:text-white ml-4'>Yes</p>
                </div>
            </div>
            <div>
                <div className='text-2xl text-orange-400 m-4'>Roles & Rights</div>

                <div>
                    <table>
                        <tbody>
                            <div className='grid grid-cols-6 gap-16'>
                                <th></th>
                                <th>All</th>
                                <th>Create</th>
                                <th>Read</th>
                                <th>Update</th>
                                <th>Delete</th>

                            </div>
                            <div>
                                <tr className='grid grid-cols-6 gap-16'>
                                    <td className='justify-center'>Station</td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                </tr>
                                <tr className='grid grid-cols-6 gap-16'>
                                    <td>Sales</td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                </tr>
                                <tr className='grid grid-cols-6 gap-16'>
                                    <td>Purchase</td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                </tr>
                                <tr className='grid grid-cols-6 gap-16'>
                                    <td>Catalog</td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                    <td className='justify-center'><input className="ml-5 w-[25px] h-[25px]" type='checkbox' /></td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default page