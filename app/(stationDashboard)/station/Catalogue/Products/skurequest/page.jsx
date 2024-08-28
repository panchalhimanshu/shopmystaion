
"use client";
import CallFor from "@/utilities/CallFor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast as reToast } from "react-hot-toast";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [ManufacturerDropDown, setManufacturerDropDown] = useState([]);
  const [Manufacturerid, setManufacturerid] = useState([]);
  const [uomOptions, setUomOptions] = useState([]);
  const [specifications, setSpecifications] = useState([{ attributeName: "", attributeValues: [""] }]);
  const [proVariants, setProVariants] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: null,
    description: "",
    keywords: "",
    price: "",
    prouom: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const Uid = userData.uid ;
  const orgid = userData.orgid


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.object().required("Category is required"),
    description: Yup.string().required("Description is required"),
    prouom: Yup.object().required("Unit of Measure is required"),
    imageFile: Yup.mixed().required("Image file is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(
        { ...formData, imageFile },
        { abortEarly: false }
      );
      setValidationErrors({});

      let imageId = 1; // Default watermark ID

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("Umurl", imageFile);
        imageFormData.append("Uid", Uid);
        imageFormData.append("Umid", 0);
        imageFormData.append("Umname", imageFile.name);
        imageFormData.append("Umalttext", "aa");
        imageFormData.append("Umsizes", imageFile.size);
        imageFormData.append("Umbytes", imageFile.size);
        imageFormData.append("Umextenstion", imageFile.name.split(".").pop());
        imageFormData.append("Umtype", 2);

        try {
          const imageResponse = await CallFor(
            "v2/Product/SaveProductImages",
            "POST",
            imageFormData,
            "authWithContentTypeMultipart"
          );

          if (imageResponse.status !== 200) {
            throw new Error("Image upload failed");
          }

          const imageResult = imageResponse.data;
          imageId = imageResult; // Assuming the response contains the ID
          console.log("Image uploaded successfully with ID:", imageId);
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle image upload error
        }
      } else {
        console.log("No image file selected, using default image ID:", imageId);
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
        proisfa: false,
        proorigin: 1,
        prodisplayinweb: true,
        expiryfrom: 0,
        ispurchasable: true,
        manufacturerid: Manufacturerid?.value,
        prowatermarkid: imageId,
        uoid: orgid,
        catid: formData.category.value,
        price: parseFloat(formData.price) || 0, // default to 0 if price is not provided
        specification: specifications.map(spec => ({
          attributename: spec.attributeName,
          attributevalues: spec.attributeValues.map(value => ({
            avname: value,
          })),
        })),
        productags: proVariants,
      };

      console.log("Submitting product data:", productData);

      try {
        const response = await CallFor(
          "v2/Product/SaveProduct",
          "POST",
          productData,
          "Auth"
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const result = response.data;
        console.log("Product saved successfully:", result);
        reToast.success("SKU request sent successfully!");

        // Reset form
        setFormData({
          name: "",
          category: null,
          description: "",
          keywords: "",
          price: "",
          prouom: null,
        });
        setSpecifications([{ attributeName: "", attributeValues: [""] }]);
        setProVariants([]);
        setImageFile(null);
        setImagePreview(null);
        router.push("/station/Catalogue/Products/productadd");
      } catch (error) {
        console.error("Error saving product:", error);
        reToast.error("Failed to send SKU request");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};
        err.inner.forEach((validationError) => {
          errors[validationError.path] = validationError.message;
        });
        setValidationErrors(errors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const GetDropDown = async () => {
    try {
      const response = await CallFor(
        `v2/Product/SaveProduct`,
        "get",
        null,
        "Auth"  
      );
      setManufacturerDropDown(
        response.data.dropdowns.manufacturer.map((product) => ({
          value: product.id,
          label: product.name,
        }))
      );
      if (response) {
        const options = response.data.dropdowns.categories.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategoryOptions(options);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log(error);
    }
  
  };

   

  useEffect(() => {
    GetDropDown()
   
  }, []);

  useEffect(() => {
    if (formData.category) {
      const fetchUOM = async () => {
        try {
          const response = await CallFor(
            `v2/Common/GetUOMDDL?CatId=${formData.category.value}`,
            "get",
            null,
            "Auth"
          );
          if (response) {
            const options = response.data.map((uom) => ({
              value: uom.id,
              label: uom.name,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error for the input field
    setValidationErrors((errors) => ({ ...errors, [name]: "" }));
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear validation error for the select field
    setValidationErrors((errors) => ({ ...errors, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    // Clear image file validation error
    setValidationErrors((errors) => ({ ...errors, imageFile: "" }));
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleProVariantsChange = (e) => {
    const variantsArray = e.target.value
      .split(",")
      .map((variant) => variant.trim())
      .filter((variant) => variant);
    setProVariants(variantsArray);
    setFormData({ ...formData, provariants: e.target.value });
  };

  const handleProVariantRemove = (index) => {
    const updatedVariants = proVariants.filter((_, i) => i !== index);
    setProVariants(updatedVariants);
    setFormData({ ...formData, provariants: updatedVariants.join(", ") });
  };

  const handleSpecificationChange = (index, name, value) => {
    const updatedSpecifications = [...specifications];
    if (name === "attributeName") {
      updatedSpecifications[index].attributeName = value;
    } else if (name === "attributeValues") {
      updatedSpecifications[index].attributeValues = value.split(",").map(v => v.trim());
    }
    setSpecifications(updatedSpecifications);
  };

  const handleAddSpecification = (e) => {
    e.preventDefault(); // Add this line to prevent form submission
    setSpecifications([...specifications, { attributeName: "", attributeValues: [""] }]);
  };

  const handleRemoveSpecification = (index, e) => {
    e.preventDefault();
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
  };

  return (
    <div className="p-6 rounded-lg space-y-4">
      <h2 className="text-3xl mb-5 font-bold text-orange-500">
        Add SKU Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-3/4 p-2 border ${validationErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300`}
            />
          </div>
          {validationErrors.name && (
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-sm font-medium"></label>
              <div className="text-red-500 text-sm">
                {validationErrors.name}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-medium">Category</label>
            <Select
              value={formData.category}
              onChange={(value) => handleSelectChange("category", value)}
              options={categoryOptions}
              className={`w-3/4 text-black ${validationErrors.category ? "border-red-500" : ""
                }`}
            />
          </div>
          {validationErrors.category && (
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-sm font-medium"></label>
              <div className="text-red-500 text-sm">
                {validationErrors.category}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium ">Manufactures</label>
          <Select
            id="product"
            name="product"
            value={Manufacturerid}
            onChange={setManufacturerid}
            options={ManufacturerDropDown}
            className="w-3/4 mt-1 text-black  block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />

        </div>
        <div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-3/4 p-2 border ${validationErrors.description
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300`}
            />
          </div>
          {validationErrors.description && (
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-sm font-medium"></label>
              <div className="text-red-500 text-sm">
                {validationErrors.description}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center space-y-2">
            <label className="w-1/4 text-sm font-medium">Image</label>
            <div className="w-3/4 pl-2 flex items-center flex-wrap gap-4">
              {!imagePreview ? (
                <Label>
                  <Button asChild>
                    <div>
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </div>
                  </Button>
                  <Input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </Label>
              ) : (
                <div className="relative h-36 rounded-xl">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-full h-full border border-gray-300 rounded-md shadow-sm"
                  />
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
          {validationErrors.imageFile && (
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-sm font-medium"></label>
              <div className="text-red-500 text-sm">
                {validationErrors.imageFile}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 text-sm font-medium">Unit of Measure</label>
            <Select
              value={formData.prouom}
              onChange={(value) => handleSelectChange("prouom", value)}
              options={uomOptions}
              className={`w-3/4 ${validationErrors.prouom ? "border-red-500" : ""
                }`}
            />
          </div>
          {validationErrors.prouom && (
            <div className="flex items-center space-x-4">
              <label className="w-1/4 text-sm font-medium"></label>
              <div className="text-red-500 text-sm">
                {validationErrors.prouom}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-3/4 p-2 border ${validationErrors.price ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300`}
          />
        </div>

        <div className="flex space-x-4 pb-3">
          <Label className="w-1/4 text-sm pt-2 font-medium">Specifications</Label>
          <div className="w-3/4 relative">
            {specifications.map((spec, index) => (
              <div key={index} className="mb-4 pr-3 relative">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          value={spec.attributeName}
                          onChange={(e) =>
                            handleSpecificationChange(index, "attributeName", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Attribute name"
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          value={spec.attributeValues.join(", ")}
                          onChange={(e) =>
                            handleSpecificationChange(index, "attributeValues", e.target.value)
                          }
                          className="mt-1"
                          placeholder="Attribute values (comma-separated)"
                        />
                      </div>
                  </div>
                {index !== 0 && (
                  <Button
                    type="button" // Add this line to explicitly set the button type
                    onClick={(e) => handleRemoveSpecification(index, e)} // Pass the event object
                    className="absolute top-2 -right-5 mt-1 mr-2 rounded-full px-[5px] h-4 bg-red-500 text-white"
                  >
                    x
                  </Button>
                )}
              </div>
            ))}
          
            <Button
              type="button" // Add this line to explicitly set the button type
              onClick={handleAddSpecification}
              className="absolute -bottom-2 left-0 mt-4 h-4 rounded px-1 bg-blue-500 text-white"
            >
              +
            </Button>
          </div>
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
          <label className="w-1/4 text-sm font-medium"></label>
          <div className="flex flex-wrap gap-2 w-3/4">
            {proVariants.map((variant, index) => (
              <div
                key={index}
                className="flex items-center dark:text-black font-semibold bg-gray-200 p-2 rounded-md"
              >
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
          <Link href={"/station/Catalogue/Requests"}>
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