import api from '../../lib/axios';
import toast from 'react-hot-toast';
import { VehicleFormData } from "../../context/vehicle/AddVehicle/VehicleFormData";

export const submitVehicleForm = async (formData: VehicleFormData) => {
    const payload = new FormData();

    payload.append('registration_number', String(formData.registration_number));
    payload.append('brandID', String(formData.brandID));
    payload.append('modelID', String(formData.modelID));
    payload.append('vehicleTypeID', String(formData.vehicleTypeID));
    payload.append('engineTypeID', String(formData.engineTypeID));
    payload.append('colorID', String(formData.colorID));
    payload.append('fuelTypeID', String(formData.fuelTypeID));
    payload.append('mileage', String(formData.mileage));
    payload.append('serviceID', String(formData.serviceID));
    payload.append('status', String(formData.status));
    payload.append('technical_control_date', String(formData.technical_control_date));
    payload.append('insurance_date', String(formData.insurance_date));

    // Convert objects to JSON strings
    payload.append('vidange', JSON.stringify(formData.vidange));
    payload.append('batterie', JSON.stringify(formData.batterie));
    payload.append('bougies', JSON.stringify(formData.bougies));
    payload.append('penneau', JSON.stringify(formData.penneau));
    
    // Handle arrays properly for Laravel
    // For maintenances array
    const maintenances = formData.maintenances || [];
    if (maintenances.length > 0) {
        maintenances.forEach((item, index) => {
            payload.append(`maintenances[${index}][maintenanceTypeID]`, String(item.maintenanceTypeID));
            
            // Ensure kilometrage is a valid non-negative number
            const kilometrage = item.kilometrage !== null && item.kilometrage !== undefined 
                ? Math.max(0, Number(item.kilometrage)) // Convert to number and ensure it's >= 0
                : 0;
            payload.append(`maintenances[${index}][kilometrage]`, String(kilometrage));
            
            if (item.date) {
                payload.append(`maintenances[${index}][date]`, String(item.date));
            } else {
                // Default date to today if missing
                payload.append(`maintenances[${index}][date]`, new Date().toISOString().split('T')[0]);
            }
            
            // Ensure interval_km is a valid non-negative number
            const interval = item.interval_km !== null && item.interval_km !== undefined 
                ? Math.max(0, Number(item.interval_km)) 
                : 0;
            payload.append(`maintenances[${index}][interval_km]`, String(interval));
        });
    } else {
        // Ensure an empty array is sent in a way Laravel recognizes
        payload.append('maintenances[0]', '');
        payload.delete('maintenances[0]'); // Delete it to make it truly empty but still recognized as an array
    }
    
    // For mechanical breakdowns
    const mechanicalBreakdowns = formData.mechanical_breakdowns || [];
    if (mechanicalBreakdowns.length > 0) {
        mechanicalBreakdowns.forEach((bd, index) => {
            // Add the breakdownTypeID - using 1 as a default
            payload.append(`mechanical_breakdowns[${index}][breakdownTypeID]`, '1');
            payload.append(`mechanical_breakdowns[${index}][type]`, bd.type);
            payload.append(`mechanical_breakdowns[${index}][date]`, bd.date);
            if (bd.description) {
                payload.append(`mechanical_breakdowns[${index}][description]`, bd.description);
            } else {
                payload.append(`mechanical_breakdowns[${index}][description]`, 'No description provided');
            }
        });
    } else {
        // Ensure an empty array is sent in a way Laravel recognizes
        payload.append('mechanical_breakdowns[0]', '');
        payload.delete('mechanical_breakdowns[0]'); // Delete it to make it truly empty but still recognized as an array
    }
    
    // For electrical breakdowns
    const electricalBreakdowns = formData.electrical_breakdowns || [];
    if (electricalBreakdowns.length > 0) {
        electricalBreakdowns.forEach((bd, index) => {
            // Add the breakdownTypeID - using 2 as a default
            payload.append(`electrical_breakdowns[${index}][breakdownTypeID]`, '2');
            payload.append(`electrical_breakdowns[${index}][type]`, bd.type);
            payload.append(`electrical_breakdowns[${index}][date]`, bd.date);
            if (bd.description) {
                payload.append(`electrical_breakdowns[${index}][description]`, bd.description);
            } else {
                payload.append(`electrical_breakdowns[${index}][description]`, 'No description provided');
            }
        });
    } else {
        // Ensure an empty array is sent in a way Laravel recognizes
        payload.append('electrical_breakdowns[0]', '');
        payload.delete('electrical_breakdowns[0]'); // Delete it to make it truly empty but still recognized as an array
    }
    
    console.log('Sending payload to server:', {
        ...Object.fromEntries(payload.entries())
    });
    
    try {
        const response = await api.post('admin/vehicles/add', payload);
        toast.success('Vehicle added successfully!');
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            console.error('Validation errors:', error.response.data);
            if (error.response.data.errors) {
                Object.entries(error.response.data.errors).forEach(([field, messages]: [string, any]) => {
                    console.error(`Field ${field} errors:`, messages);
                    toast.error(`${field}: ${messages[0]}`);
                });
            } else {
                toast.error('Validation failed. Please check your input.');
            }
        } else {
            console.error('API error:', error);
        toast.error('Failed to add vehicle. Please try again.');
        }
        throw error;
    }
};
