"use client"
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import CallFor from "@/utilities/CallFor";

const editOrderDetail = ({params}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await CallFor(
          `v2/Orders/GetOrderById?orderid=${params.orderid}`,
          "GET",
          null,
          "Auth"
        );
        setData(response.data);
        console.log(data);// Adjust to match the actual data structure
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-2xl font-bold">
          Edit order details - 1154
        </div>
        <div>
          <Button
            className="bg-blue-950 m-1"
            onClick={() => router.push("/station/sales/order")}
          >
            <Undo2 size={20} className="" />
            Back
          </Button>
          <Button
            className="bg-orange-400 m-1"
            // onClick={() => router.push("/station/sales/order")}
          >
            save
          </Button>
          <Button
            className="bg-green-600"
            // onClick={() => router.push("/station/sales/order")}
          >
            Invoice(PDF)
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 p-3">
        <div className="border border-gray-200 ">
          <div className="ml-16 mt-3">
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order #
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">1154</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Created on
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">2/29/2024 7:57:51 PM</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Customer
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">vrutika@osiamart.com</p>
            </div>{" "}
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order status
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">Pending</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 mt-3">
          <div className="ml-16  mt-3">
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order subtotal
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">830.00 excl tax</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order shipping
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">0.00 excl tax</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order tax
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">0.00</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order total
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">830.00</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Profit
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">830.00</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Payment method
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">Cash On Delivery (COD)</p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Payment status
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">Pending</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 mt-3 ">
          <div className="ml-16 mt-3">
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Store
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">
                Osia Hyper Retail Limited
              </p>
            </div>
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Order GUID
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">
                f8fe2376-c3bd-40af-9475-a431bdd92aed
              </p>
            </div>{" "}
            <div className="flex items-center mb-4">
              <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                Customer IP address
              </label>
              <p className="text-blue-900 dark:text-gray-300 text-end">103.109.78.227</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 p-3 ">
        <div className="text-orange-500 text-xl font-medium">
          Billing & shipping
        </div>
        <div className="flex justify-between">
          <div className="border border-gray-200 p-4 mr-2 text-start w-1/2">
            <div className="text-orange-500 text-lg font-normal">
              Billing address
            </div>
            <div className="ml-16 mt-3">
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Full name
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">Erika Dave</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Email
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">vrutika@osiamart.com</p>
              </div>{" "}
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Phone
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">7069011498</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Fax
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end"> </p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Company
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end"> </p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Address
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">depart mall</p>
              </div>{" "}
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Address
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">depart mall</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  City
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">Ahmedabad</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  County / region
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end"> </p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  State / province
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">Gujarat</p>
              </div>{" "}
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Zip / postal code
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">380008</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Country
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">India</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 p-4 w-1/2">
            <div className="text-orange-500 text-lg font-normal">
              Shipping address
            </div>
            <div className="ml-16 mt-3">
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Full name
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">Erika Dave</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Email
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">vrutika@osiamart.com</p>
              </div>{" "}
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Phone
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">7069011498</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Fax
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end"> </p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Company
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end"> </p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Address
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">depart mall</p>
              </div>{" "}
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Address
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">depart mall</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  City
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">Ahmedabad</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  County / region
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end"> </p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  State / province
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">Gujarat</p>
              </div>{" "}
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Zip / postal code
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">380008</p>
              </div>
              <div className="flex items-center mb-4">
                <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
                  Country
                </label>
                <p className="text-blue-900 dark:text-gray-300 text-end">India</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
            Shipping method
          </label>
          <p className="text-blue-900 dark:text-gray-300 text-end">Ground</p>
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/6 font-semibold mr-2 text-blue-950 dark:text-white">
            Shipping status
          </label>
          <p className="text-blue-900 dark:text-gray-300 text-end">Not yet shipped</p>
        </div>
      </div>
      <div className="border border-gray-200 p-3 ">
        <div className="text-orange-500 text-xl font-medium">Shipments</div>
      </div>
    </>
  );
}

export default editOrderDetail