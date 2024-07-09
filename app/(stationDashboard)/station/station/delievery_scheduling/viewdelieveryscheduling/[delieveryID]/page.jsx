"use client";
import { Button } from "@/components/ui/button";
import CallFor2 from "@/utilities/CallFor2";
import { Undo } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const customerDetail = () => {
  const param = useParams();
  const [detail, setDetail] = useState();

  useEffect(() => {
    const getDelieveryDetail = async () => {
      const response = await CallFor2(`api-fe/DeliverySlotAdminAPI/Edit/${param.delieveryID}`, 'GET', null, 'Auth');
      if (response.status === 200) {
        console.log(response.data, "response");
        setDetail(response.data);
      }
    };
    getDelieveryDetail();
  }, []);

  const mapShippingMethod = (id) => {
    switch(id) {
      case 1:
        return "Ground";
      case 2:
        return "Next Day Air";
      case 3:
        return "2nd Day Air";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-2xl text-orange-400">
            VIEW DELIVERY SCHEDULING
          </div>
          <Link href={"/station/station/delievery_scheduling"}>
            <Button color="warning">
              <Undo size={20} />
              Back
            </Button>
          </Link>
        </div>

        <form className="space-y-4 mt-7">
          <div className="grid grid-cols-2 w-75">
            <div className="flex items-center mb-5">
              <label className="w-1/4 font-medium mr-2">Id :</label>
              <p>{detail?.Id || "Loading..."}</p>
            </div>
            <div className="flex items-center mb-5">
              <label className="w-1/4 font-medium mr-2">TimeSlot :</label>
              <p>{detail?.TimeSlot || "Loading..."}</p>
            </div>
            <div className="flex items-center mb-5">
              <label className="w-1/4 font-medium mr-2">Active :</label>
              <p>{detail?.Active ? "Yes" : "No"}</p>
            </div>
            <div className="flex items-center mb-5">
              <label className="w-1/4 font-medium mr-2">ShippingMethod :</label>
              <p>
                {detail?.SelectedShippingMethodIds
                  ? detail.SelectedShippingMethodIds.map(id => mapShippingMethod(id)).join(", ")
                  : "Loading..."}
              </p>
            </div>
            <div className="flex items-center mb-5">
              <label className="w-1/4 font-medium mr-2">DisplayOrder :</label>
              <p>{detail?.DisplayOrder || "Loading..."}</p>
            </div>
          </div>
        </form>

        <div className="flex justify-end ">
          <Link href="/station/station/delievery_scheduling/editdelieveryScheduling">
            <Button className="text-white bg-blue-950 mr-1">
              Edit Delivery
            </Button>
          </Link>
          <Button className="text-white bg-red-400">Delete Delivery</Button>
        </div>
      </div>
    </>
  );
};

export default customerDetail;
