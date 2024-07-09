"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { Eye, FilePenLine, Plus, Search, SearchIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CallFor2 from '@/utilities/CallFor2';
import DeleteDialog from "@/components/DeleteDialog"; // Import DeleteDialog component


const deleiveryscedule = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete dialog
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user id
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearchFields, setTempSearchFields] = useState({
    Name: '',
    "To Time": '',
    "From Time": '',
    Status: ''
  });
  const [searchFields, setSearchFields] = useState({
    userId: '',
    id: '',
    title: '',
    completed: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  // const 

  useEffect(() => {
    getListBody();
  }, []);

  const getListBody = async () => {
    try {
      setLoading(true);
      const response = await CallFor2('api-fe/DeliverySlotAdminAPI/List', 'GET', null, 'Auth');
      if (response.status === 200) {
        console.log(response.data, "res")
        getDelieveryList(response.data)
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const getDelieveryList = async (data) => {
    const response = await CallFor2('api-fe/DeliverySlotAdminAPI/List', 'POST', data, 'Auth')
    if (response.status === 200) {
      console.log(response.data.Data, "respo")
      setData(response.data.Data)
    }
  }

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
    let direction = 'asc';
    if (sortConfig.key === columnName && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnName, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter(item => {
    for (let key in searchFields) {
      if (searchFields[key] !== '') {
        const itemValue = item[key]?.toString().toLowerCase() || '';
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
    <>
      <div className="container mx-auto">
        <div className="flex ">
          <SearchIcon className="text-gray-500" size={19} />
          <h1 className="text-[20px] font-semibold mb-4 pl-2">SEARCH</h1>
        </div>
        {/* Search inputs */}
        <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Search input for each field */}
          {Object.keys(tempSearchFields).map((field) => (
            <div key={field} className="flex items-center mb-2">
              <label className="w-1/4 font-medium mr-2">{field}</label>
              {field === "Status" ? (
                <select
                  className="border border-gray-300 px-4 py-2 rounded w-3/4"
                  onChange={(e) => handleInputChange(field, e.target.value)}
                >
                  <option value=""></option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
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
          <div className="text-2xl text-orange-400">SCHEDULING LIST</div>
          <Button
            color="warning"
            className="shadow-md"
            onClick={() =>
              router.push(
                "/station/station/delievery_scheduling/adddelieveryscheduling"
              )
            }
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
              {/* <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              NAME{" "}
              {sortConfig.key === "title"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th> */}
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("completed")}
              >
                Time slot{" "}
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
                Display order{" "}
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
                STATUS{" "}
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
                Action{" "}
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
                <td className="px-4 py-2">{item.Id}</td>
                <td className="px-4 py-2">{item.TimeSlot}</td>
                <td className="px-4 py-2">{item.DisplayOrder}</td>
                <td className="px-4 py-2">{item.Active === true ?
                  <span className='text-white bg-green-500 p-1 rounded-md'>Active</span>
                  : <span className='text-white bg-red-500  p-1 rounded-md'>Inactive</span>}</td>
                <td className="px-4 py-2">
                  <div>
                    <Link
                      href={
                        `/station/station/delievery_scheduling/viewdelieveryscheduling/${item.Id}`
                      }
                    >
                      <Button className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white">
                        <Eye size={20}></Eye>
                      </Button>
                    </Link>

                    <Button
                      className="p-0 mr-2 bg-transparent hover:bg-transparent text-black  dark:text-white"
                      onClick={() =>
                        router.push(
                          `/station/station/delievery_scheduling/editdelieveryScheduling/${item.Id}`
                        )
                      }
                    >
                      <FilePenLine size={20}></FilePenLine>
                    </Button>
                    <Button className="p-0 bg-transparent hover:bg-transparent text-black  dark:text-white"
                     onClick={() => handleDeleteUser(item.Id)} // Open delete dialog on click
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
      </div>
       {/* Delete Dialog */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        callfor={CallFor2}
        onDelete={() => {
          getListBody(); // Refresh data after deletion
          setIsDeleteDialogOpen(false); // Close delete dialog
        }}
        delUrl={`api-fe/DeliverySlotAdminAPI/Delete/${selectedUserId}`} // Pass delete URL
      />
    </>
  );
};

export default deleiveryscedule;
