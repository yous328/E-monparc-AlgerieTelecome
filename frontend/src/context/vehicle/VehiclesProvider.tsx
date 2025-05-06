import { createContext, useState, useCallback, ReactNode } from 'react';
import { IVehicle } from '../../interfaces/Vehicle/IVehicle';
import { useFetchVehicles } from '../../hooks/Vehicle/useFetchVehicles';

interface Filters {
    type: string;
    status: string;
    assignment: string;
}

interface VehiclesContextType {
    vehicles: IVehicle[];
    loading: boolean;
    error: string;
    fetchVehicles: (filters: Filters) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const VehiclesContext = createContext<VehiclesContextType | undefined>(undefined);

export function VehiclesProvider({ children }: { children: ReactNode }) {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { fetchVehicles: fetchRawVehicles } = useFetchVehicles();

    const fetchVehicles = useCallback(async (filters: Filters) => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchRawVehicles(filters);
            setVehicles(data);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des véhicules.');
        } finally {
            setLoading(false);
        }
    }, [fetchRawVehicles]);

    return (
        <VehiclesContext.Provider value={{ vehicles, loading, error, fetchVehicles }}>
            {children}
        </VehiclesContext.Provider>
    );
}
