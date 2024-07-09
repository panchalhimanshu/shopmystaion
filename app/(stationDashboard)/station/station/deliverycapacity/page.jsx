"use client"
import React, { useEffect, useState } from 'react'
import CallFor2 from '@/utilities/CallFor2';
import { Button } from '@/components/ui/button';

const sharedClasses = {
    input: 'w-full p-1 border border-border rounded-md bg-input text-foreground',
    button: 'ml-2 p-1 text-sm text-primary bg-transparent border-none cursor-pointer',
    label: 'block text-sm font-medium text-foreground',
    tableHeader: 'px-4 py-2 text-left text-sm font-medium text-foreground border-b border-border',
    tableCell: 'px-4 py-2 border-b border-border',
    card: 'p-4 bg-card rounded-lg shadow-md',
    flex: 'flex items-center mt-1',
    select: 'block w-full p-2 border border-border rounded-md bg-input text-foreground',
    overflow: 'overflow-x-auto',
    bgMuted: 'bg-muted',
    bgCard: 'bg-card',
}

const ShippingComponent = () => {
    const [shippingMethod, setShippingMethod] = useState('1')
    const [deliveryCapacities, setDeliveryCapacities] = useState([])
    const [slotTimes, setSlotTimes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CallFor2(`api-fe/DeliveryCapacityAdminAPI/Configure/${shippingMethod}`, 'GET', null, 'Auth');
                const capacities = Object.values(response.data.DeliveryCapacities)
                setDeliveryCapacities(capacities)
                const slots = capacities.map(capacity => capacity.DeliverySlot)
                setSlotTimes(slots)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [shippingMethod])

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const formObject = Object.fromEntries(formData.entries());

    //     // Remove shippingMethod from formObject
    //     const { shippingMethod, ...restFormObject } = formObject;

    //     // Convert all values to numbers
    //     const numericFormObject = Object.fromEntries(
    //         Object.entries(restFormObject).map(([key, value]) => [key, Number(value)])
    //     );

    //     // Create a new FormData object for the formatted data
    //     const formattedFormData = new FormData();
    //     for (const [key, value] of Object.entries(numericFormObject)) {
    //         const formattedKey = `${key}`;
    //         formattedFormData.append(formattedKey, value);
    //     }

        

    //     try {
    //         const response = await CallFor2(`api-fe/DeliveryCapacityAdminAPI/Configure/${shippingMethod}`, 'POST', formattedFormData, 'Auth');
    //         if (response.status === 200) {
    //             console.log('Form submitted successfully:', response.data);
    //         } else {
    //             console.error('Error submitting form:', response);
    //         }
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // };


    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const formObject = Object.fromEntries(formData.entries())

        // Remove shippingMethod from formObject
        const { shippingMethod, ...restFormObject } = formObject

        // Convert all values to numbers
        const numericFormObject = Object.fromEntries(
            Object.entries(restFormObject).map(([key, value]) => [key, Number(value)])
        )

        // Format data as Capacity_55_3 - 20
        const formattedData = {}
        for (const [key, value] of Object.entries(numericFormObject)) {
            const formattedKey = `${key}`
            formattedData[formattedKey] = value
        }

        try {
            const response = await CallFor2(`api-fe/DeliveryCapacityAdminAPI/Configure/${shippingMethod}`, 'POST', formattedData, 'authWithContentTypeMultipart')
            if (response.status === 200) {
                console.log('Form submitted successfully:', response.data)
            } else {
                console.error('Error submitting form:', response)
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }


    return (
        
        <div className={sharedClasses.card}>
            <div className='text-3xl text-orange-500 pb-6'>Delivery capacity
            </div>
           
            <form onSubmit={handleSubmit}>
                <div className={`mb-4 ${sharedClasses.flex}`}>
                    <label htmlFor="shipping-method" className={`pl-20 font-semibold w-1/4 ${sharedClasses.label}`}>
                        Shipping method
                    </label>
                    <div className={`w-full ${sharedClasses.flex}`}>
                        <select
                            id="shipping-method"
                            name="shippingMethod"
                            className={`w-full ${sharedClasses.select}`}
                            value={shippingMethod}
                            onChange={(e) => setShippingMethod(e.target.value)}
                        >
                            <option value="1">Ground</option>
                            <option value="2">Next Day Air</option>
                            <option value="3">2nd Day Air</option>
                        </select>
                        
                    </div>
                </div>
                <div className={sharedClasses.overflow}>
                    <table className="min-w-full bg-card border border-border">
                        <thead>
                            <tr>
                                <th className={sharedClasses.tableHeader}>Days of week</th>
                                {slotTimes.map((slot, index) => (
                                    <th key={index} className={sharedClasses.tableHeader}>{slot}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                                <TableRow key={index} day={day} capacities={deliveryCapacities} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
           
            <Button type="submit" className="bg-green-400 text-white">
              Save
            </Button>
          </div>
            </form>
        </div>
    )
}

const TableRow = ({ day, capacities }) => {
    const isBgCard = day === 'Sunday' || day === 'Tuesday' || day === 'Thursday' || day === 'Saturday'
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)

    return (
        <tr className={isBgCard ? sharedClasses.bgCard : sharedClasses.bgMuted}>
            <td className={sharedClasses.tableCell}>{day}</td>
            {capacities.map((capacity, index) => (
                <td key={index} className={sharedClasses.tableCell}>
                    <input
                        type="number"
                        name={`Capacity_${capacity.DeliverySlotId}_${dayIndex + 1}`}
                        defaultValue={capacity[`Day${dayIndex + 1}Capacity`]}
                        className={sharedClasses.input}
                    />
                </td>
            ))}
        </tr>
    )
}

export default ShippingComponent
