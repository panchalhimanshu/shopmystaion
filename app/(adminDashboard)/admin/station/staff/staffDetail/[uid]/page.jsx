"use client"
import { Button } from '@/components/ui/button'
import CallFor from '@/utilities/CallFor';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { Undo2, Check, X } from 'lucide-react';


const staffDetail = () => {
    const router = useRouter();
    const param = useParams();
    const [data, setData] = useState([]);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (param.uid) {
            getStaffDetail();
            getStaffRights();
        }
    }, [param.uid]);

    const getStaffDetail = async () => {
        setLoading(true);
        try {
            const response = await CallFor(
                `v2/users/GetUserById?uid=${param.uid}`,
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

    const getStaffRights = async () => {
        setLoading(true);
        try {
            const response = await CallFor(
                `v2/users/GetRightsByUserId?uid=${param.uid}`,
                "GET",
                null,
                "Auth"
            );

            setRole(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    return (
        <>
            <div className=' justify-between flex gap-1 pb-3 '>
                <div className='text-2xl text-orange-400'>
                    STAFF
                </div>
                <Button color="warning" onClick={() => router.push("/admin/station/staff")}>
                    <Undo2 className='mr-2' />
                    Back
                </Button>
            </div>

            <div className=" grid grid-cols-2 ml-16">
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        First Name
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.firstname}</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        Last Name
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.lastname}</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        Email ID
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.emailid}</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        Phone No
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.mobno}</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        Emp ID
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.usercode}</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        Role
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.rolename}</p>
                </div>

                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        User ID
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.uid}</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        Password
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4"> <span className='font-bold'> : </span> {data.password}</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="w-1/6 font-bold mr-2 text-blue-900 dark:text-white">
                        {" "}
                        Is Active
                    </label>
                    <p className="text-blue-900 dark:text-white ml-4">
                        <span className='font-bold'> : </span> {data.canlogin ? "Yes" : "No"}
                    </p>
                </div>
            </div>
            <div>
                <div className="text-2xl text-orange-400 m-4">Roles & Rights</div>

                <div>
                    <table>
                        <tbody>
                            <tr className="grid grid-cols-6 gap-16 mb-2">
                                <th></th>
                                <th>Create</th>
                                <th>Read</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            {role &&
                                role.data.modules.map((module) => (
                                    <tr
                                        className="grid grid-cols-6 mb-2 gap-16"
                                        key={module.moduleName}
                                    >
                                        <td>{module.moduleName}</td>
                                        {module.rightslist.map((right) => (
                                            <td
                                                key={right.rightid}
                                                className="justify-center flex items-center"
                                            >
                                                <Checkbox
                                                    className={`w-8 h-8 rounded-full disabled:opacity-100 disabled:cursor-default`}
                                                    disabled
                                                    defaultChecked
                                                    color={right.selected ? "success" : "destructive"}
                                                    icon={right.selected ? <Check /> : <X />}
                                                    id={`circle_${right.rightid}`}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default staffDetail