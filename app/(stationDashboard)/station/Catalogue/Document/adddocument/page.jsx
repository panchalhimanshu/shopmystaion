"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File, FileUp, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CallFor from "@/utilities/CallFor";
import { toast as reToast } from "react-hot-toast";
import Select from "react-select";

const AddDocument = () => {
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [docType, setDocType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [DocTypeList, setDocTypeList] = useState([]);
  const [selectedDocTypeId, setSelectedDocTypeId] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);



  const handleCancelBtn = (e) => {
    e.preventDefault();
    router.push("/station/Catalogue/Document");
  };

  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const uoid = userData.orgid;

  useEffect(() => {
    const GetDocTypeList = async () => {
      setLoading(true);
      try {
        const response = await CallFor(
          "v2/document/GetDocTypeList",
          "GET",
          null,
          "Auth"
        );
        setDocTypeList(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const GetProductList = async () => {
      setLoading(true);
      try {
        const response = await CallFor(
          `v2/Product/GetProductDropDown?uoid=${uoid}`,
          "post",
          null,
          "Auth"
        );
        setProductList(
          response.data.map((product) => ({
            value: product.id,
            label: product.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    GetDocTypeList();
    GetProductList();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setSelectedFile(null);
        setSelectedFileName("");
        setError("Please upload a file of type PDF, PNG, JPG, or XLSX.");
        return;
      }

      const maxSizeInMB = 2;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setSelectedFile(null);
        setSelectedFileName("");
        setError("File size must be less than 2MB.");
        return;
      }

      setSelectedFile(file);
      setSelectedFileName(file.name);
      setError("");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setSelectedFileName("");
    setError("");
  };

  const handleSaveBtn = async (e) => {
    e.preventDefault();
    console.log("docName:", docName);
    console.log("selectedDocTypeId:", selectedDocTypeId);
    console.log("selectedFile:", selectedFile);
    console.log("selectedProductId:", selectedProductId);

    if (!docName || !selectedDocTypeId || !selectedFile || !selectedProductId) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("docfile", selectedFile);
    formData.append("docname", docName);
    formData.append("doctypeid", selectedDocTypeId);
    formData.append("entityid", selectedProductId);
    formData.append("entitytypeid", 1);
    // formData.append("productid", selectedProductId);

    setLoading(true);
    try {
      const response = await CallFor(
        "v2/document/SaveDocument",
        "POST",
        formData,
        "authWithContentTypeMultipart"
      );
      console.log("API Response:", response);
      if (response) {
        reToast.success("Document saved successfully!");
        router.push("/station/Catalogue/Document");
      } else {
        reToast.error("Error saving Document.");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="justify-between flex gap-1 pb-3">
        <div className="text-2xl text-orange-400">Upload DOCUMENT</div>
      </div>
      <form className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <label className="w-1/6 font-medium mr-2">Doc Name*</label>
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded w-3/4"
              placeholder="Enter document name"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-2">
            <label className="w-1/6 font-medium mr-2">Doc Type*</label>
            <select
              className="border border-gray-300 px-4 py-2 rounded w-3/4"
              value={selectedDocTypeId}
              onChange={(e) => setSelectedDocTypeId(e.target.value)}
            >
              <option value="">Select Document Type</option>
              {DocTypeList &&
                DocTypeList.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.doctypename}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center mb-2">
            <label className="w-1/6 font-medium mr-2">Product*</label>
            <Select
              className="w-3/4 text-black"
              options={ProductList}
              value={ProductList.find(option => option.value === selectedProductId)}
              onChange={(option) => setSelectedProductId(option.value)}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/6 font-medium mr-2">Upload File*</label>
            <Label className="w-3/4 block">
              <Input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                asChild
                className="w-[100%] flex justify-end text-black dark:text-white border border-gray-300 hover:bg-transparent bg-transparent"
              >
                <div>
                  <FileUp size={20} />
                </div>
              </Button>
            </Label>
          </div>

          <div className="flex items-center mb-2 mt-1">
            <label className="w-1/6 font-medium mr-2"></label>
            {selectedFileName && (
              <div className="flex text-gray-600 dark:text-white font-semibold items-center">
                <File size={20} className="mr-1" />
                {selectedFileName}
                <Trash2
                  size={20}
                  className="ml-1 text-warning cursor-pointer"
                  onClick={handleFileDelete}
                />
              </div>
            )}
          </div>
          {error && (
            <div className="flex items-center mb-2 mt-1">
              <label className="w-1/6 font-medium mr-2"></label>
              <div className="text-red-500">{error}</div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button
            className="text-white bg-blue-950 m-5"
            onClick={handleCancelBtn}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-orange-400"
            onClick={handleSaveBtn}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddDocument;
