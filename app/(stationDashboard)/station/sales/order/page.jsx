"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Eye, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import CallFor from "@/utilities/CallFor";
import Pagination from "@/components/pagination/Pagination";
const Order = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [organisations, setOrganisations] = useState([]);
  const [searchParams, setSearchParams] = useState({
    orderDate: "",
    deliveryDate: "",
    targetOrgUid: null,
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize]);

  const fetchInitialData = async () => {
    try {
      const response = await CallFor(`v2/Orders/GetOrdersV2`,"get",null,"Auth");
      setOrganisations(response.data.dropdowns.organisations);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await CallFor(
        "v2/Orders/GetOrdersV2/false",
        "POST",
        {
          orderDate: searchParams.orderDate || "0001-01-01T00:00:00",
          deliveryDate: searchParams.deliveryDate || "0001-01-01T00:00:00",
          targetOrgUid: searchParams.targetOrgUid,
          paginationFilter: {
            pageNumber: page,
            pageSize: pageSize,
          }
        },
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

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = () => {
    setPage(1);
    fetchOrders();
  };

  const handleInputChange = (field, value) => {
    setSearchParams({ ...searchParams, [field]: value });
  };

 

  const getOrderStatus = (status) => {
    switch (status) {
      case 1: return "New";
      case 2: return "Confirmed";
      case 3: return "Rejected";
      case 4: return "Delivered";
      case 59: return "Partially Delivered";
      case 60: return "Completed";
      case 61: return "Returned";
      default: return "Unknown";
    }
  };

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case 1: return " rounded-full bg-blue-500 text-white"; // New
      case 2: return " rounded-full bg-green-500 text-white"; // Confirmed
      case 3: return " rounded-full bg-red-500 text-white"; // Rejected
      case 4: return " rounded-full bg-yellow-500 text-white"; // Delivered
      case 59: return " rounded-full bg-purple-400 text-white"; // Partially Delivered
      case 60: return " rounded-full bg-teal-500 text-white"; // Completed
      case 61: return " rounded-full bg-orange-500 text-white"; // Returned
      default: return " rounded-full bg-gray-500 text-white"; // Unknown
    }
  };

  const OrderStatusCell = ({ status }) => (
    <div className={`px-2 mt-2 ${getOrderStatusStyle(status)}`}>
      {getOrderStatus(status)}
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex">
        <SearchIcon className="text-gray-500" size={19} />
        <h1 className="text-[20px] font-semibold mb-4 pl-2">Search</h1>
      </div>

      {/* Search inputs */}
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Order Date</label>
          <input
            type="date"
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            value={searchParams.orderDate}
            onChange={(e) => handleInputChange("orderDate", e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Delivery Date</label>
          <input
            type="date"
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            value={searchParams.deliveryDate}
            onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
          />
        </div>
        <div className="flex items-center mb-2">
          <label className="w-1/4 font-medium mr-2">Organisation</label>
          <select
            className="border border-gray-300 px-4 py-2 rounded w-3/4"
            value={searchParams.targetOrgUid || ""}
            onChange={(e) => handleInputChange("targetOrgUid", e.target.value)}
          >
            <option value="">Select Organisation</option>
            {organisations.map((org) => (
              <option key={org.uid} value={org.uid}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center lg:mb-1 mb-3 items-center">
        <Button color="warning" className="shadow-md w-28" onClick={handleSearch}>
          <Search size={20} className="pr-1" />
          Search
        </Button>
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-2 py-2">ORDER</th>
            <th className="px-2 py-2">PAYMENT STATUS</th>
            <th className="px-2 py-2">SHIPPING STATUS</th>
            <th className="px-2 py-2">Customer</th>
            <th className="px-2 py-2">Created on</th>
            <th className="px-2 py-2">Order Total</th>
            <th className="px-2 py-2">ACTION</th>
          </tr>
        </thead>
       
          {/* Table data */}
          <tbody >
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-2 py-2">{item.orderid}</td>

                <td className="px-2 py-2 w-[200px]">{item.title}</td>
                <tr key={item.id} >
                  {/* Other table cells */}
                  <td className="px-2 py-2">
                    <OrderStatusCell status={item.orderstatus} />
                  </td>
                </tr>
                <td className="px-2 py-2">{item.buyerName}</td>
                <td className="px-2 py-2">{item.orderdate.split('T')[0]}</td>
                <td className="px-2 py-2">{item.ordertotal}</td>
                <td className="px-2 py-2">
                  <div className="text-center">
                    <Link href={`/station/sales/order/viewOrderDetails/${item.orderid}`}>
                      <Button className="p-0 bg-transparent hover:bg-transparent  text-black  dark:text-white">
                        <Eye size={20}></Eye>
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Pagination */}

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

export default Order;