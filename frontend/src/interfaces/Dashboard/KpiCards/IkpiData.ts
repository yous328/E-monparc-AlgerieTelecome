export interface IKpiData {
    vehicles: {
        total: number;
        occupied: number;
        available: number;
        in_breakdown: number;
    };
    drivers: {
        total: number;
        occupied: number;
        available: number;
        unavailable: number;
    };
    missions: {
        total: number;
        cancelled: number;
        in_progress: number;
        planned: number;
    };
}