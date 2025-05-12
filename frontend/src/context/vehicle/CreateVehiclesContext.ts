// src/context/vehicle/VehiclesContext.ts
import { createContext } from 'react';
import { IVehicle } from '../../interfaces/Vehicle/IVehicle';

interface Filters {
    type: string;
    status: string;
    assignment: string;
}

export interface VehiclesContextType {
    vehicles: IVehicle[];
    loading: boolean;
    error: string;
    currentPage: number;
    totalPages: number;
    fetchVehicles: (filters: Filters, page?: number) => Promise<void>;
}

// Export the context for use in hook and provider
export const VehiclesContext = createContext<VehiclesContextType | undefined>(undefined);
