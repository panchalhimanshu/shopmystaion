"use client"
import React from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ToggleCheckbox = () => {
  return (
    <div className="flex items-center gap-2 ml-1">
      <Switch color="warning" id="switch_warning" defaultChecked />
    
    </div>
  );
};

const ButtonWithIcon = ({ icon, text, color }) => {
  return (
    <button
      className={`flex items-center px-3 py-1 bg-${color}-500 text-white rounded-md`}
    >
      {icon}
      {text}
    </button>
  );
};

const CheckboxItem = ({ label }) => {
  return (
    <li className="flex items-center justify-between">
      <span>{label}</span>
      <ToggleCheckbox />
    </li>
  );
};

const SectionItem = ({ title, items }) => {
  return (
    <div>
      <h3 className="text-orange-500 font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <CheckboxItem key={index} label={item} />
        ))}
      </ul>
    </div>
  );
};

const PortalSettings = () => {
  return (
    <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h2 className="text-orange-500 font-semibold text-lg mb-4">
        PORTAL SETTINGS
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img
            src="https://placehold.co/150x100"
            alt="Portal Image"
            className="rounded-md mb-2"
          />
          <div className="flex space-x-2">
            <ButtonWithIcon
              icon={
                <svg
                  aria-hidden="true"
                  alt="edit"
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536M9 11l3.536 3.536M3 21h18M3 3h18"
                  ></path>
                </svg>
              }
              text="Change"
              color="blue"
            />
            <ButtonWithIcon
              icon={
                <svg
                  aria-hidden="true"
                  alt="remove"
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              }
              text="Remove"
              color="orange"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <SectionItem
            title="Customization"
            items={[
              "Custom CSS",
              "Product Carousel",
              "Newly Added",
              "Best Sellers",
            ]}
          />
          <SectionItem
            title="Sections"
            items={[
              "Sliders",
              "Product Carousel",
              "Newly Added",
              "Best Sellers",
            ]}
          />
        </div>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-orange-500 font-semibold">
            CHANGE SECTION SEQUENCE
          </h3>
          <button className="text-blue-500">Edit</button>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-2 bg-white dark:bg-zinc-800 rounded-md shadow-sm">
            <span className="flex items-center">
              <svg
                aria-hidden="true"
                alt="drag"
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 10h16M4 14h16"
                ></path>
              </svg>
              Categories
            </span>
          </li>
          <li className="flex items-center justify-between p-2 bg-white dark:bg-zinc-800 rounded-md shadow-sm">
            <span className="flex items-center">
              <svg
                aria-hidden="true"
                alt="drag"
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 10h16M4 14h16"
                ></path>
              </svg>
              Best Sellers
            </span>
          </li>
          <li className="flex items-center justify-between p-2 bg-white dark:bg-zinc-800 rounded-md shadow-sm">
            <span className="flex items-center">
              <svg
                aria-hidden="true"
                alt="drag"
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 10h16M4 14h16"
                ></path>
              </svg>
              Newly Added
            </span>
          </li>
        </ul>
      </div>
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-white dark:bg-zinc-800 text-blue-500 border border-blue-500 rounded-md">
          Submit
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Refresh
        </button>
      </div>
    </div>
  );
};

export default PortalSettings;
