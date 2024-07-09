"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CallFor from "@/utilities/CallFor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast as reToast } from "react-hot-toast";
import * as yup from "yup";

const StaffDetail = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [role, setRole] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    roleName: yup.string().required("Role name is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        setValue("firstName", response.data.firstname);
        setValue("lastName", response.data.lastname);
        setValue("email", response.data.emailid);
        setValue("phone", response.data.mobno);
        setValue("userCode", response.data.usercode);
        setValue("roleName", response.data.rolename);
        setValue("canLogin", response.data.canlogin);
        setLoading(false);
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      
    };
     
    

    if (params.uid) {
      fetchData();
    }
  }, [params.uid, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CallFor(
          `v2/users/GetRightsByUserId?uid=${params.uid}`,
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

    if (params.uid) {
      fetchData();
    }
  }, [params.uid]);

  const handleBack = () => {
    router.back();
  };

  const handleCheckboxChange = (moduleIndex, rightIndex) => {
    const updatedRole = { ...role };
    updatedRole.data.modules[moduleIndex].rightslist[rightIndex].selected =
      !updatedRole.data.modules[moduleIndex].rightslist[rightIndex].selected;
    setRole(updatedRole);
  };

  const handleAllCheckboxChange = (moduleIndex) => {
    const updatedRole = { ...role };
    const allSelected = updatedRole.data.modules[moduleIndex].rightslist.every(
      (right) => right.selected
    );

    updatedRole.data.modules[moduleIndex].rightslist.forEach((right) => {
      right.selected = !allSelected;
    });

    setRole(updatedRole);
  };

   const onSubmit = async (formData) => {
     setLoading(true);
     try {
       let roleId;
       let roleName = formData.roleName;

       if (roleName === "Warehouse") {
         roleId = 4;
       } else if (roleName === "Station") {
         roleId = 5;
       } else if (roleName === "Admin") {
         roleId = 1;
       }

       const updateData = {
         uid: params.uid,
         fullname: `${formData.firstName} ${formData.lastName}`,
         firstname: formData.firstName,
         lastname: formData.lastName,
         emailid: formData.email,
         mobno: formData.phone,
         canlogin: formData.canLogin,
         usercode: formData.userCode,
         roleName,
         roleId,
         roleModels: data.roleModels,
         rightsofUserModel: role.data,
       };

      const updatedata =  await CallFor("v2/users/UpdateUser", "POST", updateData, "Auth");

       setLoading(false);
       router.back();
        if (updatedata) {
          reToast.success("User Update successfully!");
          router.push("/station/station/staff");
        } else {
          reToast.error("Error Update user.");
        }
     } catch (error) {
       setError(error);
       setLoading(false);
     }
   };

  return (
    <>
      <div className="justify-between flex gap-1 pb-3">
        <div className="text-2xl text-orange-400">STAFF</div>
        <Button color="warning" onClick={handleBack}>
          <Undo2 className="mr-2" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 ml-16">
          <div className="mb-4">
            <div className="flex items-center">
              <label className="w-1/6 font-medium mr-2">First Name</label>
              <input
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                {...register("firstName")}
              />
            </div>
            {errors.firstName && (
              <div className="flex items-center">
                <label className="w-1/6 font-medium mr-2"></label>
                <p className="text-red-500">{errors.firstName.message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label className="w-1/6 font-medium mr-2">Last Name</label>
              <input
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                {...register("lastName")}
              />
            </div>
            {errors.lastName && (
              <div className="flex items-center">
                <label className="w-1/6 font-medium mr-2"></label>
                <p className="text-red-500">{errors.lastName.message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label className="w-1/6 font-medium mr-2">Email ID</label>
              <input
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <div className="flex items-center">
                <label className="w-1/6 font-medium mr-2"></label>
                <p className="text-red-500">{errors.email.message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label className="w-1/6 font-medium mr-2">Phone No</label>
              <input
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <div className="flex items-center">
                <label className="w-1/6 font-medium mr-2"></label>
                <p className="text-red-500">{errors.phone.message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label className="w-1/6 font-medium mr-2">Emp ID</label>
              <input
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                {...register("userCode")}
                disabled
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <label className="w-1/6 font-medium mr-2">Role</label>
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                {...register("roleName")}
              >
                <option value="">Select a role</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Station">Station</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {errors.roleName && (
              <div className="flex items-center">
                <label className="w-1/6 font-medium mr-2"></label>
                <p className="text-red-500">{errors.roleName.message}</p>
              </div>
            )}
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/6 font-medium mr-2">User ID</label>
            <input
              className="border border-gray-300 px-4 py-2 rounded w-3/4"
              value={data.uid}
              disabled
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="w-1/6 font-medium mr-2">Is Active</label>
            <input type="checkbox" {...register("canLogin")} />
          </div>
        </div>
        <div>
          <div className="text-2xl text-orange-400 m-4">Roles & Rights</div>

          <div>
            <table>
              <tbody>
                <tr className="grid grid-cols-6 gap-16 mb-2">
                  <th></th>
                  <th>All</th>
                  <th>Create</th>
                  <th>Read</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {role.data &&
                  role.data.modules &&
                  role.data.modules.map((module, moduleIndex) => (
                    <tr
                      className="grid grid-cols-6 mb-2 gap-16"
                      key={module.moduleName}
                    >
                      <td>{module.moduleName}</td>
                      <td className="justify-center flex items-center">
                        <input
                          type="checkbox"
                          name={`${module.moduleName}-All`}
                          checked={module.rightslist.every(
                            (right) => right.selected
                          )}
                          onChange={() => handleAllCheckboxChange(moduleIndex)}
                          className="w-[25px] h-[25px]"
                        />
                      </td>
                      {module.rightslist.map((right, rightIndex) => (
                        <td
                          key={right.rightid}
                          className="justify-center flex items-center"
                        >
                          <input
                            type="checkbox"
                            checked={right.selected}
                            onChange={() =>
                              handleCheckboxChange(moduleIndex, rightIndex)
                            }
                            className="w-[25px] h-[25px]"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end m-4">
          <Button color="success" type="submit">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default StaffDetail;
