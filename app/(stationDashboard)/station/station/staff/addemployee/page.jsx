"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast as reToast } from "react-hot-toast";
import CallFor from "@/utilities/CallFor";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  emailid: Yup.string().email("Invalid email").required("Email is required"),
  // empId: Yup.string().required("Employee ID is required"),
  // userId: Yup.string().required("User ID is required"),
  mobno: Yup.string().required("Phone number is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is required"),
});

const AddEmployee = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [bodyData, setBodyData] = useState(null);
  const [Activebtn, setActivebtn] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const Uid = userData.uid ;
  const orgid = userData.orgid
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
    accountStatus: "Active",
    roleId: "",
    roleName: "",
    roleModels: [
      {
        Urmid: 0,
        Uid: Uid,
        Uoid: sessionStorage.getItem("userData")
          ? JSON.parse(sessionStorage.getItem("userData")).orgid
          : null,
        Roleid: "",
        roletypeid: "",
        Self: null,
      },
    ],
    rightsOfUserModel: {
      modules: []
    },
  });

  useEffect(() => {
    const fetchBodyData = async () => {
      try {
        const response = await CallFor(`v2/users/SaveUser`, "GET", null, "Auth");
        setBodyData(response.data);
        setRoles(response.data.dropdowns.roles);
        setFormData(prevFormData => ({
          ...prevFormData,
          rightsOfUserModel: response.data.model.rightsofUserModel
        }));
      } catch (error) {
        console.error("Error fetching roles:", error);
        reToast.error("Error fetching roles");
      }
    };
    fetchBodyData();
  }, []);

  const renderRightsCheckboxes = (module) => {
    const allRights = ['Create', 'Read', 'Update', 'Delete'];
    return allRights.map((right) => {
      const rightObj = module.rightslist.find(r => r.rightname === right);
      if (rightObj) {
        return (
          <td key={right} className="justify-center flex items-center">
            <input
              type="checkbox"
              name={`${module.moduleName}-${right}`}
              checked={rightObj.selected}
              onChange={handleChange}
              className="w-[25px] h-[25px]"
            />
          </td>
        );
      } else {
        return <td key={right}></td>; // Empty cell for missing rights
      }
    });
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const [moduleName, rightName] = name.split("-");

      if (rightName === "All") {
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
      const selectedRole = roles.find(role => role.id.toString() === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        role: value,
        roleId: selectedRole ? selectedRole.id : "",
        roleName: selectedRole ? selectedRole.name : "",
        roleModels: [
          {
            ...prevFormData.roleModels[0],
            Roleid: selectedRole ? selectedRole.id : "",
            roletypeid: selectedRole ? selectedRole.id : ""
          },
        ],
      }));
    } else if (name === "canLogin" || name === "isApproved") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (name === "accountStatus") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        accountStatus: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

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
        canlogin: true,
        password: formData.password,
        usercode: formData.userId,
        image: "",
        profilestatus: 1,
        isapproved: formData.isApproved,
        accountstatus:Activebtn ? 48 : 49, // 48 for Active, 49 for Inactive
        roleid: formData.roleId,
        roleName: formData.roleName,
        roleModels: formData.roleModels,
        rightsofUserModel: formData.rightsOfUserModel,
      });

      const response = await CallFor(
        `v2/users/SaveUser`,
        "POST",
        bodydata,
        "Auth"
      );

      if (response) {
        reToast.success("User saved successfully!");
        router.push("/station/station/staff");
      } else {
        reToast.error("Error saving user.");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };


  return (
    <div className="container mx-auto">
      <div className="text-2xl text-orange-400 mb-4">Add Employee</div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* First column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
            </div>

            <div>
              <Label htmlFor="emailid">Email</Label>
              <Input
                id="emailid"
                name="emailid"
                value={formData.emailid}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.emailid && <p className="text-red-500">{errors.emailid}</p>}
            </div>

            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter User ID"
                disabled
              />
              {/* {errors.userId && <p className="text-red-500">{errors.userId}</p>} */}
            </div>

            <div>
              <Label htmlFor="empId">Emp ID</Label>
              <Input
                id="empId"
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                placeholder="Enter Employee ID"
                disabled
              />
              {/* {errors.empId && <p className="text-red-500">{errors.empId}</p>} */}
            </div>
          </div>

          {/* Second column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>

            <div>
              <Label htmlFor="mobno">Phone No</Label>
              <Input
                id="mobno"
                name="mobno"
                value={formData.mobno}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.mobno && <p className="text-red-500">{errors.mobno}</p>}
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Role</option>
                {roles && roles.map((role) => (
                  <option key={role.id} value={role.id.toString()}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* <div className="flex items-center space-x-2">
            <Switch
              id="canLogin"
              name="canLogin"
              checked={formData.canLogin}
              onCheckedChange={(checked) => handleChange({ target: { name: 'canLogin', type: 'checkbox', checked } })}
            />
            <Label htmlFor="canLogin">Can Login</Label>
          </div> */}

          {/* <div className="flex items-center space-x-2">
            <Switch
              id="isApproved"
              name="isApproved"
              checked={formData.isApproved}
              onCheckedChange={(checked) => handleChange({ target: { name: 'isApproved', type: 'checkbox', checked } })}
            />
            <Label htmlFor="isApproved">Is Approved</Label>
          </div> */}

          <div>
            <Label className="mr-2">Account Status</Label>
              <Switch
                                checked={Activebtn}
                                onCheckedChange={(checked) => setActivebtn(checked)}
                            />
          </div>
        </div>
          <div className="text-2xl text-orange-400 mt-3">Roles & Rights</div>
        <div>
          <table className="w-full">
            <thead>
              <tr className="grid grid-cols-6 gap-4 mb-2">
                <th className="text-left">Module</th>
                <th>All</th>
                <th>Create</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {formData.rightsOfUserModel && formData.rightsOfUserModel.modules.map(
                (module, moduleIndex) => (
                  <tr
                    className="grid  grid-cols-6 mb-2 gap-4"
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
                    {renderRightsCheckboxes(module)}
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
    
  );
};

export default AddEmployee;
