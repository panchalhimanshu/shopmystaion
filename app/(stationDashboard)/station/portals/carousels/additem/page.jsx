"use client"
import React, { useState, useEffect } from "react";
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

const ProductListModal = ({ onSelectProducts, cid }) => {
    console.log(cid, "cid")
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [bodyData, setBodyData] = useState(null);
    const [searchFields, setSearchFields] = useState({
        SearchProductName: "",
        SearchCategoryId: "0",
        SearchManufacturerId: "0",
        SearchStoreId: "0",
        SearchVendorId: "1",
        SearchProductTypeId: "0",
    });

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableManufacturers, setAvailableManufacturers] = useState([]);
    const [availableStores, setAvailableStores] = useState([]);
    const [availableProductTypes, setAvailableProductTypes] = useState([]);



    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const response = await CallFor2(
                `api/OCarouselVendorShopAdminAPI/ProductAddPopup/${cid}`,
                "GET",
                null,
                "Auth"
            );
            setBodyData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await CallFor2(
                `api/OCarouselVendorShopAdminAPI/ProductAddPopupList`,
                "POST",
                {
                    ...bodyData,
                    SearchProductName: searchFields.SearchProductName,
                    SearchCategoryId: searchFields.SearchCategoryId,
                    SearchManufacturerId: searchFields.SearchManufacturerId,
                    SearchStoreId: searchFields.SearchStoreId,
                    SearchProductTypeId: searchFields.SearchProductTypeId,
                    Page: currentPage,
                    PageSize: totalPages,
                    Start: (currentPage - 1) * itemsPerPage,
                    Length: itemsPerPage,
                },
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
        fetchInitialData();
    }, [cid]);

    useEffect(() => {
        if (bodyData) {
            fetchData();
        }
    }, [currentPage, itemsPerPage, bodyData]);

    useEffect(() => {
        if (bodyData) {
            setAvailableCategories(bodyData.AvailableCategories);
            setAvailableManufacturers(bodyData.AvailableManufacturers);
            setAvailableStores(bodyData.AvailableStores);
            setAvailableProductTypes(bodyData.AvailableProductTypes);
        }
    }, [bodyData]);

    const handleConfirmSelection = async () => {
        try {
            const response = await CallFor2(
                'api/OCarouselVendorShopAdminAPI/ProductAddPopup',
                'POST',
                {
                    OCarouselId: cid,
                    SelectedProductIds: selectedProductIds
                },
                'Auth'
            );

            // Handle the response as needed
            console.log('API Response:', response);

            // Call the onSelectProducts prop function
            onSelectProducts(selectedProductIds);

            // Close the modal or handle as needed
            // You might want to add a state to control the modal visibility
        } catch (error) {
            console.error('Error calling API:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

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

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedProductIds(data.map(item => item.Id));
        } else {
            setSelectedProductIds([]);
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

    return (
        <Dialog  className="">
            <DialogTrigger asChild>
                <Button variant="outline">Open Product List</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80vw] w-full">
                <DialogHeader>
                    <DialogTitle>Product List</DialogTitle>
                    <DialogDescription>Search and select products</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-y-4 mb-4">
                <div className="flex gap-x-1">
                <label>Product<br/> name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="border p-2 ms-2 rounded w-[100px]"
                        value={searchFields.SearchProductName}
                        onChange={(e) => handleInputChange("SearchProductName", e.target.value)}
                    />
                </div>


<div className="flex gap-x-2">
<label>Product <br/> type</label>
                    <select
                        className="border p-2 ms-2 rounded w-[100px]"
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
                                        checked={selectedProductIds.length === data.length}
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
                                    <td className="px-4 py-2">{item.Id}</td>
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
                    <DialogClose asChild>
                        <Button onClick={handleConfirmSelection} variant="outline">Confirm Selection</Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductListModal;
