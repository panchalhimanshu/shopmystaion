"use client"
import { Button } from "@/components/ui/button";
import CallFor from "@/utilities/CallFor";
import { Undo } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteDialog from "@/components/DeleteDialog";
import { useRouter } from "next/navigation";
function ViewSO({params}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await CallFor(
        `v2/Orders/GetOrderById?orderid=${params.orderid}`, "get", null, "Auth"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.orderid]);

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getAttributes = (proid) => {
    const item = data.materialRequest?.materialrequestitems.find(item => item.proid === proid);
    if (!item || !item.mridetails) return 'N/A';
    return item.mridetails.map(detail => ` ${detail.attributename} : ${detail.attrvalue}`).join(', ');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-xl font-semibold p-2">
          PO of Req. #{params.orderid}
        </div>
        <Link href="/station/Purchase/po">
          <Button color="warning" className="shadow-md">
            <Undo size={20} className="pr-1" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 p-3">
        <div className="pb-3">
          <label className="font-bold inline-block w-32">PO Date</label>
          <label className="text-orange-500">{data?.orderdate?.split("T")[0]}</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32">Due Date</label>
          <label>{data?.deliverydate?.split("T")[0]}</label>
        </div>
        <div>
          <label className="font-bold inline-block w-36">Status</label>
          <label>{data?.orderstatusname}</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32">Req no</label>
          <label>{data?.materialRequest?.mrid}</label>
        </div>
        <div>
          <label className="font-bold inline-block w-32">Warehouse</label>
          <label className="text-orange-500">{data?.materialRequest?.targetOrgName}</label>
        </div>
      </div>
      
      <div>
        <div className="py-8 mt-10 mb-7 border-t-2 border-black dark:border-white border-dashed max-w-4xl">
          <table className="border-b border-black dark:border-white w-full">
            <thead>
              <tr>
                <th className="py-3 px-6 text-center">Sr NO</th>
                <th className="py-3 px-6 text-center">Product</th>
                <th className="py-3 px-6 text-center">Attributes</th>
                <th className="py-3 px-6 text-center">Requested Quantity</th>
                <th className="py-3 px-6 text-center">Quantity to be Sent</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className="py-3 px-6 text-center">Cost</th>
              </tr>
            </thead>
            <tbody>
              {data?.orderitems?.map((item, index) => (
                <tr key={item.oitemsid}>
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  <td className="py-3 px-6 text-center">{item.proname}</td>
                  <td className="py-3 px-6 text-center">{getAttributes(item.proid)}</td>
                  <td className="py-3 px-6 text-center">{item.itemqty}</td>
                  <td className="py-3 px-6 text-center"></td>
                  <td className="py-3 px-6 text-center">{item.itemrate}</td>
                  <td className="py-3 px-6 text-center">{item.itemamount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-3">Total: {data?.ordertotal}</div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <div>
       {data?.orderstatus == 1 ? <Link href="">
            <Button className="text-white bg-red-500" onClick={() => handleDeleteUser(data?.orderid)}>
              Cancel PO
            </Button>
          </Link> :  <div>
          <Link href="/station/Purchase/po/PurchasedItemUpdates">
            <Button className="text-white bg-[#11375C]">
              Purchased Item Updates
            </Button>
          </Link>
        </div>}   
        </div>
       
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        callfor={CallFor}
        onDelete={() => {
          router.push("/station/Purchase/po")
          setIsDeleteDialogOpen(false);
        }}
        delUrl={`v2/Orders/DeleteOrder?id=${selectedUserId}`}
      />
    </div>
  );
}

export default ViewSO;
