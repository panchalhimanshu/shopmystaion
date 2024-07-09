"use client"
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import CallFor from '@/utilities/CallFor'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const customerDetail = ({params}) => {
    const router = useRouter();
      const [data, setData] = useState([]);
      const [role, setRole] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CallFor(
          `v2/users/GetUserById?uid=${params.uid}`,
          "GET",
          null,
          "Auth"
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (params.uid) {
      fetchData();
    }
  }, []);

    return (
      <>
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="text-2xl text-orange-400">New Customers</div>
            <Button
              color="warning"
              onClick={() => router.push("/station/station/customer")}
            >
              <Undo2 size={20} />
              Back
            </Button>
          </div>

          <form className="space-y-4 mt-7">
            <div className="grid grid-cols-2 w-75">
              <div className="flex items-center mb-5">
                <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">First Name</label>
                <p className='text-blue-900 dark:text-white ml-4'> <span className='font-bold'> : </span> {data.firstname}</p>
              </div>
              <div className="flex items-center mb-5">
                <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Last Name</label>
                <p className='text-blue-900 dark:text-white ml-4'> <span className='font-bold'> : </span> {data.lastname}</p>
              </div>
              <div className="flex items-center mb-5">
                <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Phone No</label>
                <p className='text-blue-900 dark:text-white ml-4'> <span className='font-bold'> : </span> {data.mobno}</p>
              </div>
              <div className="flex items-center mb-5">
                <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Email ID</label>
                <p className='text-blue-900 dark:text-white ml-4'> <span className='font-bold'> : </span> {data.emailid}</p>
              </div>
              <div className="flex items-center mb-5">
                <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">Password</label>
                <p className='text-blue-900 dark:text-white ml-4'> <span className='font-bold'> : </span> {data.password}</p>
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="gtin"
                  className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white"
                >
                  Is Active
                </label>
                <p className='text-blue-900 dark:text-white ml-4'> <span className='font-bold'> : </span> Yes</p>
              </div>
            </div>
            {/* <div className='mt-7'> */}
            {/* </div> */}
          </form>
        </div>
      </>
    );
}

export default customerDetail