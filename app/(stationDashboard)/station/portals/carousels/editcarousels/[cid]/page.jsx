"use client"
import React, { useEffect, useState } from 'react';
import CallFor2 from '@/utilities/CallFor2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button } from '@/components/ui/button';
import ProductListModal from '../../additem/page';
import { renderTextToSvgTextElement } from '@unovis/ts';
import { toast as reToast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Pagination from '@/components/pagination/Pagination';

const inputClasses = "mt-1 block w-full border border-border rounded-md p-2";
const labelClasses = "block text-sm font-medium text-muted-foreground mr-4 w-1/3";
const formGroupClasses = "flex items-center space-x-4";

const animatedComponents = makeAnimated();

const EditCarousel = ({ params }) => {
    const logindata = sessionStorage.getItem('userData');
    const userData = JSON.parse(logindata);
    const router = useRouter()

    const [formData, setFormData] = useState({
        Name: "",
       VendorId: userData.nopVendorId ,
        Title: "",
        DisplayTitle: true,
        Active: true,
        WidgetZoneId: 1003,
        WidgetZoneStr: null,
        DataSourceTypeId: 100,
        DataSourceTypeStr: null,
        ShowBackgroundPicture: false,
        BackgroundPictureId: 0,
        CustomUrl: null,
        NumberOfItemsToShow: 5,
        AutoPlay: false,
        CustomCssClass: null,
        DisplayOrder: 0,
        Loop: false,
        StartPosition: 0,
        Center: false,
        Nav: false,
        LazyLoad: false,
        LazyLoadEager: 0,
        AutoPlayTimeout: 0,
        AutoPlayHoverPause: false,
        CreatedOn: "0001-01-01T00:00:00",
        UpdatedOn: "0001-01-01T00:00:00",
        OCarouselItemSearchModel: {
            OCarouselId: 0,
            Page: 1,
            PageSize: 10,
            AvailablePageSizes: null,
            Draw: null,
            Start: 0,
            Length: 10,
            CustomProperties: {}
        },
        SelectedStoreIds: [],
        Id: 0,
        CustomProperties: {}
    });
    


    const [widgetZones, setWidgetZones] = useState([]);
    const [dataSources, setDataSources] = useState([]);
    const [backgroundPicture, setBackgroundPicture] = useState(null);
    const [backgroundPicturePreview, setBackgroundPicturePreview] = useState(null);
    const [OCarouselItemList, setOCarouselItemList] = useState([])
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingDisplayOrder, setEditingDisplayOrder] = useState(null);

    
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [pageSize, setPageSize] = useState(5);


    const OCarouselItemLists = async (page = 1) => {
        setLoading(true);
        try {

            const OCarouselItemListBody = {
                OCarouselId: params.cid,
                   Page: page,
                    PageSize: pageSize,
                    AvailablePageSizes: null,
                    Draw: null,
                    Start: (page - 1) * pageSize,
                    Length: pageSize,
                "CustomProperties": {}
            }
            const response = await CallFor2(
                `api/OCarouselVendorShopAdminAPI/OCarouselItemList`,
                "post",
                OCarouselItemListBody,
                "Auth"
            );
            setOCarouselItemList(response.data.Data)
            setTotalPages(Math.ceil(response.data.recordsTotal / pageSize));
            setCurrentPage(page);

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {

      
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await CallFor2(
                    `api/OCarouselVendorShopAdminAPI/GetCarouselById/${params.cid}`,
                    "get",
                    null,
                    "Auth"
                );
                setFormData(response.data);
                setWidgetZones(response.data.AvailableWidgetZones);
                setDataSources(response.data.AvailableDataSources);
                setStores(response.data.AvailableStores);
                if (response.data.ShowBackgroundPicture && response.data.CustomUrl) {
                    setBackgroundPicturePreview(response.data.CustomUrl);
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        // OCarouselItemList(1)
        fetchData();
    }, [params]);

    const handlePageChange = (page) => {
        OCarouselItemLists(page);
    };

    useEffect(() => {
        OCarouselItemLists(1);
    }, [params.id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'ShowBackgroundPicture' && !checked) {
            setBackgroundPicture(null);
            setBackgroundPicturePreview(null);
            setFormData(prevState => ({ ...prevState, BackgroundPictureId: 0 }));
        }
    };

    const handlePictureUpload = async (e) => {
        const file = e.target.files[0];
        // setFormData(prevState => ({
        //     ...prevState,
        //     BackgroundPictureId: response.data.Data.PictureId,
        //     CustomUrl: response.data.Data.PictureUrl
        // }));
        if (file) {
            setBackgroundPicture(file);
            setBackgroundPicturePreview(URL.createObjectURL(file));

            const formData = new FormData();
            formData.append('picturefile', file);

            try {
                const response = await CallFor2(
                    'api-fe/Account/UploadPicture',
                    'post',
                    formData,
                    'authWithContentTypeMultipart'
                );

                if (response.data) {
                    setFormData(prevState => ({
                        ...prevState,
                        BackgroundPictureId: response.data.Data.PictureId,
                        CustomUrl: response.data.Data.PictureUrl
                    }));
                }
            } catch (error) {
                console.error('Error uploading picture:', error);
            }
        }
    };

    const removePicture = () => {
        setBackgroundPicture(null);
        setBackgroundPicturePreview(null);
        setFormData(prevState => ({ ...prevState, BackgroundPictureId: 0, CustomUrl: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const submissionData = {
                ...formData,
                AvailableWidgetZones: widgetZones.map(zone => ({
                    ...zone,
                    Selected: zone.Value === formData.WidgetZoneId.toString()
                })),
                AvailableDataSources: dataSources.map(source => ({
                    ...source,
                    Selected: source.Value === formData.DataSourceTypeId.toString()
                })),
                AvailableStores: stores.map(store => ({
                    ...store,
                    Selected: formData.SelectedStoreIds.includes(store.Value)
                    
                })),
                Locales: [{ LanguageId: 1, Title: formData.Title }]
            };

            const response = await CallFor2(
                'api/OCarouselVendorShopAdminAPI/Edit',
                'post',
                submissionData,
                'Auth'
            );
            if (response){
                reToast.success('Edit carousels successful');
                router.push("/station/portals/carousels") 
            }
            console.log('Form submitted successfully:', response);
            setLoading(false);
            // Handle successful submissiron (e.g., show success message, redirect)
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error);
            setLoading(false);
        }
    };

    const handleEdit = (item,e) => {
        e.preventDefault(); 
        setEditingItemId(item.Id);
        setEditingDisplayOrder(item.DisplayOrder);
    };

    const handleCancelEdit = (e) => {
        setEditingItemId(null);
        setEditingDisplayOrder(null);
    };

    const handleSaveEdit = async (item, e) => {
        e.preventDefault();  // Prevent the default form submission
        e.stopPropagation(); // Stop the event from bubbling up to parent elements

        try {
            const response = await CallFor2(
                'api/OCarouselVendorShopAdminAPI/OCarouselItemEdit',
                'post',
                {
                    ...item,
                    DisplayOrder: editingDisplayOrder
                },
                'Auth'
            );

            if (response) {
                reToast.success('Display order updated');
                setOCarouselItemList(prevList =>
                    prevList.map(i => i.Id === item.Id ? { ...i, DisplayOrder: editingDisplayOrder } : i)
                );
                setEditingItemId(null);
                setEditingDisplayOrder(null);
            }
        } catch (error) {
            console.error('Error updating carousel item:', error);
            reToast.error('Failed to update display order');
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">Edit Carousel</h2>
                <div className="p-6 mt-6 bg-card rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-3">Info</h3>
                    <div className="space-y-4">
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Title</label>
                            <input
                                type="text"
                                name="Title"
                                value={formData.Title}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Display title</label>
                            <input
                                type="checkbox"
                                name="DisplayTitle"
                                checked={formData.DisplayTitle}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Widget zone</label>
                            <Select
                                name="WidgetZoneId"
                                value={widgetZones.find(zone => zone.Value === formData.WidgetZoneId.toString())}
                                onChange={(selectedOption) => setFormData(prev => ({
                                    ...prev,
                                    WidgetZoneId: parseInt(selectedOption.Value)
                                }))}
                                options={widgetZones}
                                getOptionLabel={(option) => option.Text}
                                getOptionValue={(option) => option.Value}
                                className="w-full"
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Data source type</label>
                            <Select
                                name="DataSourceTypeId"
                                value={dataSources.find(source => source.Value === formData.DataSourceTypeId.toString())}
                                onChange={(selectedOption) => setFormData(prev => ({
                                    ...prev,
                                    DataSourceTypeId: parseInt(selectedOption.Value)
                                }))}
                                options={dataSources}
                                getOptionLabel={(option) => option.Text}
                                getOptionValue={(option) => option.Value}
                                className="w-full"
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Show Background Picture</label>
                            <input
                                type="checkbox"
                                name="ShowBackgroundPicture"
                                checked={formData.ShowBackgroundPicture}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        {formData.ShowBackgroundPicture && (
                            <div className={formGroupClasses}>
                                <label className={labelClasses}>Background Picture</label>
                                <div className="flex flex-col items-start">
                                {!backgroundPicturePreview && <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePictureUpload}
                                        className={inputClasses}
                                    />}
                                    {backgroundPicturePreview && (
                                        <div className="mt-2">
                                            <img src={backgroundPicturePreview} alt="Background Preview" className="max-w-xs max-h-40 object-contain" />
                                            <button
                                                type="button"
                                                onClick={removePicture}
                                                className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Remove Picture
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Display order</label>
                            <input
                                type="number"
                                name="DisplayOrder"
                                value={formData.DisplayOrder}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        <div className={formGroupClasses}>
                <label className={labelClasses}>Limited to stores</label>
                <Select
                    isMulti
                    components={animatedComponents}
                    name="SelectedStoreIds"
                    value={stores.filter(store => formData.SelectedStoreIds.some(id => id == store.Value))}
                    onChange={(selectedOptions) => handleSelectChange('SelectedStoreIds', selectedOptions)}
                    options={stores}
                    getOptionLabel={(option) => option.Text}
                    getOptionValue={(option) => option.Value}
                    className="w-full"
                />
            </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Active</label>
                            <input
                                type="checkbox"
                                name="Active"
                                checked={formData.Active}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 mt-6 bg-card rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-3">Properties</h3>
                    <div className="space-y-4">
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>NAV</label>
                            <input
                                type="checkbox"
                                name="Nav"
                                checked={formData.Nav}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Auto play</label>
                            <input
                                type="checkbox"
                                name="AutoPlay"
                                checked={formData.AutoPlay}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        {formData.AutoPlay && (
                            <>
                                <div className={formGroupClasses}>
                                    <label className={labelClasses}>Auto Play Timeout</label>
                                    <input
                                        type="number"
                                        name="AutoPlayTimeout"
                                        value={formData.AutoPlayTimeout}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                    />
                                </div>
                                <div className={formGroupClasses}>
                                    <label className={labelClasses}>Auto play hover pause</label>
                                    <input
                                        type="checkbox"
                                        name="AutoPlayHoverPause"
                                        checked={formData.AutoPlayHoverPause}
                                        onChange={handleInputChange}
                                        className="mt-1"
                                    />
                                </div>
                            </>
                        )}
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Lazy load</label>
                            <input
                                type="checkbox"
                                name="LazyLoad"
                                checked={formData.LazyLoad}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        {formData.LazyLoad && (
                            <div className={formGroupClasses}>
                                <label className={labelClasses}>Lazy load Eager</label>
                                <input
                                    type="number"
                                    name="LazyLoadEager"
                                    value={formData.LazyLoadEager}
                                    onChange={handleInputChange}
                                    className={inputClasses}
                                />
                            </div>
                        )}
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Start position</label>
                            <input
                                type="number"
                                name="StartPosition"
                                value={formData.StartPosition}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Loop</label>
                            <input
                                type="checkbox"
                                name="Loop"
                                checked={formData.Loop}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Center</label>
                            <input
                                type="checkbox"
                                name="Center"
                                checked={formData.Center}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>
                        <div className={formGroupClasses}>
                            <label className={labelClasses}>Custom CSS class</label>
                            <input
                                type="text"
                                name="CustomCssClass"
                                value={formData.CustomCssClass}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 mt-6 bg-card rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-3">Carousel items</h3>
                    <div className="space-y-4">
                        <div className="space-y-4">

                            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                    
                                   
                                </div>
                                <div className="mt-6 flex flex-col">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr className="divide-x divide-gray-200">
                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                            >
                                                                <span>Picture</span>
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                                                            >
                                                                Product
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                            >
                                                                View
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                            >
                                                                Display order
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                            >
                                                                Action
                                                            </th>
                                                            {/* <th scope="col" className="relative px-4 py-3.5">
                                                               <span className="sr-only">Edit</span>
                                                            </th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 ">
                                                        {OCarouselItemList.map((item) => (
                                                            <tr key={item.Id} className="divide-x divide-gray-200">
                                                                <td className="whitespace-nowrap px-4 py-4">
                                                                    <div className="flex items-center">
                                                                        <div className="flex-shrink-0">
                                                                            <img
                                                                                className="h-20 object-cover"
                                                                                src={item.PictureUrl}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace px-5 w-1/4 py-4">
                                                                    <div className="text-sm text-gray-900 dark:text-white">{item.ProductName}</div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-4 py-4">
                                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                        {/* View information if needed */}
                                                                    </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-4 py-4 text-sm dark:text-white text-gray-500">
                                                                    {editingItemId === item.Id ? (
                                                                        <input
                                                                            type="number"
                                                                            value={editingDisplayOrder}
                                                                            onChange={(e) => setEditingDisplayOrder(Number(e.target.value))}
                                                                            className="w-20 px-2 py-1 border rounded"
                                                                        />
                                                                    ) : (
                                                                        item.DisplayOrder
                                                                    )}
                                                                </td>
                                                                <td className="whitespace-nowrap px-4 py-4 dark:text-white text-sm font-medium">
                                                                    {editingItemId === item.Id ? (
                                                                        <>
                                                                            <Button
                                                                                onClick={(e) => handleSaveEdit(item, e)}
                                                                                className="mx-2 bg-green-500 text-white px-2 py-1 rounded text-xs"
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                            <Button
                                                                                onClick={handleCancelEdit}
                                                                                className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </>
                                                                    ) : (
                                                                        <Button
                                                                            onClick={(e) => handleEdit(item,e)}
                                                                            className=""
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 w-full border-gray-300">
                                    <div className="mt-2 flex items-center justify-end">
                                    <div className="space-x-2">
                                    <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>


















                            <ProductListModal cid={params.cid} />
                        </div>
                        
                    </div>
                </div>
                <div className="mt-6 flex space-x-4">
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded"
                        disabled={loading}
                    > Save </button>
                    {/* <button
                        type="button"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded"
                    >
                        Save and Continue Edit
                    </button> */}
                </div>
            </div>
        </form>
    );
};

export default EditCarousel;
