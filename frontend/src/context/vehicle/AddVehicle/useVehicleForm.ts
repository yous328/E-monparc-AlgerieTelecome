import { useContext } from "react";
import { VehicleFormContext } from "./VehicleFormContext";

export const useVehicleForm = () => {
    const context = useContext(VehicleFormContext);
    if (!context) {
        throw new Error("useVehicleForm must be used inside VehicleFormProvider");
    }
    return context;
};
