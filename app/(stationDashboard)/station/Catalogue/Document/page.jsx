"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Download,
  DownloadIcon,
  Eye,
  FilePenLine,
  MessageSquarePlus,
  MessageSquarePlusIcon,
  Plus,
  Search,
  SearchIcon,
  Trash,
  Upload,
} from "lucide-react";
import GlobalPropperties from "@/utilities/GlobalPropperties";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CallFor from "@/utilities/CallFor";
import { saveAs } from "file-saver";
import DeleteDialog from "@/components/DeleteDialog"; // Import DeleteDialog component

const Document = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete dialog
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchFields, setTempSearchFields] = useState({
    Name: "",
    UploadedBy: "",
    DocumentType: "",
  });
  const [searchFields, setSearchFields] = useState({
    userId: "",
    id: "",
    title: "",
    completed: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const bodydata = {
    docname: "",
    entityid: "",
    doctype: "",
    fromdate: "01/01/0001 00:00:00",
    todate: "01/01/0001 00:00:00",
  };

  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const uoid = userData.orgid;

  const downloadDocument = async (docurl, filename, format) => {
    try {
      const response = await axios.get(
        GlobalPropperties.viewdocument + `${docurl}`,
        {
          responseType: "blob", // Important to set the response type to blob
        }
      );

      let contentType = response.headers["content-type"];
      if (!contentType && format === "xlsx") {
        contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      }

      const blob = new Blob([response.data], { type: contentType });

      saveAs(blob, filename); // Save the document with file-saver
    } catch (error) {
      console.error("Error downloading the document", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CallFor(
        `v2/document/GetDocumentByEntityId?orgId=${uoid}&entitytypeid=1`,
        // `v2/document/GetDocumentListByEntityId?entityid=${uoid}&entitytypeid=7&PageNumber=1&PageSize=10`,
        "POST",
        null,
        "Auth"
      );
      setData(response.data.data.list || []); // Ensure data is an array
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

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

  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

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
  //Delete Over

  return (
    <div className="container mx-auto">
      <div className="flex">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">SEARCH</h1>
      </div>
      {/* Search inputs */}
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        {/* Search input for each field */}
        {Object.keys(tempSearchFields).map((field) => (
          <div key={field} className="flex items-center mb-2">
            <label className="w-1/4 font-medium mr-2">{field}</label>
            {field === "DocumentType" ? (
              <select
                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                onChange={(e) => handleInputChange(field, e.target.value)}
              >
                <option value=""></option>
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="xlsx">XLSX</option>
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

      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl text-orange-400">Document List</div>
        <Button
          color="warning"
          className="shadow-md"
          onClick={() => router.push("/station/Catalogue/Document/adddocument")}
        >
          <Plus size={20} className="pr-1" />
          Add
        </Button>
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        {/* Table headers */}
        <thead>
          <tr>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("docid")}
            >
              Sr No.{" "}
              {sortConfig.key === "docid"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("uploaddate")}
            >
              Uploaded Date{" "}
              {sortConfig.key === "uploaddate"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("format")}
            >
              Format{" "}
              {sortConfig.key === "format"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th className="px-4 py-2 cursor-pointer">Action</th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {slicedData.length > 0 ? (
            slicedData.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.docid}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.uploaddate}</td>
                <td className="px-4 py-2">{item.format}</td>
                <td className="px-4 py-2">
                  <div>
                    <Link
                      href={`/station/Catalogue/Document/viewdocument/${item.docid}`}
                    >
                      <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-white">
                        <Eye size={20}></Eye>
                      </Button>
                    </Link>
                    <Link
                      href={`/station/Catalogue/Document/editdocument/${item.docid}`}
                    >
                      <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-white">
                        <FilePenLine size={20}></FilePenLine>
                      </Button>
                    </Link>

                    <Button
                      className="p-0 mr-2 bg-transparent hover:bg-transparent text-black dark:text-white"
                      onClick={() => handleDeleteUser(item.docid)} // Open delete dialog on click
                    >
                      <Trash size={20}></Trash>
                    </Button>
                    <Button
                      onClick={() =>
                        downloadDocument(item.docurl, item.name, item.format)
                      }
                      className="p-0 bg-transparent hover:bg-transparent text-black dark:text-white"
                    >
                      <DownloadIcon size={20}></DownloadIcon>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
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
        delUrl={`v2/document/DeleteDocument?id=${selectedUserId}`} // Pass delete URL
      />
    </div>
  );
};

export default Document;
