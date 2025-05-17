export interface IMissionForm {
    vehicleId: number | null;
    driverId: number | null;
    accompanyingEmployeeIds: number[];
    type: string;
    destination: string;
    date: string;
    time: string;
    objective: string;
    description?: string;
}

export interface IVehicleOption {
    id: number;
    name: string;
    model: string;
    brand: string;
    status?: string;
}

export interface IDriverOption {
    id: number;
    name: string;
    status?: string;
}

export interface IEmployeeOption {
    id: number;
    name: string;
    position: string;
    department: string;
    status?: string;
}

export interface IMissionTypeOption {
    id: string;
    name: string;
}

export interface IMissionObjectiveOption {
    id: string;
    name: string;
} 