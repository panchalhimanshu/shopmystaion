"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Eye, FilePenLine, Plus, Search, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import CallFor from '@/utilities/CallFor';

const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [organisations, setOrganisations] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const [tempSearchFields, setTempSearchFields] = useState({
    "returnDate": "",
    "targetOrgUid": "",
    "orderId": ""
  });
  const [searchFields, setSearchFields] = useState({
    "returnDate": "",
    "targetOrgUid": "",
    "orderId": ""
  });

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const response = await CallFor(
        `v2/Orders/GetOrderReturns/true`, 
        "get", 
        null, 
        "Auth"
      );

      setOrganisations(response.data.dropdowns.organisations);
      setOrderIds(response.data.dropdowns.orderIds);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchReturns = async (page, filters) => {
    try {
      setLoading(true);
      const requestBody = {
          returnDate: filters.returnDate || "0001-01-01T00:00:00",
          targetOrgUid: filters.targetOrgUid || null,
          orderId: filters.orderId || null,
          paginationFilter: {
            PageNumber: 1,
            PageSize: 100
          }
      };

      const response = await CallFor(
        `v2/Orders/GetOrderReturnsByOrgId/true`, 
        "post", 
        requestBody, 
        "Auth"
      );

      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.totalRecords / pageSize));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (organisations.length > 0 && orderIds.length > 0) {
      fetchReturns(page, searchFields);
    }
  }, [page, pageSize, organisations, orderIds]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = () => {
    setSearchFields(tempSearchFields);
    setPage(1);
  };

  const handleInputChange = (columnName, value) => {
    setTempSearchFields({ ...tempSearchFields, [columnName]: value });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const paginationItems = [];
    const handlePageClick = (pageNumber) => () => handlePageChange(pageNumber);

    paginationItems.push(
      <button key="prev" className="bg-blue-500 text-white px-3 m-1 py-2 rounded mr-2" onClick={handlePageClick(page - 1)} disabled={page === 1}>
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === page || (i <= 2) || (i >= totalPages - 1) || (i >= page - 1 && i <= page + 1)) {
        paginationItems.push(
          <button key={i} className={`px-3 py-1 m-1 rounded ${i === page ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`} onClick={handlePageClick(i)}>
            {i}
          </button>
        );
      } else if (paginationItems[paginationItems.length - 1].key !== '...') {
        paginationItems.push(<span key="..." className="px-4 py-2">...</span>);
      }
    }

    paginationItems.push(
      <button key="next" className="bg-blue-500 text-white m-1 px-3 py-1 rounded" onClick={handlePageClick(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    );

    return paginationItems;
  };
  return (
    <div className="container mx-auto">
   <div className="flex ">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">Search</h1>
      </div>
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Return Date</label>
          <input
            type="date"
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            onChange={(e) => handleInputChange("returnDate", e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Organisation</label>
          <select
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            onChange={(e) => handleInputChange('targetOrgUid', e.target.value)}
          >
            <option value="">Select Organisation</option>
            {organisations.map(org => (
              <option key={org.uid} value={org.uid}>{org.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Order ID</label>
          <select
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            onChange={(e) => handleInputChange('orderId', e.target.value)}
          >
            <option value="">Select Order ID</option>
            {orderIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
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
        <div className="text-2xl text-orange-400">Returns</div>
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
          {/* <Button color="warning" className="shadow-md"><Upload size={20} className='pr-1' />Add</Button> */}
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        {/* Table headers */}
        <thead>
          <tr>
            <th
              className="px-2 py-2 cursor
-pointer"
              onClick={() => handleSort("userId")}
            >
              ID{" "}
              {/* {sortConfig.key === "userId"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ORDER #{" "}
              {/* {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              PRODUCT
              {/* {sortConfig.key === "title"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("completed")}
            >
              QUANTITY{" "}
              {/* {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer w-[200px] text-center"
              onClick={() => handleSort("completed")}
            >
              QTY. RETURNED TO STOCK{" "}
              {/* {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("completed")}
            >
              Costumer
              {/* {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("completed")}
            >
              RETURN REQ.STATUS
              {/* {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("completed")}
            >
              DATE
              {/* {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
            <th
              className="px-2 py-2 cursor-pointer"
              onClick={() => handleSort("completed")}
            >
              ACTION
              {/* {sortConfig.key === "completed"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""} */}
            </th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {data && data.map((item) => (
            <tr key={item.id}>
              <td className="px-2 py-2"></td>
              <td className="px-2 py-2"></td>
              <td className="px-2 py-2 w-[180px]"></td>
              <td className="px-2 py-2 text-center">22</td>
              <td className="px-2 py-2 text-center">02</td>
              <td className="px-2 py-2 text-center">j@gmail.com</td>
              <td className="px-2 py-2">pending</td>
              <td className="px-2 py-2 text-center">20/12/2023</td>
              <td className="px-2 py-2">
                <div className="text-center">
               <Link href={"/station/sales/return/editreturn"}>   <Button className="p-0 bg-transparent hover:bg-transparent  text-black  dark:text-white">
                    <FilePenLine size={20}></FilePenLine>
                  </Button> </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">{renderPagination()}</div>
    </div>
  );
};

export default page;
