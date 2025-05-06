import { ITechnicalStatus } from './ITechnicalStatus';
import { IConsumption } from './IConsumption';
import { IUsageHistory } from './IUsageHistory';

export interface IVehicle {
    id: number;
    brand: string;
    model: string;
    registration: string;
    imageUrl: string;
    status: 'Disponible' | 'En Panne' | 'Occupé';
    kilometers: number;
    fuelLevel: number;
    costPerKm: number;
    dailyCost: number;
    driver: string;

    insurance: string;
    inspectionDate: string;
    expirationDate: string;

    averageConsumption: IConsumption;
    currentConsumption: IConsumption;

    usageHistory: IUsageHistory[];
    missions_per_month: number;
    technicalStatus: ITechnicalStatus;
}
