"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CallFor from '@/utilities/CallFor';
import { toast as reToast } from "react-hot-toast";
import Select from 'react-select';

function CategoriAdd() {
    const router = useRouter()

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [displayorder, setDisplayorder] = useState('');
    const [parentCategory, setParentCategory] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Fetch categories for the dropdown
        const fetchCategories = async () => {
            try {
                const response = await CallFor(
                    `v2/Common/GetCategoryDropDown`,
                    "post",
                    null,
                    "Auth"
                );
                // Log the response to understand its structure
                console.log("Fetched categories response:", response.data);



                if (response) {
                    // Transform data for react-select
                    const options = response.data.map(category => ({
                        value: category.id,
                        label: category.name
                    }));
                    console.log("Formatted options:", options);
                    setOptions(options);
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error.message);
            }
        };
        fetchCategories();
    }, []);


    const handleclick = async (e) => {
        e.preventDefault();

        const formData = {
            catid: 0,
            catname: name,
            catdesc: description,
            catfullpath: null,
            ispublished: categories,
            parentcatid: parentCategory ? parentCategory.value : 0,
            displayorder: displayorder
        };

        try {
            setLoading(true);
            const response = await CallFor(
                `v2/Common/SaveCategory`,
                "post",
                formData,
                "Auth"
            );

            setLoading(false);

            if (response) {
                reToast.success("Categories saved successfully!");
                router.push("/station/Catalogue/Categories");
            } else {
                reToast.error("Error saving Categories.");
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }

        console.log('formData', JSON.stringify(formData));
    };

    return (
        <div>
            <form className="max-w-7xl mx-auto p-6   rounded-md shadow-md">
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-orange-500 text-2xl bold'>Categories</div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="productName" className="w-1/4 font-medium dark:text-white text-gray-700">Name*</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="fullDescription" className="w-1/4 font-medium dark:text-white text-gray-700">Description</label>
                        <textarea
                            id="fullDescription"
                            name="fullDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="Displayorder" className="w-1/4 font-medium dark:text-white text-gray-700">Display order
</label>
                        <input
                        type='number'
                            id="Displayorder"
                            name="Displayorder"
                            value={displayorder}
                            onChange={(e) => setDisplayorder(e.target.value)}
                            rows="3"
                            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></input>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="parentCategory" className="w-1/4 font-medium dark:text-white text-gray-700">Parent Category</label>
                        <Select
                            id="parentCategory"
                            name="parentCategory"
                            value={parentCategory}
                            onChange={setParentCategory}
                            options={options}
                            className="flex-grow z-20 text-black"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="categories" className="w-1/4 font-medium dark:text-white text-gray-700">Is Enabled</label>
                        <div>
                            <Switch
                                checked={categories}
                                onCheckedChange={(checked) => setCategories(checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Link href={"/station/Catalogue/Categories"}>
                        <button type="button" className="mt-6 me-3 px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none">Cancel</button>
                    </Link>
                    <button type="submit" className="mt-6 px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none" onClick={handleclick}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default CategoriAdd;
