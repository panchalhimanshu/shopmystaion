"use client"
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const stationDetail = () => {
    const router = useRouter();
    return (
      <>
        <div className=" justify-between flex gap-1 pb-3 ">
          <div className="text-2xl text-orange-400">Add Station</div>
          <Button
            color="warning"
            onClick={() => router.push("/admin/station/list")}
          >
            <Undo2 className="mr-2" />
            Back
          </Button>
        </div>

        <div className="ml-24">
          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              Station Name:
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">Station 1</p>
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              Station Location{" "}
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">Ahmedabad</p>
          </div>

          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              Station User ID
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">wh0015</p>
          </div>

          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              Warehouse Name
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">Warehouse 1</p>
          </div>

          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              {" "}
              Manger Name
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">Jay</p>
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              Password :
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">********</p>
          </div>

          <div className="flex items-center mb-4">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              Confirm Password :
            </label>
            <p className="text-blue-900 dark:text-gray-300 ml-4">********</p>
          </div>

          <div className="flex items-center mb-2">
            <label className="w-1/6 font-bold mr-2 text-blue-950 dark:text-white">
              isActive
            </label>
            <div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div class="relative w-11 h-6 bg-orange-600-200 rounded-full peer border border-black peer-focus:ring-4 peer-focus:ring-blue-950 dark:peer-focus:ring-blue-950-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-blue-950 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-orange-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-950 peer-checked:bg-blue-950"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href={"/admin/station/list/editStation"}>
            <Button className="bg-blue-950 mx-1">Edit Details</Button>
          </Link>

          <Button color="destructive">Delete Warehouse</Button>
        </div>
      </>
    );
}

export default stationDetail