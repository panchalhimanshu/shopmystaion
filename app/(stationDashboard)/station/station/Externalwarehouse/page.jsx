"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, SearchIcon } from "lucide-react";
import Link from "next/link";
import CallFor from "@/utilities/CallFor";
import Pagination from "@/components/pagination/Pagination";
import { Check, FilePenLine, Plus, Search, Trash, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import axios from "axios";
const Auditlogs = () => {
    const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchFields, setTempSearchFields] = useState({
    Name: "",
    Phone: "",
    City: "",
      });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [bodyData, setBodyData] = useState(null);

  const fetchBodyData = async () => {
    try {
      setLoading(true);
      const response = await CallFor("v2/account/GetAllExternalDealers", "get", null, "Auth");
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

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const requestBody = {
        companyname: "",
        companyemail: "",
        companymobile: "",
        ownerfullName: "",
        paginationFilter: {
          pageNumber: page,
          pageSize: itemsPerPage,
        }

        
        
      };
      // const response = await CallFor(
      //   "v2/Common/GetErrorLogs",
      //   "post",
      //   requestBody,
      //   "Auth"
      // );
      const response =  await CallFor("v2/account/GetAllExternalDealers", "post", requestBody, "Auth");;
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
      setData(response.data || []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bodyData) {
      fetchData(currentPage);
    }
  }, [currentPage, bodyData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setSearchQuery({
      CreatedFrom: tempSearchFields.CreatedFrom,
      Message: tempSearchFields.Message,
      CreatedTo: tempSearchFields["Created To"],
      LogLevel: tempSearchFields["Log Leve"],
    });
    setCurrentPage(1); // Reset to the first page when searching
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

  const sortedData = data.length > 0 ? [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  }) : [];

  return (
    <div className="container mx-auto">
      <div className="flex ">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">Search</h1>
      </div>
      {/* Search inputs */}
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        {Object.keys(tempSearchFields).map((field) => (
          <div key={field} className="flex items-center mb-2">
            <label className="w-1/4 font-medium mr-2">{field}</label>
            {field === "CreatedFrom" || field === "Created To" ? (
              <input
                type="date"
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                value={tempSearchFields[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            ) : field === "Log Leve" ? (
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                value={tempSearchFields[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              >
                <option value=""></option>
                <option value="INFO">INFO</option>
                <option value="DEBUG">DEBUG</option>
                <option value="ERROR">ERROR</option>
              </select>
            ) : (
              <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center lg:mb-1 mb-3 items-center">
        <Button
          color="warning"
          className="shadow-md w-28"
          onClick={handleSearch}
        >
          <SearchIcon size={20} className="pr-1" />
          Search
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl text-orange-400">External Vandor List</div>
        <div className="flex">
          {/* <Link href="/station/portals/Banner/previewbanner">
            <Button color="warning" className="shadow-md me-2">Preview</Button>
          </Link> */}
          <Link href="/station/station/Externalwarehouse/AddExternalWarehouse">
            <Button color="warning" className="shadow-md">
              <Plus size={20} className="pr-1" />
              Add
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        {/* Table headers */}
        <thead>
          <tr>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("userId")}
            >
              SR.NO{" "}
              {sortConfig.key === "userId"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
                          Vandor Name
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
                          Owner Name
              {sortConfig.key === "title"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("completed")}
            >
                          Phone Number
              {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
                      <th
                          className="px-4 py-2 cursor-pointer"
                          onClick={() => handleSort("completed")}
                      >
                          City
                          {sortConfig.key === "completed"
                              ? sortConfig.direction === "asc"
                                  ? "▲"
                                  : "▼"
                              : ""}
                      </th>
            <th className="px-4 py-2 cursor-pointer text-center">ACTION</th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.eid}>
              <td className=" py-2">{item.id}</td>
              <td className=" py-2">{item.Vandorname}</td>
              <td className=" py-2">{item.name}</td>
              <td className=" py-2">{item.phonenumber}</td>
                  <td className=" py-2">{item.city}</td>
              <td className=" py-2">
                <div className="text-center">
                  <Link href={`/station/station/Externalwarehouse/ViewExternalwarehouse`}>
                    <Button className="p-0 mr-2 bg-transparent text-black hover:bg-transparent dark:text-gray-300">
                      <Eye size={20} />
                    </Button>
                  </Link>
                  <Button
                        className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-gray-300"
                        onClick={() =>
                          router.push(
                            `/station/station/Externalwarehouse/UpdateExternalwarehouse`
                          )
                        }
                      >
                        <FilePenLine size={20}></FilePenLine>
                      </Button>
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

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Auditlogs;
