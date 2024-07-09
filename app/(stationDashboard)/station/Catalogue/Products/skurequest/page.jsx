"use client";
import CallFor from '@/utilities/CallFor';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from "lucide-react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    keywords: '',
    price: '',
    specification: '',
    provariants: '',
    prouom: ''
  });
  const [specifications, setSpecifications] = useState([]);
  const [proVariants, setProVariants] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [uomOptions, setUomOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CallFor('v2/Common/GetCategoryDropDown', 'post', null, 'Auth');
        if (response) {
          const options = response.data.map(category => ({
            value: category.id,
            label: category.name
          }));
          setCategoryOptions(options);
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

  useEffect(() => {
    if (formData.category) {
      const fetchUOM = async () => {
        try {
          const response = await CallFor(`v2/Common/GetUOMDDL?CatId=${formData.category.value}`, 'get', null, 'Auth');
          if (response) {
            const options = response.data.map(uom => ({
              value: uom.id,
              label: uom.name
            }));
            setUomOptions(options);
          } else {
            throw new Error("Unexpected response format");
          }
        } catch (error) {
          console.error("Error fetching UOM:", error);
          setError(error.message);
        } 
      };
      fetchUOM();
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption });
  };

  const handleUOMChange = (selectedOption) => {
    setFormData({ ...formData, prouom: selectedOption });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSpecificationKeyPress = (e) => {
    if (e.key === 'Enter' && formData.specification.trim()) {
      setSpecifications([...specifications, formData.specification.trim()]);
      setFormData({ ...formData, specification: '' });
      e.preventDefault();
    }
  };

  const handleProVariantsChange = (e) => {
    setFormData({ ...formData, provariants: e.target.value });
    const variantsArray = e.target.value.split(',').map(variant => variant.trim()).filter(variant => variant);
    setProVariants(variantsArray);
  };

  const handleProVariantRemove = (index) => {
    const updatedVariants = proVariants.filter((_, i) => i !== index);
    setProVariants(updatedVariants);
    setFormData({ ...formData, provariants: updatedVariants.join(', ') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageId = 1; // Default watermark ID

    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append('Umurl', imageFile);
      imageFormData.append('Uid', 14063);
      imageFormData.append('Umid', 0);
      imageFormData.append('Umname', imageFile.name);
      imageFormData.append('Umalttext', "aa");
      imageFormData.append('Umsizes', imageFile.size);
      imageFormData.append('Umbytes', imageFile.size);
      imageFormData.append('Umextenstion', imageFile.name.split('.').pop());
      imageFormData.append('Umtype', 5);

      try {
        const imageResponse = await CallFor('v2/Product/SaveProductImages', 'POST', imageFormData, 'authWithContentTypeMultipart');

        if (imageResponse.status !== 200) {
          throw new Error('Image upload failed');
        }

        const imageResult = imageResponse.data;
        imageId = imageResult; // Assuming the response contains the ID
        console.log('Image uploaded successfully with ID:', imageId);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle image upload error
      }
    } else {
      console.log('No image file selected, using default image ID:', imageId);
    }

    const productData = {
      proid: 0,
      proname: formData.name,
      proconfig: null,
      prodescription: formData.description,
      shortdescription: formData.description,
      protype: true,
      proisactive: true,
      prouom: formData.prouom.value,
      proisfa: true,
      proorigin: 101,
      prodisplayinweb: true,
      expiryfrom: 0,
      ispurchasable: true,
      prowatermarkid: imageId,
      uoid: 72,
      catid: formData.category.value,
      price: parseFloat(formData.price),
      proSpecification: specifications,
      productags: proVariants,
    };

    console.log('Submitting product data:', productData);

    try {
      const response = await CallFor('v2/FixedAsset/SaveProductt', 'POST', productData, 'Auth');

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const result = response.data;
      console.log('Product saved successfully:', result);
      // Handle successful response
    } catch (error) {
      console.error('Error saving product:', error);
      // Handle error response
    }
  };

  return (
    <div className="p-6 rounded-lg space-y-4">
      <h2 className="text-3xl mb-5 font-bold text-orange-500">Add SKU Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Category</label>
          <Select
            value={formData.category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            className="w-3/4 text-black "
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className='flex items-center space-y-2'>
          <label className="w-1/4 text-sm font-medium">Image</label>

          <div className='w-3/4  pl-2 flex items-center flex-wrap gap-4'>
            {!imagePreview ? (
              <Label>
                <Button asChild>
                  <div>
                    <Upload className="mr-2 h-4 w-4" /> Choose File
                  </div>
                </Button>
                <Input type="file" className="hidden" onChange={handleImageChange} />
              </Label>
            ) : (
              <div className="relative h-36 rounded-xl">
                <img src={imagePreview} alt="Image Preview" className="w-full h-full border border-gray-300 rounded-md shadow-sm" />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-sm border border-white focus:outline-none"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Unit of Measure</label>
          <Select
            value={formData.prouom}
            onChange={handleUOMChange}
            options={uomOptions}
            className="w-3/4 text-black "
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Specification</label>
          <input
            type="text"
            name="specification"
            value={formData.specification}
            onChange={handleChange}
            onKeyPress={handleSpecificationKeyPress}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-3/4">
          {specifications.map((spec, index) => (
            <span key={index} className="flex items-center dark:text-black font-semibold bg-gray-200 p-2 rounded-md">
              {spec}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Keywords</label>
          <input
            type="text"
            name="provariants"
            value={formData.provariants}
            onChange={handleProVariantsChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center space-x-4 ">
          <label className="w-1/4  text-sm font-medium"></label>
          <div className="flex flex-wrap gap-2 w-3/4">
            {proVariants.map((variant, index) => (
              <div key={index} className="flex items-center dark:text-black font-semibold bg-gray-200 p-2 rounded-md">
                <span>{variant}</span>
                <button
                  type="button"
                  onClick={() => handleProVariantRemove(index)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Link href={"/station/Catalogue/Products/productadd"}>
            <button
              type="button"
              className="px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none"
          >
            Send SKU Request
          </button>
        </div>
      </form>
    </div>
  );
}
