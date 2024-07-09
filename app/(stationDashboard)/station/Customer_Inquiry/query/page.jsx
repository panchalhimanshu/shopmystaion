"use client";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function ViewInquiry() {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleReplyClick = () => {
    setShowReplyBox(!showReplyBox);
  };

  const handleReplyChange = (value) => {
    setReplyMessage(value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    // Handle the reply submission here, e.g., send the reply to the server
    console.log("Reply submitted:", replyMessage);
    // Optionally, clear the reply box after submission
    setReplyMessage("");
    setShowReplyBox(false);
  };

  const handleCloseReplyBox = () => {
    setShowReplyBox(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-orange-500 text-2xl font-bold">Query</div>
      </div>

      <div className="dark:text-white w-[90%] mx-auto">
        <div className="flex my-2 py-2 justify-between items-center">
          <div className="font-semibold">Name: Jay</div>
          <div className="font-semibold">Email ID: Jay@gmail.com</div>
        </div>

        <div className="flex my-2 py-2 justify-between items-center">
          <div className="font-semibold">Received On: 01-01-2024</div>
          <div className="font-semibold">Subject: Wrong Parcel Received</div>
        </div>

        <div className="flex my-2 py-2 justify-between items-center">
          <div className="">
            <div className="flex">
              <div className="pt-3 font-semibold">Attachments:</div>
              <div className="flex">
                <div
                  style={{ height: "50px", width: "50px" }}
                  className="border-2 border-black ms-2"
                ></div>
                <div
                  style={{ height: "50px", width: "50px" }}
                  className="border-2 border-black mx-2"
                ></div>
                <div
                  style={{ height: "50px", width: "50px" }}
                  className="border-2 border-black"
                ></div>
                <div
                  style={{ height: "50px", width: "50px" }}
                  className="border-2 border-black ms-2"
                ></div>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div>
          Hi ramukyaj@25, In our tenth annual March Machine Learning Mania
          competition, Kagglers will once again join the millions of fans who
          attempt to predict the outcomes of this year's NCAA college basketball
          tournaments. Unlike most fans, you will pick the winners and losers
          using a combination of rich historical data and computing power, while
          the ground truth unfolds on television
          <br />
          We’ve made an update to the competition format this year. You will be
          making bracket predictions for both tournaments, similar to
          traditional tournament contests. But you will be allowed to submit an
          entire portfolio of brackets, anywhere from 1 to 100,000.
        </div>

        <div className="flex justify-center">
          {!showReplyBox && (
            <>
              <button
                className="mt-6 px-3 py-2 bg-orange-500 text-white rounded-md focus:outline-none"
                onClick={handleReplyClick}
              >
                Reply
              </button>
              <button className="mt-6 mx-2 px-3 py-2 bg-red-500 text-white rounded-md focus:outline-none">
                Delete
              </button>
              <Link href={"/station/Customer_Inquiry"}>
                <button className="mt-6 px-3 py-2 bg-[#11357C] text-white rounded-md focus:outline-none">
                  Back to Inquiry
                </button>
              </Link>
            </>
          )}
        </div>

        {showReplyBox && (
          <div className="mt-6">
            <div className="flex justify-end">
              <button
                onClick={handleCloseReplyBox}
                className="text-red-500 text-xl font-bold focus:outline-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleReplySubmit}>
              <ReactQuill
                value={replyMessage}
                onChange={handleReplyChange}
                theme="snow"
                placeholder="Type your reply here..."
              />
              <button
                type="submit"
                className="mt-2 px-3 py-2 bg-green-500 text-white rounded-md focus:outline-none"
              >
                Send Reply
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewInquiry;
