"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import React, { useState } from "react";
import CallFor from "@/utilities/CallFor";
import { toast as reToast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  emailid: Yup.string().email("Invalid email").required("Email is required"),
  empId: Yup.string().required("Employee ID is required"),
  userId: Yup.string().required("User ID is required"),
  mobno: Yup.string().required("Phone number is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is required"),
});



const addEmployee = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
   const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
   // const isAdmin = userData.isadmin === true;
   const roleId = userData.roleid;
   const orgid = userData.orgid;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    empId: "",
    userId: "",
    mobno: "",
    role: "",
    password: "",
    canLogin: true,
    isApproved: true,
    accountStatus: 76,
    roleId: "",
    roleName: "",
    roleModels: [
      {
        Urmid: 0,
        Uid: 0,
        Uoid: sessionStorage.getItem("userData")
          ? JSON.parse(sessionStorage.getItem("userData")).orgid
          : null,
        Roleid: roleId,
        Self: null,
      },
    ],
    rightsOfUserModel: {
      modules: [
        {
          moduleName: "Station",
          rightslist: [
            { rightid: 1, rightname: "Create", selected: false },
            { rightid: 2, rightname: "Read", selected: false },
            { rightid: 3, rightname: "Update", selected: false },
            { rightid: 4, rightname: "Delete", selected: false },
          ],
        },
        {
          moduleName: "Sales",
          rightslist: [
            { rightid: 5, rightname: "Create", selected: false },
            { rightid: 6, rightname: "Read", selected: false },
            { rightid: 7, rightname: "Update", selected: false },
            { rightid: 8, rightname: "Delete", selected: false },
          ],
        },
        {
          moduleName: "Purchase",
          rightslist: [
            { rightid: 9, rightname: "Create", selected: false },
            { rightid: 10, rightname: "Read", selected: false },
            { rightid: 11, rightname: "Update", selected: false },
            { rightid: 12, rightname: "Delete", selected: false },
          ],
        },
        {
          moduleName: "Catalog",
          rightslist: [
            { rightid: 13, rightname: "Create", selected: false },
            { rightid: 14, rightname: "Read", selected: false },
            { rightid: 15, rightname: "Update", selected: false },
            { rightid: 16, rightname: "Delete", selected: false },
          ],
        },
      ],
    },
  });
 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const [moduleName, rightName] = name.split("-");

      if (rightName === "All") {
        // Handle "All" checkbox
        setFormData((prevFormData) => {
          const updatedModules = prevFormData.rightsOfUserModel.modules.map(
            (module) => {
              if (module.moduleName === moduleName) {
                const updatedRightsList = module.rightslist.map((right) => ({
                  ...right,
                  selected: checked,
                }));
                return { ...module, rightslist: updatedRightsList };
              }
              return module;
            }
          );
          return {
            ...prevFormData,
            rightsOfUserModel: {
              ...prevFormData.rightsOfUserModel,
              modules: updatedModules,
            },
          };
        });
      } else {
        // Handle individual rights checkboxes
        setFormData((prevFormData) => {
          const updatedModules = prevFormData.rightsOfUserModel.modules.map(
            (module) => {
              if (module.moduleName === moduleName) {
                const updatedRightsList = module.rightslist.map((right) => {
                  if (right.rightname === rightName) {
                    return { ...right, selected: checked };
                  }
                  return right;
                });
                return { ...module, rightslist: updatedRightsList };
              }
              return module;
            }
          );
          return {
            ...prevFormData,
            rightsOfUserModel: {
              ...prevFormData.rightsOfUserModel,
              modules: updatedModules,
            },
          };
        });
      }
    } else if (name === "role") {
      let roleId = 0;
      let roleName = "";

      if (value === "Warehouse") {
        roleId = 4;
        roleName = "Warehouse";
      } else if (value === "Station") {
        roleId = 5;
        roleName = "Station";
      } else if (value === "Admin") {
        roleId = 1;
        roleName = "Admin";
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        role: value,
        roleId: roleId,
        roleName: roleName,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    // Clear the specific field's error message when the input value changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const token = sessionStorage.getItem("userData");
  const abc = JSON.parse(token);
  console.log(abc);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const bodydata = JSON.stringify({
        uid: 0,
        fullname: formData.firstname + " " + formData.lastName,
        firstname: formData.firstname,
        lastname: formData.lastName,
        emailid: formData.emailid,
        mobno: formData.mobno,
        canlogin: formData.canLogin,
        password: formData.password,
        usercode: formData.userId,
        image: "",
        profilestatus: 1,
        isapproved: formData.isApproved,
        accountstatus: formData.accountStatus,
        roleid: formData.roleId,
        roleName: formData.roleName,
        roleModels: formData.roleModels,
        rightsofUserModel: formData.rightsOfUserModel,
      });

      const response2 = await CallFor(
        `v2/users/SaveUser`,
        "POST",
        bodydata,
        "Auth"
      );
      console.log(JSON.stringify(response2));
      if (response2) {
        reToast.success("User saved successfully!");
        router.push("/station/station/staff");
      } else {
        reToast.error("Error saving user.");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="text-2xl text-orange-400">Employee</div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 w-75 ">
            <div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter your first name"
                />
              </div>

              {errors.firstname && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.firstname}</p>
                </div>
              )}

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Email</label>
                <input
                  type="text"
                  name="emailid"
                  value={formData.emailid}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter your email"
                />
              </div>

              {errors.emailid && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.emailid}</p>
                </div>
              )}

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter User ID"
                />
              </div>

              {errors.userId && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.userId}</p>
                </div>
              )}

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Emp ID</label>
                <input
                  type="text"
                  name="empId"
                  value={formData?.empId}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter Employee ID"
                />
              </div>

              {errors.empId && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.empId}</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter your last name"
                />
              </div>

              {errors.lastName && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.lastName}</p>
                </div>
              )}
              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Phone No</label>
                <input
                  type="text"
                  name="mobno"
                  value={formData.mobno}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter your phone number"
                />
              </div>

              {errors.mobno && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.mobno}</p>
                </div>
              )}

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                >
                  <option value="">Select Role</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Station">Station</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {errors.role && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.role}</p>
                </div>
              )}

              <div className="flex items-center mb-2">
                <label className="w-1/6 font-medium mr-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  placeholder="Enter password"
                />
              </div>

              {errors.password && (
                <div className="flex items-center mb-2">
                  <label className="w-1/6 font-medium mr-2"> </label>
                  <p className="text-red-500 pl-3">{errors.password}</p>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="gtin"
                className="w-1/4 font-medium dark:text-white text-gray-700"
              >
                Is Active
              </label>
              <div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="text-2xl text-orange-400 mt-3">Roles & Rights</div>
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
                {formData.rightsOfUserModel.modules.map(
                  (module, moduleIndex) => (
                    <tr
                      className="grid grid-cols-6 mb-2 gap-16"
                      key={moduleIndex}
                    >
                      <td className="font-medium">{module.moduleName}</td>
                      <td className="justify-center flex items-center">
                        <input
                          type="checkbox"
                          name={`${module.moduleName}-All`}
                          checked={module.rightslist.every(
                            (right) => right.selected
                          )}
                          onChange={handleChange}
                          className="w-[25px] h-[25px]"
                        />
                      </td>
                      {/* <span>{module.moduleName}</span> */}
                      {module.rightslist.map((right, rightIndex) => (
                        <td className="justify-center flex items-center">
                          <input
                            key={rightIndex}
                            type="checkbox"
                            name={`${module.moduleName}-${right.rightname}`}
                            checked={right.selected}
                            onChange={handleChange}
                            className="w-[25px] h-[25px]"
                          />
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <Link href="/station/station/staff">
              <Button className="bg-blue-950 text-white mr-2">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-orange-400 text-white">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default addEmployee;
