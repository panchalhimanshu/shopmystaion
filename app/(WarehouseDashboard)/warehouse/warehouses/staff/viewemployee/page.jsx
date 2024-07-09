"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Undo } from "lucide-react";
import Link from "next/link";
import React from "react";

const viewemployee = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-xl font-semibold text-orange-400 mb-4">
            EMPLOYEE
          </div>
          <Link href="/warehouse/warehouses/staff">
            <Button color="warning" className="shadow-md">
              <Undo size={20} className="pr-1" />
              Back
            </Button>
          </Link>
        </div>

        <form class="space-y-4">
          <div className="grid grid-cols-2 w-75">
            <div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">First Name</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Email ID</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Emp ID</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">User ID</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Last Name</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Phone No</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Role</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Password</label>
                <label className=" px-4 py-2 rounded w-3/4">hi</label>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-7">
          <div className="text-xl font-semibold text-orange-400 mb-4">
            ROLES & RIGHTS
          </div>
          <div className="ml-9">
            <table>
              <tbody>
                <div className="grid grid-cols-6 gap-3">
                  <th> </th>
                  <th>All</th>

                  <th>Create</th>

                  <th>Read</th>

                  <th>Update</th>

                  <th>Delete</th>
                </div>
                <tr>
                  <div className="grid grid-cols-6 gap-4 justify-center">
                    <td>Station</td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className="grid grid-cols-6 gap-4 justify-center">
                    <td>Sales</td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className="grid grid-cols-6 gap-4 justify-center">
                    <td>Purchase</td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5  w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5  w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5  w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5  w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5  w-[25px] h-[25px]"
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className="grid grid-cols-6 gap-4 justify-center">
                    <td>Catalog</td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="ml-5 w-[25px] h-[25px]"
                      />
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default viewemployee;
