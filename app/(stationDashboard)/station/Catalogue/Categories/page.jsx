"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  FilePenLine,
  Plus,
  Search,
  SearchIcon,
  Trash,
  Upload,
  Check
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import CallFor from "@/utilities/CallFor";
import DeleteDialog from "@/components/DeleteDialog"; // Import DeleteDialog component

const Categories = () => {
  const [data, setData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete dialog
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchFields, setTempSearchFields] = useState({
    "Category name": "",
    "Is Published": "",
    "Sub Category": "",
  });
  const [searchFields, setSearchFields] = useState({
    userId: "",
    id: "",
    title: "",
    completed: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
const dataa = {    
  catname: "",
  ispublished: null
  };
  const fetchData = async () => {

    setLoading(true);
    try {

      const response = await CallFor(
        `v2/Common/GetCategoryList?PageNumber=1&PageSize=200`,
        "POST",
        dataa,
        "Auth"
      );

      setData(response.data.allCategories);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page on search
  }, [searchQuery, pageSize]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleSearch = () => {
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

  // Calculate total pages based on filtered data length and pageSize
  const totalPages = Math.ceil(filteredData.length / pageSize);
  // Calculate starting index for pagination
  const startIndex = (page - 1) * pageSize;
  // Slice the filtered data based on startIndex and pageSize
  const slicedData = filteredData.slice(startIndex, startIndex + pageSize);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const paginationItems = [];
    const handlePageClick = (pageNumber) => () => handlePageChange(pageNumber);

    paginationItems.push(
      <button
        key="prev"
        className="bg-blue-500 text-white px-3 m-1 py-2 rounded mr-2"
        onClick={handlePageClick(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === page ||
        i <= 2 ||
        i >= totalPages - 1 ||
        (i >= page - 1 && i <= page + 1)
      ) {
        paginationItems.push(
          <button
            key={i}
            className={`px-3 py-1 m-1 rounded ${
              i === page ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={handlePageClick(i)}
          >
            {i}
          </button>
        );
      } else if (paginationItems[paginationItems.length - 1].key !== "...") {
        paginationItems.push(
          <span key="..." className="px-4 py-2">
            ...
          </span>
        );
      }
    }

    paginationItems.push(
      <button
        key="next"
        className="bg-blue-500 text-white m-1 px-3 py-1 rounded"
        onClick={handlePageClick(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    );

    return paginationItems;
  };


  //Delete
  const handleDeleteUser = async (userId) => {
    // const delUrl = `v2/users/DeleteUser?uid=${userId}`;
    setSelectedUserId(userId); // Set selected user id
    setIsDeleteDialogOpen(true); // Open delete dialog with selected user id
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false); // Close delete dialog
  };

 

  return (
    <div className="container mx-auto">
      <div className="flex ">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">SEARCH</h1>
      </div>
      {/* Search inputs */}
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        {/* Search input for each field */}
        {Object.keys(tempSearchFields).map((field) => (
          <div key={field} className="flex items-center mb-2">
            <label className="w-1/4 font-medium mr-2">{field}</label>
            {field === "Is Published" ? (
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
              >
                <option value=""></option>
                <option value="true">Published</option>
                <option value="false">Not Published</option>
              </select>
            ) : field === "Sub Category" ? (
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
              >
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                {/* Add your sub category options here */}
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
          <Search size={20} className="pr-1" />
          Search
        </Button>
      </div>

      <div className=" justify-between flex gap-1 pb-3 ">
        <div className="text-2xl text-orange-400">Category LIST</div>
        <div>
          {/* <Dialog>
          <DialogTrigger asChild>
            <Button color="success" className="shadow-md pr-2"> <Download size={20} className='pr-1' />Import</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                Add Station Data
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button type="submit" variant="outline">
                  Disagree
                </Button>
              </DialogClose>
              <Button type="submit">Agree</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button color="destructive" className="shadow-md mx-1"><Upload size={20} className='pr-1' />Export</Button> */}
         <Link href={"/station/Catalogue/Categories/categoriadd"}>
           <Button color="warning" className="shadow-md">
            <Plus size={20} className="pr-1" />
            Add
          </Button></Link>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        {/* Table headers */}
        <thead>
          <tr>
            <th
              className="px-4 py-2 cursor
-pointer"
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
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              NAME{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              PUBLISHED{" "}
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
              DISPLAYORDER{" "}
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
              ACTION{" "}
              {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.catid}</td>
              <td className="px-4 py-2">{item.catname}</td>
              <td className="px-4 py-2">{item.ispublished == false ? "" : <Check size={20} className="text-success-700"/>}</td>
              <td className="px-4 py-2">{item.displayorder}</td>
              <td className="px-4 py-2">
                <div>
                <Link href={`/station/Catalogue/Categories/categoriview/${item.catid}`}>  <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white  ">
                    <Eye size={20}></Eye>
                  </Button> </Link>
                  <Link href={`/station/Catalogue/Categories/categoriedit/${item.catid}`}>  <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white  ">
                    <FilePenLine size={20}></FilePenLine>
                  </Button> </Link>
                  <Button className="p-0 bg-transparent hover:bg-transparent text-black  dark:text-white "
                  onClick={() => handleDeleteUser(item.catid)} // Open delete dialog on click
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
      <div className="flex justify-end mt-4">{renderPagination()}</div>

      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        callfor={CallFor}
        onDelete={() => {
          fetchData(); // Refresh data after deletion
          setIsDeleteDialogOpen(false); // Close delete dialog
        }}
        delUrl={`v2/Common/DeleteCategory?Id=${selectedUserId}`} // Pass delete URL
      />
    </div>
  );
};

export default Categories;
