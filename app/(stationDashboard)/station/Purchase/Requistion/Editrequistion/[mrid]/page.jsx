"use client";
import CallFor from "@/utilities/CallFor";
import Select from 'react-select';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast as reToast } from "react-hot-toast";
import * as yup from 'yup';

const sharedClasses = {
  border: "border border-zinc-300 dark:border-zinc-700 rounded p-2",
  button: "p-2 rounded",
};

// Define Yup validation schema
const requisitionSchema = yup.object().shape({
  mrdate: yup.date().required("Requisition date is required"),
  mrrequireddate: yup.date().required("Due date is required"),
  selectedWarehouse: yup.object().nullable().required("Warehouse is required"),
  items: yup.array().of(
    yup.object().shape({
      selectedProductId: yup.object().nullable().required("Product is required"),
      quantities: yup.number().required("Quantity is required").min(1, "Quantity must be at least 1"),
      selectedAttributes: yup.array().min(1, "At least one attribute is required")
    })
  ).min(1, "At least one item is required")
});

const updateRequisition = ({ params }) => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [productList, setProductList] = useState([]);
  const [productAttributes, setProductAttributes] = useState({});
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [requisitionData, setRequisitionData] = useState(null);
  const [errors, setErrors] = useState({});
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const orgid = userData.orgid;
  const uid = userData.uid;

  useEffect(() => {
    GetProductList();
  }, [params.mrid]);

  useEffect(() => {
    if (warehouseOptions.length > 0 && productList.length > 0) {
      fetchRequisitionData();
    }
  }, [warehouseOptions, productList]);

  const GetProductList = async () => {
    try {
      const response = await CallFor(
        `v2/Orders/SaveMaterialRequest`,
        "get",
        null,
        "Auth"
      );
      const productOptions = response.data.dropdowns.products.map((product) => ({
        value: product.id,
        valuee: product.pvId,
        price:product.price,
        label: product.proname,
        itemuom: product.prouom,
        attributes: product.attributes
      }));

      console.log("Product options:", productOptions);
      setProductList(productOptions);

      const options = response.data.dropdowns.organisations.map((warehouse) => ({
        value: warehouse.id,
        label: warehouse.name,
        Wuaid: warehouse.uaid
      }));
      console.log("Setting warehouse options:", options);
      setWarehouseOptions(options);

    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  // const GetWarehouseList = async () => {
  //   try {
  //     const response = await CallFor(
  //       `v2/Common/GetParentOrgDDL`,
  //       "get",
  //       null,
  //       "Auth"
  //     );
  //     const options = response.data.map((warehouse) => ({
  //       value: warehouse.id,
  //       label: warehouse.name,
  //       Wuaid: warehouse.uaid
  //     }));
  //     console.log("Setting warehouse options:", options);
  //     setWarehouseOptions(options);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchRequisitionData = async () => {
    try {
      const response = await CallFor(
        `v2/Orders/GetMaterialRequestbyId?mrid=${params.mrid}`,
        "get",
        null,
        "Auth"
      );
      const data = response.data;
      console.log("Fetched requisition data:", data);
      setRequisitionData(data);

      setFormData({
        mrdate: data.mrdate.split("T")[0],
        mrrequireddate: data.mrrequireddate.split("T")[0],
      });

      const selectedWarehouseOption = warehouseOptions.find(wh => wh.value === data.targetwarehouse);
      if (selectedWarehouseOption) {
        setSelectedWarehouse(selectedWarehouseOption);
      }

      const initialItems = data.materialrequestitems.map((item) => {
        const selectedProduct = productList.find(p => p.value === item.proid);
        console.log("Selected product for item:", selectedProduct);
        
        if (selectedProduct) {
          getAttributes(selectedProduct.value);
        }

        const selectedAttributes = item.mridetails.map(attr => ({
          value: `${attr.attributeid}_${attr.avid}`,
          label: `${attr.attributename}: ${attr.attrvalue}`,
          mridid: attr.mridid
        }));

        return {
          id: item.mriid,
          mriid: item.mriid,
          selectedProductId: selectedProduct,
          quantities: item.itemqty,
          selectedAttributes: selectedAttributes
        };
      });

      setItems(initialItems);
    } catch (error) {
      console.error("Error fetching requisition data:", error);
    }
  };

  const getAttributes = (productId) => {
    const selectedProduct = productList.find(p => p.value === productId);
    if (selectedProduct && selectedProduct.attributes) {
      const attributes = selectedProduct.attributes.map(attr => ({
        value: `${attr.id}_${attr.avid}`,
        label: `${attr.name}`
      }));
      console.log(`Attributes for product ${productId}:`, attributes);
      setProductAttributes(prev => ({
        ...prev,
        [productId]: attributes
      }));
    } else {
      console.log(`No attributes found for product ${productId}`);
    }
  };
  const handleAddItem = () => {
    const newItemId = items.length + 1;
    setItems([...items, {
      id: newItemId,
      selectedProductId: null,
      quantities: "",
      selectedAttributes: []
    }]);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await requisitionSchema.validate({
        mrdate: formData.mrdate,
        mrrequireddate: formData.mrrequireddate,
        selectedWarehouse,
        items: items
      }, { abortEarly: false });

      const materialRequestItems = items.map(item => {
        const productId = item.selectedProductId?.value;
        const productpvid = item.selectedProductId?.valuee;
        const price = item.selectedProductId?.price;
        const itemAttributes = item.selectedAttributes || [];
        const itemQty = parseFloat(item.quantities) || 0;

        return {
          mriid: item.mriid || 0,
          mrid: parseInt(params.mrid) || 0,
          proid: productId,
          pvid: productpvid,
          price: price,
          itemqty: itemQty,
          itemtargetlocation: selectedWarehouse?.Wuaid || 0,
          itemrequestby: uid,
          itemuom: item.selectedProductId?.itemuom || '',
          itemuomcfactor: 0,
          itemselecteduom: 0,
          mridetails: itemAttributes.map(attr => ({
            mridid: parseInt(attr.mridid) || 0,
            mriid: parseInt(item.mriid) || 0,
            mrid: parseInt(params.mrid),
            attributeid: parseInt(attr.value.split('_')[0]),
            avid: parseInt(attr.value.split('_')[1])
          }))
        };
      });


      const body = {
        mrid: parseInt(params.mrid) || 0,
        mrtype: true,
        uoid: parseInt(orgid),
        seriesid: 1,
        mrno: 0,
        status: 0,
        sourcewarehouse: parseInt(orgid),
        targetwarehouse: selectedWarehouse?.value || 0,
        mrdate: `${formData.mrdate}T00:00:00`,
        mrrequireddate: `${formData.mrrequireddate}T00:00:00`,
        ordertandc: "null",
        materialrequestitems: materialRequestItems,
        materialattachments: [],
        totalProductItems: items.length,
        totalOrderQty: materialRequestItems.reduce((sum, item) => sum + item.itemqty, 0),
        targetOrgName: selectedWarehouse?.label || ""
      };

      console.log("Request Body:", body);

      const response = await CallFor(
        `v2/Orders/UpdateMaterialRequest`,
        "post",
        body,
        "Auth"
      );

      if (response.status === 200) {
        reToast.success("Requisition updated successfully!");
        // router.push("/station/Purchase/Requistion");
      } else {
        reToast.error("Failed to update requisition");
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.log(error);
        reToast.error("An error occurred while updating the requisition");
      }
    }
  };

  return (
    <div className="p-6 bg-zinc-100 dark:bg-zinc-800 min-h-screen">
      <div className="max-w-7xl mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">
          Edit Requisition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <label className="text-sm font-medium mb-1 w-1/4">Req. Date</label>
            <input
              type="date"
              className={`${sharedClasses.border} ${errors.mrdate ? 'border-red-500' : ''}`}
              name="mrdate"
              value={formData.mrdate || ""}
              onChange={handleDateChange}
            />
            {errors.mrdate && <p className="text-red-500 text-sm">{errors.mrdate}</p>}
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium mb-1 w-1/4">Due Date</label>
            <input
              type="date"
              className={`${sharedClasses.border} ${errors.mrrequireddate ? 'border-red-500' : ''}`}
              name="mrrequireddate"
              value={formData.mrrequireddate || ""}
              onChange={handleDateChange}
            />
            {errors.mrrequireddate && <p className="text-red-500 text-sm">{errors.mrrequireddate}</p>}
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium mb-1 w-1/4">Warehouse</label>
            <Select
              options={warehouseOptions}
              value={selectedWarehouse}
              onChange={setSelectedWarehouse}
              className={`z-50 text-black w-full ${errors.selectedWarehouse ? 'border-red-500' : ''}`}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 1000 }),
              }}
            />
            {errors.selectedWarehouse && <p className="text-red-500 text-sm">{errors.selectedWarehouse}</p>}
          </div>
        </div>
        <h3 className="text-xl font-bold text-orange-500 mb-4">
          Requested Items
        </h3>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Select Items</th>
              <th className="text-left p-2">Attributes</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <Select
                    id={`product-${item.id}`}
                    name={`product-${item.id}`}
                    value={item.selectedProductId}
                    onChange={(selectedProduct) => {
                      const updatedItems = items.map((itm) =>
                        itm.id === item.id ? { ...itm, selectedProductId: selectedProduct, selectedAttributes: [] } : itm
                      );
                      setItems(updatedItems);
                      if (selectedProduct && selectedProduct.value) {
                        getAttributes(selectedProduct.value);
                      }
                    }}
                    options={productList}
                    className={`z-50 text-black w-full ${errors[`items.${index}.selectedProductId`] ? 'border-red-500' : ''}`}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                    }}
                  />
                  {errors.items?.[index]?.selectedProductId && <p className="text-red-500 text-sm">{errors.items[index].selectedProductId}</p>}
                </td>
                <td className="p-2">
                  <Select
                    isMulti
                    options={productAttributes[item.selectedProductId?.value] || []}
                    value={item.selectedAttributes}
                    onChange={(selectedOptions) => {
                      const updatedItems = items.map((itm) =>
                        itm.id === item.id ? { ...itm, selectedAttributes: selectedOptions } : itm
                      );
                      setItems(updatedItems);
                    }}
                    className="z-50 text-black w-full"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                }}
                  />
                  {errors.items?.[index]?.selectedAttributes && <p className="text-red-500 text-sm">{errors.items[index].selectedAttributes}</p>}
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className={`${sharedClasses.border} w-full ${errors.items?.[index]?.quantities ? 'border-red-500' : ''}`}
                    value={item.quantities || ""}
                    onChange={(e) => {
                      const updatedItems = items.map((itm) =>
                        itm.id === item.id ? { ...itm, quantities: e.target.value } : itm
                      );
                      setItems(updatedItems);
                    }}
                  />
                  {errors.items?.[index]?.quantities && <p className="text-red-500 text-sm">{errors.items[index].quantities}</p>}
                </td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <button
          className="bg-green-500 text-white p-2 rounded mb-6"
          onClick={handleAddItem}
        >
          + Add new
        </button> */}
        <div className="flex justify-end space-x-4">
         
          <Link href="/station/Purchase/Requistion">
            <button className="bg-zinc-500 text-white p-2 rounded">
              Cancel
            </button>
          </Link>
          <button className="bg-green-500 text-white p-2 rounded" onClick={handleSave}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default updateRequisition