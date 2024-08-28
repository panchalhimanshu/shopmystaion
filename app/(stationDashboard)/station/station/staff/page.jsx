"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Eye,
  FilePenLine,
  Plus,
  Search,
  SearchIcon,
  Trash,
  Upload,
} from "lucide-react";
import StaffImportModal from "./StaffImportModal";
import { useRouter } from "next/navigation";
import CallFor from "@/utilities/CallFor";
import DeleteDialog from "@/components/DeleteDialog";
import Pagination from "@/components/pagination/Pagination";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const Staff = () => {
  const [data, setData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const [searchFields, setSearchFields] = useState({
    fullname: "",
    // rolename: "",
    // orgname: "",
    accountstatus: "",
    roletypes: "",  // New state for role types
  });

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const router = useRouter();
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const isAdmin = userData.isadmin === true;

  const [bodyData, setBodyData] = useState(null);

  const fetchBodyData = async () => {
    try {
      setLoading(true);
      const response = await CallFor("v2/users/GetUsersByRoleId", "get", null, "Auth");
      setBodyData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBodyData();
  }, []);

  useEffect(() => {
    if (bodyData) {
      fetchData(currentPage, searchFields);
    }
  }, [currentPage, bodyData]);

  // useEffect(() => {
  //   if (bodyData) {
  //     fetchData(currentPage, searchFields);
  //   }
  // }, [currentPage]);

  const fetchData = async (page, fields) => {
    setLoading(true);
    try {
      const requestBody = {
        roleId: fields.roletypes ? parseInt(fields.roletypes) : 0,  // Adjusted roleId
        desc: false,
        allRoles: true,
        roletypeId: fields.roletypes ? parseInt(fields.roletypes) : null,
        name: fields.fullname || null,
        accountstatus: fields.accountstatus || null,
        paginationFilter: {
          pageNumber: page,
          pageSize: itemsPerPage
        }
      };

      const response = await CallFor(
        `v2/users/GetUsersByRoleId`,
        "POST",
        JSON.stringify(requestBody),
        "Auth"
      );
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
      setLoading(false);
    } catch (error) {
      setError(error);
      setData([]);
      setTotalPages(0);
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchFields);
  };

  const handleInputChange = (columnName, value) => {
    setSearchFields(prevFields => ({ ...prevFields, [columnName]: value }));
  };

  const handleSort = (columnName) => {
    let direction = "asc";
    if (sortConfig.key === columnName && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction });
  };

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });


   const handleExport = async () => {
      try {
        setLoading(true);

        const response = await axios({
          method: 'GET',
          url: "http://192.168.1.176:126/api/v2/users/ExportUsers",
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is indeed a blob
        if (response.data instanceof Blob) {
          // Create a blob from the response data
          const blob = new Blob([response.data], { type: response.headers['content-type'] });

          // Create a link element and trigger the download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);

          // Try to get the filename from the Content-Disposition header
          const contentDisposition = response.headers['content-disposition'];
          let filename = 'products_export.xlsx';
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
            if (filenameMatch && filenameMatch.length === 2) {
              filename = filenameMatch[1];
            }
          }

          link.download = filename;
          link.click();
        } else {
          console.error('Expected blob response but received:', response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Export failed:", error);
        setLoading(false);
      }
  };


console.log(bodyData);



  return (
    <div className="container mx-auto">
      <div className="flex">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">Search</h1>
      </div>
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        {Object.keys(searchFields).map((field) => (
          <div key={field} className="flex items-center mb-2">
            <label className="w-1/4 font-medium mr-2">
              {field === "fullname" && "Name"}
              {/* {field === "rolename" && "Role"} */}
              {/* {field === "orgname" && "Organization Name"} */}
              {field === "accountstatus" && "Account Status"}
              {field === "roletypes" && "Role Type"} {/* New label */}
            </label>
            {field === "accountstatus" ? (
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
                value={searchFields[field]}
              >
                <option value="">All</option>
                {bodyData?.mastervalues?.accountstatus?.mastervalues.map((status) => (
                  <option key={status.mvid} value={status.mvid}>
                    {status.mastervalue1}
                  </option>
                ))}
              </select>
            ) : field === "roletypes" ? (  // New dropdown for role types
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
                value={searchFields[field]}
              >
                <option value="">All</option>
                {bodyData?.dropdowns?.roletypes.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                value={searchFields[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full mb-2">
        <Button color="warning" className="shadow-md" onClick={handleSearch}>
          <Search size={20} className="pr-1" />
          Search
        </Button>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-2xl text-orange-400">Staff List</div>
        <div>
          <StaffImportModal />
          <Button color="destructive" className="shadow-md mx-1"   onClick={handleExport}
            disabled={loading}>
            <Upload size={20} className="pr-1" />
            Export
          </Button>
          <Button
            color="warning"
            className="shadow-md"
            onClick={() => router.push("/station/station/staff/addemployee")}
          >
            <Plus size={20} className="pr-1" />
            Add
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : data.length > 0 ? (
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("uid")}
              >
                SR.NO{" "}
                {sortConfig.key === "uid"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("uid")}
              >
                EMP ID{" "}
                {sortConfig.key === "uid"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("fullname")}
              >
                NAME{" "}
                {sortConfig.key === "fullname"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("mobno")}
              >
                PHONE NO{" "}
                {sortConfig.key === "mobno"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("rolename")}
              >
                ROLE{" "}
                {sortConfig.key === "rolename"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("accountstatus")}
              >
                STATUS{" "}
                {sortConfig.key === "accountstatus"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={item.uid}>
                <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2">{item.uid}</td>
                <td className="px-4 py-2">{item.fullname}</td>
                <td className="px-4 py-2">{item.mobno}</td>
                <td className="px-4 py-2">{item.roleTypename}</td>
                <td className="px-4 py-2">{item.accountstatus == 48 ? <Badge color="success" variant="outline">Active</Badge> : item.accountstatus == 49 ? <Badge color="destructive" variant="outline">InActive</Badge> : "N/A"}</td>
                <td className="px-4 py-2">
                  <div>
                    <Button
                      className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                      onClick={() =>
                        router.push(
                          `/station/station/staff/staffDetail/${item.uid}`
                        )
                      }
                    >
                      <Eye size={20}></Eye>
                    </Button>
                    {isAdmin && (
                      <Button
                        className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                        onClick={() =>
                          router.push(
                            `/station/station/staff/editEmployee/${item.uid}`
                          )
                        }
                      >
                        <FilePenLine size={20}></FilePenLine>
                      </Button>
                    )}
                    <Button
                      className="p-0 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                      onClick={() => handleDeleteUser(item.uid)}
                    >
                      <Trash size={20}></Trash>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4 text-gray-500">No data found</div>
      )}
      {data.length > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        callfor={CallFor}
        onDelete={() => {
          fetchData(currentPage, searchFields);
          setIsDeleteDialogOpen(false);
        }}
        delUrl={`v2/users/DeleteUser?uid=${selectedUserId}`}
      />
    </div>
  );
};

export default Staff;