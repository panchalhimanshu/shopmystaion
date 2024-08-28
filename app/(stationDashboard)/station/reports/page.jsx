"use client"
import { Dot, Minus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const report = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-2xl bold">REPORTS</div>
      </div>
      <div className="border border-gray-350 rounded-sm ">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-blue-950 dark:text-white">
            Inventory Reports
          </p>
          <Minus size={20} />
        </div>

        <div className="grid grid-cols-4 p-2">
            <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/getDailyStock`)} >
              <Dot /> GetDailyStock
            </div>

          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/getDailyInventory`)} >
            <Dot /> GetDailyInventory
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/getDailyDispatch`)} >
            <Dot /> DailyDispatch
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/lowWastage`)} >
            <Dot /> LowWastage
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/topWastage`)} >
            <Dot /> TopWastage
          </div>
        </div>
      </div>

      <div className="border border-gray-350 rounded-sm mt-5">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-blue-950 dark:text-white">
            Sales Reports
          </p>
          <Minus size={20} />  
        </div>
        <div className="grid grid-cols-4 p-2">
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/locationWiseSales`)} >
            <Dot /> LocationWiseSales
          </div>

          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/lowestSellingDay`)} >
            <Dot />
            LowestSellingDay
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/highestSellingDay`)} >
            <Dot /> HighestSellingDay
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/getProductWiseSale`)} >
            <Dot /> GetProductWiseSale
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/getDailySalesReport`)} >
            <Dot /> Daily Sales Report
          </div>
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/getTopProducts`)} >
            <Dot /> Top Products
          </div>
        </div>
      </div>

      <div className="border border-gray-350 rounded-sm mt-5">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-blue-950 dark:text-white">
          Category Reports
          </p>
          <Minus size={20} />  
        </div>
        <div className="grid grid-cols-4 p-2">
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/lowCategory`)} >
            <Dot /> LowCategory
          </div>

          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/topCategory`)} >
            <Dot />
            TopCategory
          </div>
        </div>
      </div>

      <div className="border border-gray-350 rounded-sm mt-5">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-blue-950 dark:text-white">
          Orders Reports
          </p>
          <Minus size={20} />  
        </div>
        <div className="grid grid-cols-4 p-2">
          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push(`/station/reports/ordersReport`)}>
            <Dot /> GetOrders
          </div>

          <div className="border border-orange-400 flex m-1 cursor-pointer" onClick={()=>router.push('/station/reports/getOrdersItem')}>
            <Dot />
            GetOrdersItem
          </div>
        </div>
      </div>
    </>
  );
}

export default report