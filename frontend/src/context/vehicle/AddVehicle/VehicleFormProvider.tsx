import { useState, ReactNode } from "react";
import { VehicleFormContext } from "./VehicleFormContext";
import type { VehicleFormData, MaintenanceItem} from "./VehicleFormData";

const initialMaintenanceItem: MaintenanceItem = {
  kilometrage: null,
  date: "",
  interval_km: null,
};

export const VehicleFormProvider = ({ children }: { children: ReactNode }) => {
  const [vehicleFormData, setVehicleFormData] = useState<VehicleFormData>({
    // Step 1
    registration_number: "",
    brandID: 0,
    modelID: 0,
    vehicleTypeID: 0,
    engineTypeID: 0,
    fuelTypeID: 0,
    colorID: 0,
    status: "Available",
    serviceID: 0,
    mileage: 0,
    technical_control_date: "",
    insurance_date: "",

    // Step 2
    vidange: initialMaintenanceItem,
    batterie: initialMaintenanceItem,
    bougies: initialMaintenanceItem,
    penneau: initialMaintenanceItem,

    // Step 3
    mechanical_breakdowns: [],
    electrical_breakdowns: [],
  });

  const updateVehicleFormData = (data: Partial<VehicleFormData>) => {
    setVehicleFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const resetVehicleFormData = () => {
    setVehicleFormData({
      registration_number: "",
      brandID: 0,
      modelID: 0,
      vehicleTypeID: 0,
      engineTypeID: 0,
      fuelTypeID: 0,
      colorID: 0,
      status: "Available",
      serviceID: 0,
      mileage: 0,
      technical_control_date: "",
      insurance_date: "",
      vidange: initialMaintenanceItem,
      batterie: initialMaintenanceItem,
      bougies: initialMaintenanceItem,
      penneau: initialMaintenanceItem,
      mechanical_breakdowns: [],
      electrical_breakdowns: [],
    });
  };

  return (
    <VehicleFormContext.Provider value={{ vehicleFormData, updateVehicleFormData, resetVehicleFormData }}>
      {children}
    </VehicleFormContext.Provider>
  );
};
