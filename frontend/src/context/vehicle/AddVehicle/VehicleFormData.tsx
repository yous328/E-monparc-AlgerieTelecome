export interface MaintenanceItem {
    kilometrage: number | null;
    date: string;
    interval_km: number | null;
}

export interface Breakdown {
    type: string;
    date: string;
    description: string;
}


export interface VehicleFormData {
    // Step 1: General Info
    vehicleTypeID: number;
    brandID: number;
    modelID: number;
    registration_number: string;
    colorID: number;
    mileage: number;
    engineTypeID: number;
    fuelTypeID: number;
    serviceID: number;
    technical_control_date: string;
    insurance_date: string;
    status: "Available";

    // Step 2: Maintenance Info
    vidange: MaintenanceItem;
    batterie: MaintenanceItem;
    bougies: MaintenanceItem;
    penneau: MaintenanceItem;
    maintenances: MaintenanceItem[];

    // Step 3: Breakdown History
    mechanical_breakdowns: Breakdown[];
    electrical_breakdowns: Breakdown[];
}
