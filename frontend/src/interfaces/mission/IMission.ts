export interface IMissionPoint {
    id?: number;
    name: string;
    location: string;
    time: string;
    date: string;
    status?: 'completed' | 'current' | 'pending';
}

export interface IMission {
    id: string;
    vehicle: {
        id: number;
        name: string;
    };
    driver: {
        id: number;
        name: string;
    };
    accompanyingEmployee?: {
        id: number;
        name: string;
        position: string;
        department: string;
    };
    type: string;
    destination: string;
    date: string;
    time: string;
    objective: string;
    description?: string;
    status: 'in-progress' | 'scheduled' | 'canceled' | 'completed';
    progress: number;
    points: IMissionPoint[];
    createdAt: string;
    updatedAt: string;
} 