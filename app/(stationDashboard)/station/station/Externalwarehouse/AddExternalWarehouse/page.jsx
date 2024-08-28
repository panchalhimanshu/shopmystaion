"use client";
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast as reToast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import CallFor from "@/utilities/CallFor";
import { Undo } from "lucide-react";
import Link from "next/link";

const ExternalDealerForm = () => {
    const router = useRouter();
    const [selectedStateName, setSelectedStateName] = useState("");
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyMobile: "",
        companyAddress: {
            uaid: 0,
            address1: "",
            address2: "",
            city: "",
            state: 0,
            country: 0,
            pincode: null,
            uid: null,
            addridentifier: null,
            maplocation: null,
            latitude: null,
            longitude: null,
            qrcode: null,
            userorgaddressmappings: null,
        },
        ownerFirstName: "",
        ownerLastName: "",
    });

    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch the dropdown data from the API
        const fetchDropdownData = async () => {
            try {
                const response = await CallFor("v2/account/SaveExternalDealer");
                const data = await response.data;

                // Update the state with the fetched data
                setStates(data.dropdowns.states || []);
                setCountries(data.dropdowns.countries || []);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load form data. Please try again.",
                    variant: "destructive",
                });
            }
        };

        fetchDropdownData();
    }, []);

    const steps = ["Company Information", "Address Information", "Owner Information"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            companyAddress: {
                ...prevData.companyAddress,
                [name]: value,
            },
        }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await CallFor(
                "v2/account/SaveExternalDealer",
                "post",
                {
                    CompanyName: formData.companyName,
                    CompanyEmail: formData.companyEmail,
                    CompanyMobile: formData.companyMobile,
                    CompanyAddress: {
                        Uaid: formData.companyAddress.uaid,
                        Address1: formData.companyAddress.address1,
                        Address2: formData.companyAddress.address2,
                        City: formData.companyAddress.city,
                        State: parseInt(formData.companyAddress.state),
                        Country: parseInt(formData.companyAddress.country),
                        Pincode: formData.companyAddress.pincode,
                        Uid: formData.companyAddress.uid,
                        Addridentifier: formData.companyName,
                        Maplocation: formData.companyAddress.maplocation,
                        Latitude: formData.companyAddress.latitude,
                        Longitude: formData.companyAddress.longitude,
                        Qrcode: formData.companyAddress.qrcode,
                        UserOrgAddressMappings: formData.companyAddress.userorgaddressmappings,
                    },
                    OwnerFirstName: formData.ownerFirstName,
                    OwnerLastName: formData.ownerLastName,
                },
                "Auth"
            );

            if (response) {
                reToast.success("Form submitted successfully");
                router.push("/station/station/Externalwarehouse"); // Redirect to the desired page
            } else {
                reToast.error("Failed to submit form");
            }
        } catch (error) {
            reToast.error("Failed to submit form. Please try again");
        }
    };

    const isTablet = useMediaQuery("(max-width: 1024px)");

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-4 text-orange-500">
                    Create External Vandor
                </h2>
                <Link href="/station/station/Externalwarehouse">
                    <Button color="warning" className="shadow-md">
                        <Undo size={20}></Undo>
                        Back
                    </Button>
                </Link>
            </div>

            <Stepper current={activeStep} direction={isTablet && "vertical"}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <>
                    <div className="mt-2 mb-2 font-semibold text-center">
                        All steps completed - you're finished
                    </div>
                    <div className="flex pt-2">
                        <div className="flex-1" />
                        <Button
                            size="xs"
                            variant="outline"
                            color="destructive"
                            className="cursor-pointer"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </>
            ) : (
                <form>
                    <div className="grid grid-cols-12 gap-4">
                        {activeStep === 0 && (
                            <>
                                <div className="col-span-12 mb-4 mt-6">
                                    <h4 className="text-sm font-medium text-default-600">
                                        Enter Company Information
                                    </h4>
                                    <p className="text-xs text-default-600 mt-1">
                                        Fill in the box with correct data
                                    </p>
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Company Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Company Email
                                    </label>
                                    <Input
                                        type="email"
                                        name="companyEmail"
                                        value={formData.companyEmail}
                                        onChange={handleChange}
                                        placeholder="Company Email"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Company Mobile
                                    </label>
                                    <Input
                                        type="tel"
                                        name="companyMobile"
                                        value={formData.companyMobile}
                                        onChange={handleChange}
                                        placeholder="Company Mobile"
                                    />
                                </div>
                            </>
                        )}

                        {activeStep === 1 && (
                            <>
                                <div className="col-span-12 mt-6 mb-4">
                                    <h4 className="text-sm font-medium text-default-600">
                                        Enter Address Information
                                    </h4>
                                    <p className="text-xs text-default-600 mt-1">
                                        Fill in the box with correct data
                                    </p>
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Address Line 1
                                    </label>
                                    <Input
                                        type="text"
                                        name="address1"
                                        value={formData.companyAddress.address1}
                                        onChange={handleAddressChange}
                                        placeholder="Address Line 1"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Address Line 2
                                    </label>
                                    <Input
                                        type="text"
                                        name="address2"
                                        value={formData.companyAddress.address2}
                                        onChange={handleAddressChange}
                                        placeholder="Address Line 2"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        City
                                    </label>
                                    <Input
                                        type="text"
                                        name="city"
                                        value={formData.companyAddress.city}
                                        onChange={handleAddressChange}
                                        placeholder="City"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/2 text-sm font-medium text-default-600">
                                        State
                                    </label>
                                    <Select
                                        name="state"
                                        value={formData.companyAddress.state}
                                        onValueChange={(value) => {
                                            handleAddressChange({
                                                target: { name: "state", value },
                                            });
                                            const selectedState = states.find(state => state.id.toString() === value);
                                            setSelectedStateName(selectedState ? selectedState.name : "");
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-[200px]">
                                                {states.map((state) => (
                                                    <SelectItem key={state.id} value={state.id.toString()}>
                                                        {state.name}
                                                    </SelectItem>
                                                ))}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/2 text-sm font-medium text-default-600">
                                        Country
                                    </label>
                                    <Select
                                        name="country"
                                        value={formData.companyAddress.country}
                                        onValueChange={(value) => {
                                            handleAddressChange({
                                                target: { name: "country", value },
                                            });
                                            const selectedCountry = countries.find(country => country.id.toString() === value);
                                            setSelectedCountryName(selectedCountry ? selectedCountry.name : "");
                                            console.log("Selected Country:", value);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-[200px]">
                                                {countries.map((country) => (
                                                    <SelectItem key={country.id} value={country.id.toString()}>
                                                        {country.name}
                                                    </SelectItem>
                                                ))}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Pincode
                                    </label>
                                    <Input
                                        type="text"
                                        name="pincode"
                                        value={formData.companyAddress.pincode}
                                        onChange={handleAddressChange}
                                        placeholder="Pincode"
                                    />
                                </div>
                            </>
                        )}

                        {activeStep === 2 && (
                            <>
                                <div className="col-span-12 mt-6 mb-4">
                                    <h4 className="text-sm font-medium text-default-600">
                                        Enter Owner Information
                                    </h4>
                                    <p className="text-xs text-default-600 mt-1">
                                        Fill in the box with correct data
                                    </p>
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Owner First Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="ownerFirstName"
                                        value={formData.ownerFirstName}
                                        onChange={handleChange}
                                        placeholder="Owner First Name"
                                    />
                                </div>
                                <div className="col-span-12 lg:col-span-6 flex items-center">
                                    <label className="w-1/3 text-sm font-medium text-default-600">
                                        Owner Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="ownerLastName"
                                        value={formData.ownerLastName}
                                        onChange={handleChange}
                                        placeholder="Owner Last Name"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex pt-4">
                        <Button
                            size="xs"
                            variant="outline"
                            color="destructive"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <div className="flex-1" />
                        <Button
                            size="xs"
                            color="primary"
                            className="cursor-pointer"
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                        >
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ExternalDealerForm;
