"use client";
import CallFor from "@/utilities/CallFor";
import Select from 'react-select';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast as reToast } from "react-hot-toast";
import * as yup from 'yup';
import { Button } from "@/components/ui/button";
import { components } from 'react-select';

const sharedClasses = {
  border: "border border-zinc-300 dark:border-zinc-700 rounded p-2",
  button: "p-2 rounded",
};

const requisitionSchema = yup.object().shape({
  mrdate: yup.date().required("Requisition date is required"),
  mrrequireddate: yup.date().required("Due date is required"),
  items: yup.array().of(
    yup.object().shape({
      selectedProductId: yup.object().nullable().required("Product is required"),
      quantities: yup.number().required("Quantity is required").min(1, "Quantity must be at least 1"),
      selectedAttributes: yup.array().min(1, "At least one attribute is required")
    })
  ).min(1, "At least one item is required")
});

const CreateRequisition = () => {
  const router = useRouter();
  const [items, setItems] = useState([{ id: 1, selectedProductId: null, quantities: "", selectedAttributes: [] }]);
  const [formData, setFormData] = useState({});
  const [productList, setProductList] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [errors, setErrors] = useState({});
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [childOrganizations, setChildOrganizations] = useState([]);
  const [selectedChildOrganization, setSelectedChildOrganization] = useState(null);
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const orgid = userData.orgid;
  const uid = userData.uid;

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    // Only fetch attributes if the last item has a selectedProductId and it has changed
    const lastItemIndex = items.length - 1;
    if (lastItemIndex >= 0 && items[lastItemIndex].selectedProductId) {
      getAttributes(lastItemIndex);
    }
  }, [items.length]); // Track only the length of the items array

  const fetchDropdownData = async () => {
    try {
      const response = await CallFor(
        `v2/Orders/SaveMaterialRequest`,
        "Get",
        null,
        "Auth"
      );

      setProductList(
        response.data.dropdowns.products.map((product) => ({
          value: product.id,
          valuee: product.pvId,
          price: product.price,
          label: product.proname,
          itemuom: product.prouom,
          attributes: product.attributes.map(attr => ({
            value: attr.id,
            label: attr.name,
          }))
        }))
      );

      setWarehouseOptions(
        response.data.dropdowns.organisations.map((org) => ({
          value: org.id,
          label: org.name,
          uaid: org.uaid
        }))
      );

      setChildOrganizations(response.data.dropdowns.childOrganisations.map(org => ({
        value: org.id,
        label: org.name,
        uid: org.uid,
        uaid: org.uaid
      })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        selectedProductId: null,
        quantities: "",
        selectedAttributes: [],
        availableAttributes: []
      }
    ]);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const getAttributes = async (index) => {
    try {
      const response = await CallFor(
        `v2/Common/GetAttrValueComboByProId/${items[index].selectedProductId.value}`,
        "post",
        null,
        "Auth"
      );
      const updatedItems = [...items];
      updatedItems[index].availableAttributes = response.data.map((attr) => ({
        value: attr.id,
        label: attr.name,
      }));
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const itemList = items.map(item => ({
      selectedProductId: item.selectedProductId,
      quantities: item.quantities,
      selectedAttributes: item.selectedAttributes
    }));

    const formDataForValidation = {
      mrdate: formData.mrdate,
      mrrequireddate: formData.mrrequireddate,
      selectedWarehouse,
      items: itemList
    };

    try {
      await requisitionSchema.validate(formDataForValidation, { abortEarly: false });

      const materialRequestItems = items.map(item => {
        const productId = item.selectedProductId?.value;
        const productpvid = item.selectedProductId?.valuee;
        const productprice = item.selectedProductId?.price;

        const itemAttributes = item.selectedAttributes || [];
        const itemQty = item.quantities || 0;
        return {
          mriid: 0,
          mrid: 0,
          proid: productId,
          pvid: productpvid,
          price: productprice,
          itemqty:parseInt(itemQty) ,
          itemtargetlocation: selectedWarehouse?.uaid ? selectedWarehouse?.uaid : selectedChildOrganization?.uaid,
          itemrequestby: uid,
          itemuom: productList.find(p => p.value === productId)?.itemuom || '',
          itemuomcfactor: 0,
          itemselecteduom: 0,
          mridetails: itemAttributes.map(attr => ({
            mridid: 0,
            mriid: null,
            mrid: null,
            attributeid: parseInt(attr.value.split('_')[0]),
            attrvalue: attr.value
          }))
        };
      });

      const body = {
        mrid: 0,
        mrtype: true,
        uoid: orgid,
        seriesid: 1,
        mrno: 0,
        sourcewarehouse: orgid,
        targetwarehouse: selectedWarehouse?.value ? selectedWarehouse?.value : selectedChildOrganization?.value,
        mrdate: formData.mrdate,
        mrrequireddate: formData.mrrequireddate,
        ordertandc: "null",
        materialrequestitems: materialRequestItems,
        materialattachments: []
      };

      const response2 = await CallFor(
        `v2/Orders/SaveMaterialRequest`,
        "post",
        body,
        "Auth"
      );

      if (response2.data.status === true) {
        reToast.success("Requisition saved successfully!");
        router.push("/station/Purchase/Requistion");
      } else {
        reToast.error("Failed to save requisition");
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
      }
    }
  };

  const CustomOption = ({ children, ...props }) => {
    if (props.data.value === 'add-external') {
      return (
        <div className="py-2 px-3 cursor-pointer hover:bg-gray-100" onClick={() => router.push("/station/station/Externalwarehouse/AddExternalWarehouse")}>
          <Button color="warning" className="shadow-md w-full">
            Add External
          </Button>
        </div>
      );
    }
    return <components.Option {...props}>{children}</components.Option>;
  };


  return (
    <div className="p-6 bg-zinc-100 dark:bg-zinc-800 min-h-screen relative">
      <div className="max-w-7xl mx-auto rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Create Requisition
          </h2>
          {/* <Link href="/station/Purchase/Requistion/createrequistion/ExternalWarehouse">
            <Button color="warning" className="shadow-md">
              Create External Warehouse
            </Button>
          </Link> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <label className="text-sm font-medium mb-1 w-1/4">Req. Date</label>
            <input
              type="date"
              className={`${sharedClasses.border} ${errors.mrdate ? 'border-red-500' : ''}`}
              name="mrdate"
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
              onChange={handleDateChange}
            />
            {errors.mrrequireddate && <p className="text-red-500 text-sm">{errors.mrrequireddate}</p>}
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium mb-1 w-1/4">Warehouse</label>
            <div className="w-3/4">
              <Select
                options={warehouseOptions}
                value={selectedWarehouse}
                onChange={setSelectedWarehouse}
                isDisabled={!!selectedChildOrganization}
                isClearable={true}
                className={`z-50 text-black w-3/4}`}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                }}
              />

            </div>
           
            {errors.selectedWarehouse && <p className="text-red-500 text-sm">{errors.selectedWarehouse}</p>}
          </div>
          <div className="flex items-center">
            <label className="text-sm font-medium mb-1 w-1/4">External Vendor</label>
            <div className="w-3/4">
              <Select
                options={[
                  ...childOrganizations,
                  { value: 'add-external', label: 'Add External' }
                ]}
                value={selectedChildOrganization}
                onChange={(selected) => {
                  if (selected && selected.value === 'add-external') {
                    router.push("/station/Externalwarehouse/AddExternalWarehouse");
                  } else {
                    setSelectedChildOrganization(selected);
                  }
                }}
                isDisabled={!!selectedWarehouse}
                components={{ Option: CustomOption }}
                placeholder="Select External Vendor"
                isClearable={true}
                className={`z-50 text-black w-3/4}`}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                }}
                
              />
            </div>
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
              <th className="text-left p-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <Select
                    options={productList}
                    value={item.selectedProductId}
                    onChange={(selectedOption) => {
                      const updatedItems = [...items];
                      updatedItems[index].selectedProductId = selectedOption;
                      updatedItems[index].availableAttributes = selectedOption ? selectedOption.attributes : [];
                      setItems(updatedItems);
                    }}
                    className={`z-50 text-black w-full ${errors[`items.${index}.selectedProductId`] ? 'border-red-500' : ''}`}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                }}

                  />
                  
                </td>
                <td className="p-2">
                  <Select
                    options={item.availableAttributes || []}
                    isMulti
                    value={item.selectedAttributes}
                    onChange={(selectedOptions) => {
                      const updatedItems = [...items];
                      updatedItems[index].selectedAttributes = selectedOptions;
                      setItems(updatedItems);
                    }}
                    className={`z-50 text-black w-full ${errors[`items.${index}.selectedProductId`] ? 'border-red-500' : ''}`}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                    }}
    
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.quantities}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].quantities = e.target.value;
                      setItems(updatedItems);
                    }}
                    className="border p-2 w-full"
                    placeholder="Quantity"
                  />
                </td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddItem}
        >
          Add Item
        </button>
       
      </div>

      <div className="flex justify-end mt-6">
        <Link href="/station/Purchase/Requistion">
          <Button className="bg-blue-950 text-white mr-2">Cancel</Button>
        </Link>
        <Button onClick={handleSave} className="bg-orange-400 text-white">
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateRequisition;

