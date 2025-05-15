export interface MaintenanceItem {
    maintenanceTypeID: number;
    kilometrage: number;
    date: string;
    interval_km: number;
}

export interface Breakdown {
    type: string;
    date: string;
    description: string;
    category?: string;
}

export interface VehicleFormData {
    registration_number: string;
    brandID: string;
    modelID: string;
    vehicleTypeID: string;
    engineTypeID: string;
    colorID: string;
    fuelTypeID: string;
    mileage: string;
    serviceID: string;
    status: string;
    technical_control_date: string;
    insurance_date: string;
    vidange: object;
    batterie: object;
    bougies: object;
    penneau: object;
    mechanical_breakdowns: Breakdown[];
    electrical_breakdowns: Breakdown[];
    maintenances: MaintenanceItem[];
}  