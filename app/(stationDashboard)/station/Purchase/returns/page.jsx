"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Eye, Plus, Search, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import CallFor from '@/utilities/CallFor';
import Pagination from "@/components/pagination/Pagination";
const Returns = () => {
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
        `v2/Orders/GetOrderReturns/false`, 
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

  const fetchReturns = async ( filters) => {
    try {
      setLoading(true);
      const requestBody = {
          returnDate: filters.returnDate || "0001-01-01T00:00:00",
          targetOrgUid: filters.targetOrgUid || null,
          orderId: filters.orderId || null,
          paginationFilter: {
            pageNumber: page,
            pageSize: pageSize,
          }

      };
      const response = await CallFor(
        `v2/Orders/GetOrderReturnsByOrgId/false`, 
        "post", 
        requestBody, 
        "Auth"
      );

      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.count / pageSize));
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
      fetchReturns(searchFields);
  }, [organisations,page,pageSize , searchFields]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = () => {
    console.log(tempSearchFields , "serch")
    setSearchFields(tempSearchFields);
    setPage(1);
  };

  const handleInputChange = (columnName, value) => {
    setTempSearchFields({ ...tempSearchFields, [columnName]: value });
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
      <div className="flex justify-between gap-1 pb-3">
        <div className="text-2xl text-orange-400">Returns</div>
        <div className="">
          <Link href="/station/Purchase/returns/addwastage">
            <Button color="warning" className="shadow-md">
              <Plus size={20} className="pr-1" />
              Add Wastage
            </Button>
          </Link>
        </div>
      </div>

      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-2">#</th>
            <th className="px-2 py-2">PO No</th>
            <th className="px-2 py-2">DATE</th>
            <th className="px-2 py-2">WAREHOUSE</th>
            <th className="px-2 py-2">TOTAL QUANTITY</th>
            <th className="px-2 py-2">RETURN QUANTITY</th>
            <th className="px-2 py-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-2 py-2">{item.returnId}</td>
              <td className="px-2 py-2">{item.odtitemsmapping.odtid}</td>
              <td className="px-2 py-2">{item.createddate.split("T")[0]}</td>
              <td className="px-2 py-2">{}</td>
              <td className="px-2 py-2">{item.odtitemsmapping.deliveredqty}</td>
              <td className="px-2 py-2">{item.returnquantity}</td>
              <td className="px-2 py-2">
                <Link href={`/station/Purchase/returns/viewreturns/${item.returnId}`}>
                  <Button
                    color="warning"
                    className="p-0 dark:text-white text-black text-sm px-1 bg-transparent hover:bg-transparent"
                  >
                    <Eye size={15}></Eye>
                  </Button>
                </Link>
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
    </div>
  );
};

export default Returns;