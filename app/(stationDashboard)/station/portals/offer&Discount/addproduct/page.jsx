"use client"
import React, { useState, useEffect,useRef } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { Download, Search, Check, Eye, FilePenLine, Trash } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import Pagination from "@/components/pagination/Pagination";
import CallFor2 from "@/utilities/CallFor2";
import { Checkbox } from "@/components/ui/checkbox";

const ProductList = ({ onSelectProducts, Id,onProductsAdded ,onRefresh  }) => {
    const [data, setData] = useState([]);
    const [bodyData, setBodyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const closeDialogRef = useRef(null);

    const [searchFields, setSearchFields] = useState({
        SearchProductName: "",
        SearchCategoryId: "0",
        SearchManufacturerId: "0",
        SearchStoreId: "0",
        SearchVendorId: "0",
        SearchProductTypeId: "0",
    });

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableManufacturers, setAvailableManufacturers] = useState([]);
    const [availableStores, setAvailableStores] = useState([]);
    const [availableVendors, setAvailableVendors] = useState([]);
    const [availableProductTypes, setAvailableProductTypes] = useState([]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const response = await CallFor2(
                `Discount/admin-api/ProductAddPopup/${Id}`,
                "GET",
                null,
                "Auth"
            );
            setBodyData(response.data);
            setAvailableCategories(response.data.AvailableCategories);
            setAvailableManufacturers(response.data.AvailableManufacturers);
            setAvailableStores(response.data.AvailableStores);
            setAvailableVendors(response.data.AvailableVendors);
            setAvailableProductTypes(response.data.AvailableProductTypes);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [Id]);

    const fetchData = async () => {
        if (!bodyData) return;

        setLoading(true);
        try {
            const postData = {
                ...bodyData,
                ...searchFields,
                Page: currentPage,
                PageSize: itemsPerPage,
            };

            const response = await CallFor2(
                `Discount/admin-api/ProductAddPopupList`,
                "POST",
                postData,
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
        if (bodyData) {
            fetchData();
        }
    }, [currentPage, itemsPerPage, bodyData]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchData();
    };

    const handleInputChange = (field, value) => {
        setSearchFields({ ...searchFields, [field]: value });
    };

    const handleSort = (columnName) => {
        let direction = "asc";
        if (sortConfig.key === columnName && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key: columnName, direction });
    };

    const handleCheckboxChange = (id) => {
        setSelectedProductIds(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            // Add all currently visible product IDs to the selection
            const visibleProductIds = sortedData.map(item => item.Id);
            setSelectedProductIds(prevSelected => {
                const newSelection = new Set([...prevSelected, ...visibleProductIds]);
                return Array.from(newSelection);
            });
        } else {
            // Remove all currently visible product IDs from the selection
            const visibleProductIds = new Set(sortedData.map(item => item.Id));
            setSelectedProductIds(prevSelected =>
                prevSelected.filter(id => !visibleProductIds.has(id))
            );
        }
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

    const handleConfirmSelection = async () => {
        try {
            const response = await CallFor2(
                'Discount/admin-api/ProductAddPopup',
                'POST',
                {
                    DiscountId: parseInt(Id),
                    SelectedProductIds: selectedProductIds
                },
                'Auth'
            );
           onSelectProducts(selectedProductIds);

      // Close the dialog

      if(response)
      {
        onRefresh()
        setIsOpen(false);
      }
      
      onProductsAdded();
      
      // Reset selected products
      setSelectedProductIds([]);
        } catch (error) {
            console.error('Error calling API:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" >Open Product List</Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-auto">
                <DialogHeader>
                    <DialogTitle>Product List</DialogTitle>
                    {/* <DialogDescription>Search and select products</DialogDescription> */}
                </DialogHeader>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-4">
                    <div className="flex ">
                        <label>Product name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="border p-2 rounded w-[100px]"
                        value={searchFields.SearchProductName}
                        onChange={(e) => handleInputChange("SearchProductName", e.target.value)}
                    />
                    </div>

                    <div className="flex gap-x-3">
                        <label>Product type</label>
                   
                    <select
                        className="border p-2 rounded w-[100px]"
                        value={searchFields.SearchCategoryId}
                        onChange={(e) => handleInputChange("SearchCategoryId", e.target.value)}
                    >
                        {availableCategories.map((category) => (
                            <option key={category.Value} value={category.Value}>
                                {category.Text}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div className="flex gap-x-2">
                    <label>Category</label>

                    <select
                        className="border p-2 rounded w-[100px]"
                        value={searchFields.SearchManufacturerId}
                        onChange={(e) => handleInputChange("SearchManufacturerId", e.target.value)}
                    >
                        {availableManufacturers.map((manufacturer) => (
                            <option key={manufacturer.Value} value={manufacturer.Value}>
                                {manufacturer.Text}
                            </option>
                        ))}
                    </select>
                    </div>



                    <div className="flex gap-x-2">
                    <label>Manufacturer</label>
                    <select
                        className="border p-2 rounded w-[100px]"
                        value={searchFields.SearchStoreId}
                        onChange={(e) => handleInputChange("SearchStoreId", e.target.value)}
                    >
                        {availableStores.map((store) => (
                            <option key={store.Value} value={store.Value}>
                                {store.Text}
                            </option>
                        ))}
                    </select>
                    </div>



                    <div className="flex gap-x-2">
                    <label>Vendor</label>
                    <select
                        className="border p-2 rounded w-[100px]"
                        value={searchFields.SearchVendorId}
                        onChange={(e) => handleInputChange("SearchVendorId", e.target.value)}
                    >
                        {availableVendors.map((vendor) => (
                            <option key={vendor.Value} value={vendor.Value}>
                                {vendor.Text}
                            </option>
                        ))}
                    </select>
                    </div>



                    <div className="flex gap-x-2">
                    <label>Product name</label>
                    <select
                        className="border p-2 rounded w-[100px]"
                        value={searchFields.SearchProductTypeId}
                        onChange={(e) => handleInputChange("SearchProductTypeId", e.target.value)}
                    >
                        {availableProductTypes.map((productType) => (
                            <option key={productType.Value} value={productType.Value}>
                                {productType.Text}
                            </option>
                        ))}
                    </select>
                    </div>

                </div>
                <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
                <div className="mt-4 max-h-96 overflow-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">
                                    <Checkbox
                                        checked={sortedData.length > 0 && sortedData.every(item => selectedProductIds.includes(item.Id))}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("Name")}>
                                    Name {sortConfig.key === "Name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th className="px-4 py-2">Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item) => (
                                <tr key={item.Id}>
                                    <td className="px-4 py-2">
                                        <Checkbox
                                            checked={selectedProductIds.includes(item.Id)}
                                            onCheckedChange={() => handleCheckboxChange(item.Id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">{item.Name}</td>
                                    <td className="px-4 py-2">
                                        {item.Published ? <Check className="text-green-500" /> : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <DialogFooter>
                    <Button onClick={handleConfirmSelection}  variant="outline">Confirm Selection</Button>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductList;