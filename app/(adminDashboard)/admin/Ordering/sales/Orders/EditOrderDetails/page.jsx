"use client"
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const editOrderDetail = () => {
    const router = useRouter();
    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <div className='text-orange-500 text-2xl font-bold'>Edit order details - 1154</div>
                <Button className="bg-orange-400" onClick={()=>router.push("/admin/Ordering/sales/Orders")}><Undo2 size={20} className='mr-1' />Back</Button>
            </div>

            <div className='border border-gray-200 p-3'>
                <div className='border border-gray-200 '>
                    <div className='ml-16 mt-3' >
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order #</label>
                            <p className="text-blue-900 text-end">1154</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Created on</label>
                            <p className="text-blue-900 text-end">2/29/2024 7:57:51 PM</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Customer</label>
                            <p className="text-blue-900 text-end">vrutika@osiamart.com</p>
                        </div>  <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order status</label>
                            <p className="text-blue-900 text-end">Pending</p>
                        </div>
                    </div>
                </div>
                <div className='border border-gray-200 mt-3'>
                    <div className='ml-16  mt-3' >
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order subtotal</label>
                            <p className="text-blue-900 text-end">830.00 excl tax</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order shipping</label>
                            <p className="text-blue-900 text-end">0.00 excl tax</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order tax</label>
                            <p className="text-blue-900 text-end">0.00</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order total</label>
                            <p className="text-blue-900 text-end">830.00</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Profit</label>
                            <p className="text-blue-900 text-end">830.00</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Payment method</label>
                            <p className="text-blue-900 text-end">Cash On Delivery (COD)</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Payment status</label>
                            <p className="text-blue-900 text-end">Pending</p>
                        </div>

                    </div>
                </div>
                <div className='border border-gray-200 mt-3 '>
                    <div className='ml-16 mt-3' >
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Store</label>
                            <p className="text-blue-900 text-end">Osia Hyper Retail Limited</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Order GUID</label>
                            <p className="text-blue-900 text-end">f8fe2376-c3bd-40af-9475-a431bdd92aed</p>
                        </div> <div className="flex items-center mb-4">
                            <label className="w-1/6 font-semibold mr-2 text-blue-950">Customer IP address</label>
                            <p className="text-blue-900 text-end">103.109.78.227</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='border border-gray-200 p-3 '>
                <div className='text-orange-500 text-xl font-medium'>Billing & shipping</div>
                <div className='flex justify-between'>
                    <div className='border border-gray-200 p-4 mr-2 text-start w-1/2'>
                        <div className='text-orange-500 text-lg font-normal'>Billing address</div>
                        <div className='ml-16 mt-3' >
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Full name</label>
                                <p className="text-blue-900 text-end">Erika Dave</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Email</label>
                                <p className="text-blue-900 text-end">vrutika@osiamart.com</p>
                            </div> <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Phone</label>
                                <p className="text-blue-900 text-end">7069011498</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Fax</label>
                                <p className="text-blue-900 text-end"> </p>
                            </div>


                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Company</label>
                                <p className="text-blue-900 text-end"> </p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Address</label>
                                <p className="text-blue-900 text-end">depart mall</p>
                            </div> <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Address</label>
                                <p className="text-blue-900 text-end">depart mall</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">City</label>
                                <p className="text-blue-900 text-end">Ahmedabad</p>
                            </div><div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">County / region</label>
                                <p className="text-blue-900 text-end"> </p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">State / province</label>
                                <p className="text-blue-900 text-end">Gujarat</p>
                            </div> <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Zip / postal code</label>
                                <p className="text-blue-900 text-end">380008</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Country</label>
                                <p className="text-blue-900 text-end">India</p>
                            </div>
                        </div>
                    </div>
                    <div className='border border-gray-200 p-4 w-1/2'>
                        <div className='text-orange-500 text-lg font-normal'>Shipping address</div>
                        <div className='ml-16 mt-3' >
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Full name</label>
                                <p className="text-blue-900 text-end">Erika Dave</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Email</label>
                                <p className="text-blue-900 text-end">vrutika@osiamart.com</p>
                            </div> <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Phone</label>
                                <p className="text-blue-900 text-end">7069011498</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Fax</label>
                                <p className="text-blue-900 text-end"> </p>
                            </div>


                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Company</label>
                                <p className="text-blue-900 text-end"> </p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Address</label>
                                <p className="text-blue-900 text-end">depart mall</p>
                            </div> <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Address</label>
                                <p className="text-blue-900 text-end">depart mall</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">City</label>
                                <p className="text-blue-900 text-end">Ahmedabad</p>
                            </div><div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">County / region</label>
                                <p className="text-blue-900 text-end"> </p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">State / province</label>
                                <p className="text-blue-900 text-end">Gujarat</p>
                            </div> <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Zip / postal code</label>
                                <p className="text-blue-900 text-end">380008</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-1/6 font-semibold mr-2 text-blue-950">Country</label>
                                <p className="text-blue-900 text-end">India</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950">Shipping method</label>
                    <p className="text-blue-900 text-end">Ground</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-semibold mr-2 text-blue-950">Shipping status</label>
                    <p className="text-blue-900 text-end">Not yet shipped</p>
                </div>
            </div>
            <div className='border border-gray-200 p-3 '>
                <div className='text-orange-500 text-xl font-medium'>Shipments</div>
            </div>
        </>
    )
}

export default editOrderDetail