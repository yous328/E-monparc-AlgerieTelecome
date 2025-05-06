import { IVehicle } from '../../interfaces/Vehicle/IVehicle';
import { createContext } from 'react';

export interface VehiclesContextType {
    vehicles: IVehicle[];
    selectedVehicle: IVehicle | null;
    loading: boolean;
    error: string | null;
    fetchVehicles: () => Promise<void>;
    setSelectedVehicle: (vehicle: IVehicle | null) => void;

    setTypeFilter: (value: string) => void;
    setStatusFilter: (value: string) => void;
    setAssignmentFilter: (value: string) => void;
    filters: {
        type: string;
        status: string;
        assignment: string;
    };
}

export const VehiclesContext = createContext<VehiclesContextType | undefined>(undefined);
