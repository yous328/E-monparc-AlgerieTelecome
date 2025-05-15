import { createContext } from "react";
import type { VehicleFormData } from "./VehicleFormData";

export interface VehicleFormContextType {
    vehicleFormData: VehicleFormData;
    updateVehicleFormData: (data: Partial<VehicleFormData>) => void;
    resetVehicleFormData: () => void;
}

export const VehicleFormContext = createContext<VehicleFormContextType | undefined>(undefined);
