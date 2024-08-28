"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Eye,
  FilePenLine,
  Plus,
  Search,
  SearchIcon,
  Trash,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteDialog from "@/components/DeleteDialog";
import Pagination from "@/components/pagination/Pagination";
import CallFor2 from "@/utilities/CallFor2";

const Staff = () => {
  const [data, setData] = useState([]);
  const [bodyData, setBodyData] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const [tempSearchFields, setTempSearchFields] = useState({
    fullname: "",
    emailid: "",
    rolename: "",
    orgname: "",
  });

  const [searchFields, setSearchFields] = useState({
    fullname: "",
    emailid: "",
    rolename: "",
    orgname: "",
  });

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const router = useRouter();
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const isAdmin = userData.isadmin === true;
  const roleId = userData.roleid;

  const fetchBodyData = async () => {
    try {
      setLoading(true);
      const response = await CallFor2(`api/OCarouselVendorShopAdminAPI/List`, "get", null, "Auth");
      setBodyData(response.data);
      
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!bodyData) return; // Don't fetch if bodyData is not available

    setLoading(true);
    try {
      const requestData = {
        ...bodyData,
        Page: currentPage,
        PageSize: totalPages,
        Start: (currentPage - 1) * itemsPerPage,
        Length: itemsPerPage,
        CustomProperties: {},
        
      };

      const response = await CallFor2(
        `api/OCarouselVendorShopAdminAPI/List`,
        "POST",
        requestData,
        "Auth"
      );
      setData(response.data.Data);
      setTotalPages(Math.ceil(response.data.recordsTotal / itemsPerPage));
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
      fetchData();
    }
  }, [currentPage, bodyData]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    console.log(tempSearchFields,"serch")
    setSearchFields(tempSearchFields);
    setSearchQuery(JSON.stringify(tempSearchFields)); // Trigger useEffect
  };

  const handleInputChange = (columnName, value) => {
    setTempSearchFields({ ...tempSearchFields, [columnName]: value });
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

  const filteredData = sortedData.filter((item) => {
    for (let key in searchFields) {
      if (searchFields[key] !== "") {
        const itemValue = item[key]?.toString().toLowerCase() || "";
        const searchValue = searchFields[key].toLowerCase();
        if (!itemValue.includes(searchValue)) {
          return false;
        }
      }
    }
    return true;
  });

  // const filteredData = sortedData.filter((item) => {
  //   for (let key in searchFields) {
  //     if (searchFields[key] !== "") {
  //       const itemValue = item[key]?.toString().toLowerCase() || "";
  //       const searchValue = searchFields[key].toLowerCase();
  //       if (!itemValue.includes(searchValue)) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // });

  return (
    <div className="container mx-auto">
      <div className="flex">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">Search</h1>
      </div>
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        {Object.keys(tempSearchFields).map((field) => (
          <div key={field} className="flex items-center mb-2">
            <label className="w-1/4 font-medium mr-2">
              {field === "fullname" && " Name"}
              {field === "emailid" && "Warehouse name"}
              {field === "rolename" && "Role"}
              {field === "orgname" && "Organization Name"}
            </label>
            {["rolename", "orgname"].includes(field) ? (
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
              >
                <option value=""></option>
                {field === "rolename" && (
                  <>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </>
                )}
                {field === "orgname" && (
                  <>
                    <option value="warehouse1">Warehouse 1</option>
                    <option value="warehouse2">Warehouse 2</option>
                    <option value="warehouse3">Warehouse 3</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                value={tempSearchFields[field]}
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
        <div className="text-2xl text-orange-400">Carousel List</div>
        <div>
          {/* <StaffImportModal /> */}
          {/* <Button color="destructive" className="shadow-md mx-1">
            <Upload size={20} className="pr-1" />
            Export
          </Button> */}
          <Button
            color="warning"
            className="shadow-md"
            onClick={() => router.push("/station/portals/carousels/addcarousels")}
          >
            <Plus size={20} className="pr-1" />
            Add
          </Button>
        </div>
      </div>
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("uid")}
            >
              Name
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
              Title
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
              Data source type
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
              Widget zone
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
              Display order
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
              Active
              {sortConfig.key === "accountstatus"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("action")}
            >
              ACTION{" "}
              {sortConfig.key === "action"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.uid}>
              <td className="px-4 py-2">{item.Name}</td>
              <td className="px-4 py-2">{item.Title}</td>
              <td className="px-4 py-2">{item.DataSourceTypeStr}</td>
              <td className="px-4 py-2">{item.WidgetZoneStr}</td>
              <td className="px-4 py-2">{item.DisplayOrder}</td>
              {/* <td className="px-4 py-2">{item.Active ? "true" : "fals"}</td> */}
              <td className="px-4 py-2">
                {item.Active ? (
                  <Check size={20} className="text-success-700" />
                ) : (
                  ""
                )}
              </td>
              <td className="px-4 py-2">
                <div>
                  {/* <Button
                    className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                    onClick={() =>
                      router.push(
                        `/station/station/staff/staffDetail/${item.uid}`
                      )
                    }
                  >
                    <Eye size={20}></Eye>
                  </Button> */}
                    <Button
                      className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                      onClick={() =>
                        router.push(
                          `/station/portals/carousels/editcarousels/${item.Id}`
                        )
                      }
                    >
                      <FilePenLine size={20}></FilePenLine>
                    </Button>
                  <Button
                    className="p-0 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                    onClick={() => handleDeleteUser(item.Id)}
                  >
                    <Trash size={20}></Trash>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        callfor={CallFor2}
        onDelete={() => {
          fetchData();
          setIsDeleteDialogOpen(false);
        }}
        delUrl={`api/OCarouselVendorShopAdminAPI/Delete/${selectedUserId}`}
      />
    </div>
  );
};

export default Staff ;