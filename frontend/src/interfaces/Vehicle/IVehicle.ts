export interface IVehicle {
    id: number;
    brand: string;
    registration: string;
    brandLogo: string;
    status: string;
    driver: string | null;
    driverDetails?: {
        name: string;
        phone: string;
        status?: string;
    } | null;
    kilometers: number;
    dailyCost: number;
    vidangeNextDue: number;
}
