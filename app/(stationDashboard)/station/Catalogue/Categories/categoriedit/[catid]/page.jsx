"use client";
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import CallFor from '@/utilities/CallFor';
import { toast as reToast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Select from 'react-select';

function Categoriedit({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [parentCategory, setParentCategory] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    catid: params.uid,
    catname: '',
    catdesc: '',
    catfullpath: null,
    parentcatid: '',
    ispublished: false,
    displayorder: ''
  });

  const GetCategoryDropDown = async () => {
    try {
      const response = await CallFor(`v2/Common/GetCategoryDropDown`, "POST", null, "Auth");
      if (response && response.data) {
        const options = response.data.map(category => ({
          value: category.id,
          label: category.name
        }));
        setOptions(options);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await CallFor(`v2/Common/GetCategoryById/${params.catid}`, "POST", null, "Auth");
      if (response && response.data.data) {
        const data = response.data.data;
        setFormData({
          catid: data.catid,
          catname: data.catname,
          catdesc: data.catdesc,
          catfullpath: data.catfullpath,
          parentcatid: data.parentcatid,
          ispublished: data.ispublished,
          displayorder: data.displayorder
        });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetCategoryDropDown().then(() => {
      fetchCategory().finally(() => {
        setLoading(false);
      });
    });
  }, [params.catid]);

  useEffect(() => {
    if (options.length > 0 && formData.parentcatid) {
      const parentCategoryOption = options.find(option => option.value === formData.parentcatid);
      setParentCategory(parentCategoryOption);
    }
  }, [options, formData.parentcatid]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : (name === 'displayorder' ? Number(value) : value);
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSwitchChange = (checked) => {
    setFormData({
      ...formData,
      ispublished: checked,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setParentCategory(selectedOption);
    setFormData({
      ...formData,
      parentcatid: selectedOption ? selectedOption.value : 0,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submissionData = {
      ...formData,
      parentcatid: formData.parentcatid || 0,
    };
    try {
      const response = await CallFor("v2/Common/Updatecategory", "POST", submissionData, "Auth");
      if (response) {
        reToast.success("Categories edited successfully!");
        router.push("/station/Catalogue/Categories");
      } else {
        reToast.error("Error editing Categories.");
      }
    } catch (error) {
      console.error('Error updating category:', error);
      reToast.error("Error editing Categories.");
    }
  };

  return (
    <div>
      <form className="max-w-7xl mx-auto p-6 bg-white dark:bg-black rounded-md shadow-md" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <div className="text-orange-500 text-2xl font-bold">Categories</div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="catname" className="w-1/4 font-medium dark:text-white text-gray-700">Name*</label>
            <input
              type="text"
              id="catname"
              name="catname"
              value={formData.catname}
              onChange={handleChange}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="catdesc" className="w-1/4 font-medium dark:text-white text-gray-700">Description</label>
            <textarea
              id="catdesc"
              name="catdesc"
              value={formData.catdesc}
              onChange={handleChange}
              rows="2"
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="displayorder" className="w-1/4 font-medium dark:text-white text-gray-700">Display Order</label>
            <input
              type='number'
              id="displayorder"
              name="displayorder"
              value={formData.displayorder}
              onChange={handleChange}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="parentCategory" className="w-1/4 font-medium dark:text-white text-gray-700">Parent Category</label>
            <Select
              id="parentCategory"
              name="parentCategory"
              value={parentCategory}
              onChange={handleSelectChange}
              options={options}
              className="flex-grow z-20 text-black"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="ispublished" className="w-1/4 font-medium dark:text-white text-gray-700">Published</label>
            <Switch
              checked={formData.ispublished}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/station/Catalogue/Categories">
            <button className="mt-6 me-3 px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none">Cancel</button>
          </Link>
          <button type="submit" className="mt-6 px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Categoriedit;
