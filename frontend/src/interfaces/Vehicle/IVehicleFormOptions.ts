export interface VehicleModel {
    modelID: number;
    model_name: string;
}

export interface VehicleBrand {
    brandID: number;
    name: string;
    models: VehicleModel[];
}

export interface VehicleType {
    vehicleTypeID: number;
    name: string;
}

export interface EngineType {
    engineTypeID: number;
    brandID: number;
    name: string;
    capacity: string;
    fuelTypeID: number;
}

export interface FuelType {
    fuelTypeID: number;
    name: string;
}

export interface Color {
    colorID: number;
    name: string;
}

export interface Service {
    serviceID: number;
    name: string;
}
