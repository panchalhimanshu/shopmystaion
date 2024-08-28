"use client"
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import GlobalPropperties from "@/utilities/GlobalPropperties";
import {
  Check,
  Download,
  Eye,
  FilePenLine,
  Plus,
  Search as SearchIcon,
  Trash,
  Upload,
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
import Pagination from "@/components/pagination/Pagination";
import DeleteDialog from "@/components/DeleteDialog";
import axios from "axios";

const Product = () => {

  const getToken = () => {
    const user = sessionStorage.getItem('token') || null;
    const data = user ? JSON.parse(user) : null;
    return data ? data : null;
}

  const [data, setData] = useState([]);
  const [exportUrl, setExportUrl] = useState("");
  const [filterData, setFilterData] = useState({
    categories: [],
    manufacturer: [],
    skustatus: []
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [filterModel, setFilterModel] = useState({
    proname: null,
    catid: null,
    subcatid: null,
    manufacturer: null,
    skustatus: 87
    
  });

 
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    fetchDataGet();
    // fetchData();
  }, []);

  useEffect(() => {
    fetchData();
}, [page,pageSize ]);

  const fetchDataGet = async () => {
    try {
      setLoading(true);
      const url = `v2/Product/GetProductsList`;
      const response = await CallFor(url, "get", null, "Auth");
      setExportUrl(response.data.excelExportApi);

      setFilterData({
        categories: response.data.dropdowns.categories,
        manufacturer: response.data.dropdowns.manufacturer,
        skustatus: response.data.dropdowns.skustatus.mastervalues
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  
  console.log(exportUrl,"exportUrl");
  

  const handleExport = async () => {
    if (exportUrl) {
      try {
        setLoading(true);

        const response = await axios({
          method: 'GET',
          url: exportUrl,
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
    }
  };


  const fetchData = async () => {
    
    try {

      const filtermodel = {...filterModel, paginationFilter: {
        pageNumber: page,
        pageSize: pageSize,
      }}
      setLoading(true);
      const url = `v2/Product/GetProductsList`;
      const response = await CallFor(url, "POST", filtermodel, "Auth");
      setData(response.data.data.data);
      // setTotalPages(Math.ceil(response.data.data.totalCount / pageSize));
      setTotalPages(Math.ceil(response.data.data.totalCount / pageSize));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  // const handlePageSizeChange = (size) => {
  //   setPageSize(size);
  //   setFilterModel(prev => ({
  //     ...prev,
  //     paginationFilter: {
  //       ...prev.paginationFilter,
  //       pageSize: size
  //     }
  //   }));
  // };

  const handleInputChange = (field, value) => {
  setFilterModel(prev => {
    // If the field being updated is 'catid', also reset 'subcatid'
    if (field === "catid") {
      return {
        ...prev,
        catid: value,
        subcatid: null, // Reset subcategory when category changes
      };
    }
    return {
      ...prev,
      [field]: value
    };
  });
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


  const handleSearch = () => {
    fetchData();
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex ">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">Search</h1>
      </div>
     
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Product Name</label>
          <input
            type="text"
            value={filterModel.proname || ""}
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            onChange={(e) => handleInputChange("proname", e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Category</label>
          <Select
            options={filterData.categories.map(cat => ({ value: cat.id, label: cat.name }))}
            value={filterModel.catid ? { value: filterModel.catid, label: filterData.categories.find(c => c.id === filterModel.catid)?.name } : null}
            onChange={(selected) => handleInputChange("catid", selected ? selected.value : null)}
            className="w-3/4"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Subcategory</label>
          <Select
            options={filterData.categories.find(c => c.id === filterModel.catid)?.subdata.map(sub => ({ value: sub.id, label: sub.name })) || []}
            value={filterModel.subcatid ? { value: filterModel.subcatid, label: filterData.categories.find(c => c.id === filterModel.catid)?.subdata.find(s => s.id === filterModel.subcatid)?.name } : null}
            onChange={(selected) => handleInputChange("subcatid", selected ? selected.value : null)}
            className="w-3/4"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Manufacturer</label>
          <Select
            options={filterData.manufacturer.map(m => ({ value: m.id, label: m.name }))}
            value={filterModel.manufacturer ? { value: filterModel.manufacturer, label: filterData.manufacturer.find(m => m.id === filterModel.manufacturer)?.name } : null}
            onChange={(selected) => handleInputChange("manufacturer", selected ? selected.value : null)}
            className="w-3/4"
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">SKU Status</label>
          <Select
            options={filterData.skustatus.map(s => ({ value: s.mvid, label: s.mastervalue1 }))}
            value={filterModel.skustatus ? { value: filterModel.skustatus, label: filterData.skustatus.find(s => s.mvid === filterModel.skustatus)?.mastervalue1 } : null}
            onChange={(selected) => handleInputChange("skustatus", selected ? selected.value : null)}
            className="w-3/4"
          />
        </div>
      </div>
      
      <div className="flex justify-center mb-3 items-center">
        <Button
          color="warning"
          className="shadow-md w-28"
          onClick={fetchData}
        >
          <SearchIcon size={20} className="pr-1" />
          Search
        </Button>
      </div>


      <div className="flex justify-between items-center pb-3">
        <div className="text-2xl text-orange-400">List Of SKU Requests</div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button color="success" className="shadow-md pr-2">
                <Download size={20} className="pr-1" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-base font-medium">
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
          <Button
            color="destructive"
            className="shadow-md mx-2"
            onClick={handleExport}
          >
          
              <>
                <Upload size={20} className="pr-1" />
                Export
              </>
          </Button>
          
          <Link href="/station/Catalogue/Products/skurequest">
            <Button color="warning" className="shadow-md">
              <Plus size={20} className="pr-1" />
              Add
            </Button>
          </Link>
        </div>
      </div>
      
      <table className="min-w-full text-left">
          {/* Table headers */}
          <thead>
            <tr>
              <th
                className="px-2 py-2 cursor
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
                className="px-2 py-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                PICTURE{" "}
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
                PRODUCTS NAME{" "}
                {sortConfig.key === "title"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="px-2 py-2 cursor-pointer"
                onClick={() => handleSort("completed")}
              >
                PRICE{" "}
                {sortConfig.key === "completed"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                className="px-2 py-2 cursor-pointer"
                onClick={() => handleSort("completed")}
              >
                CATEGORY{" "}
                {sortConfig.key === "completed"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                className="px-2 py-2 cursor-pointer"
                onClick={() => handleSort("completed")}
              >
                STATUS{" "}
                {sortConfig.key === "completed"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                className="px-2 py-2 cursor-pointer"
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
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-2 py-2">{item.proid}</td>
               <td className="px-2 py-2">
  <img
    src={`${GlobalPropperties.viewdocument}${item.prowatermarkUmUrl}`}
    alt="Product"
    width={100}
    height={100}
    onError={(e) => e.currentTarget.src } // Path to your placeholder image
    className="w-24 h-24 object-cover rounded-md shadow-md"
  />
</td>

                <td className="px-2 py-2">{item.proname}</td>
                <td className="px-2 py-2">{item.price}</td>
                <td className="px-2 py-2 text-center">{item.categoryname}</td>
                <td className="px-2 py-2 text-center">
                  {item?.provariants[0]?.pvstatus == 87 ? <p className="bg-blue-500 inline-block text-white px-2 rounded">All</p> 
                  : item?.provariants[0]?.pvstatus == 88 ? <p className="bg-green-500 inline-block text-white px-2 rounded">Added</p> 
                  : item?.provariants[0]?.pvstatus == 89 ? <p className="bg-red-500 inline-block text-white px-2  rounded">Rejected</p> 
                  : <p className="bg-yellow-500 inline-block text-white px-2  rounded">NotAdded</p>}
                </td>
                <td className="px-2 py-2">
                  {item?.provariants[0]?.pvstatus == 90 ?
                  <div>
                    <Link href={`/station/Catalogue/Requests/viewrequest/${item.proid}`}>
                      <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white">
                        <Eye size={20}></Eye>
                      </Button>
                    </Link>
                    <Link href={`/station/Catalogue/Requests/editrequest/${item.proid}`}>
                      <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white">
                        <FilePenLine size={20}></FilePenLine>
                      </Button>
                    </Link>

                    <Button className="p-0 bg-transparent hover:bg-transparent text-black  dark:text-white"
                  onClick={() => handleDeleteUser(item.proid)}
                  >
                    <Trash size={20}></Trash>
                  </Button>
                  </div>:
                  <div>
                    <Link href={`/station/Catalogue/Requests/viewrequest/${item.proid}`}>
                      <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white">
                        <Eye size={20}></Eye>
                      </Button>
                    </Link>
                        </div>
                  
}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
<div className="flex justify-end mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        callfor={CallFor}
        onDelete={() => {
          fetchData();
          setIsDeleteDialogOpen(false);
        }}
        delUrl={`v2/Product/DeleteProduct?ProId=${selectedUserId}`}
      />
    </div>
  );
};

export default Product;