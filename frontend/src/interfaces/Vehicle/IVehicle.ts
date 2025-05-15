export interface IVehicle {
    id: number;
    brand: string;
    registration: string;
    brandLogo: string;
    status: string;
    driver: string | null;
    kilometers: number;
    dailyCost: number;
    vidangeNextDue: number;
}
