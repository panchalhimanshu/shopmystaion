"use client"
import { Button } from "@/components/ui/button";
import { Delete, Trash, Undo } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CallFor from "@/utilities/CallFor";
import { useRouter } from "next/navigation";
import { toast as reToast } from "react-hot-toast";
function Returnstocks({params}) {
  const [deliveryData, setDeliveryData] = useState(null);
  const [returnQuantities, setReturnQuantities] = useState({});
  const [returnReasons, setReturnReasons] = useState({});

  const router = useRouter();
  useEffect(() => {
    // Fetch data from API
    CallFor(`v2/Orders/GetDeliveryById?odtid=${params.odtid}`, "get", null, "Auth")
      .then(response => response.data)
      .then(data => {
        setDeliveryData(data);
        // Initialize return quantities and reasons
        const initialQuantities = {};
        const initialReasons = {};
        data.odtitemsmappings.forEach(item => {
          initialQuantities[item.odtimid] = 0;
          initialReasons[item.odtimid] = "";
        });
        setReturnQuantities(initialQuantities);
        setReturnReasons(initialReasons);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleQuantityChange = (odtimid, value) => {
    setReturnQuantities(prev => ({...prev, [odtimid]: value}));
  };

  const handleReasonChange = (odtimid, value) => {
    setReturnReasons(prev => ({...prev, [odtimid]: value}));
  };

  const handleSubmit =async () => {
    const orderReturns = deliveryData.odtitemsmappings.map(item => ({
      ReturnId: 0, // Assuming new returns start with 0
      Odtitemsmappingid: item.odtimid,
      Returnquantity: parseFloat(returnQuantities[item.odtimid]),
      Returnreason: returnReasons[item.odtimid],
      Returnstatus: 1, // Assuming 1 is for "Pending"
      ReturnstatusName: "Pending",
      Createdby: deliveryData.createdby,
      Createddate: new Date().toISOString(),
      Approvedby: null,
      Approveddate: null
    })).filter(item => item.Returnquantity > 0);

    const response = await CallFor("v2/Orders/CreateReturn", "post", { orderReturns }, "Auth")
  


      if (response)
        {
          reToast.success("Return stock update");
          router.push("/station/Purchase/delievery")
  
        }
  };

  if (!deliveryData) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          RETURN STOCK
        </div>
        <Link href="/station/Purchase/delievery">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 p-3">
        <div className="pb-3">
          <label className="font-bold inline-block w-32 ">Warehouse</label>
          <label className="text-orange-300">{deliveryData.orgname}</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32 ">PO No</label>
          <label>{deliveryData.orderno}</label>
        </div>

        <div>
          <label className="font-bold inline-block w-32 ">Total Quantity</label>
          <label>{deliveryData.odtitemsmappings.reduce((total, item) => total + item.itemqty, 0)}</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32 ">Delivery Date</label>
          <input
            type="date"
            className="border border-black dark:border-white p-2 bg-transparent"
            defaultValue={new Date(deliveryData.odtexpdeldate).toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div>
        <div className="py-8 mt-10 mb-7 max-w-4xl">
          <table className="border-black dark:border-white">
            <thead>
              <tr>
                <th className="py-3 px-6 text-center">Sr. No</th>
                <th className="py-3 px-6 text-center">Select Product</th>
                <th className="py-3 px-6 text-center">Attributes</th>
                <th className="py-3 px-6 text-center">Quantity in Delivery</th>
                <th className="py-3 px-6 text-center">Returned Quantity</th>
                <th className="py-3 px-6 text-center">Return Reason</th>
              </tr>
            </thead>
            <tbody>
              {deliveryData.odtitemsmappings.map((item, index) => (
                <tr key={item.odtimid}>
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  <td className="py-3 px-6 text-center">{item.productname}</td>
                  <td className="py-3 px-6 text-center">
                    {item.bcode ? `Barcode: ${item.bcode}` : ''}
                    {item.fcode ? `Fabric Code: ${item.fcode}` : ''}
                    {item.oitems?.orderitemdetails?.[0]?.attributename ?
                      `${item.oitems.orderitemdetails[0].attributename}: ${item.oitems.orderitemdetails[0].attrvalue}`
                      : ''}
                  </td>
                  <td className="py-3 px-6 text-center">{item.deliveredqty}</td>
                  <td className="py-3 px-6 text-center">
                    <input
                      type="number"
                      className="text-center w-20 bg-transparent border border-black dark:border-white rounded-sm"
                      value={returnQuantities[item.odtimid]}
                      onChange={(e) => handleQuantityChange(item.odtimid, e.target.value)}
                      max={item.deliveredqty}
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <input
                      type="text"
                      className="text-center w-40 bg-transparent border border-black dark:border-white rounded-sm"
                      value={returnReasons[item.odtimid]}
                      onChange={(e) => handleReasonChange(item.odtimid, e.target.value)}
                      placeholder="Enter reason"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <div>
            <Link href="/station/Purchase/delievery">
              <Button className="text-white bg-[#11375C]">Cancel</Button>
            </Link>
            <Button color={"warning"} className="text-white ml-2" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returnstocks;