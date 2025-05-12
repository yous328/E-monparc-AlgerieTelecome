// src/context/vehicle/VehiclesProvider.tsx
import { useState, useCallback, ReactNode } from 'react';
import { VehiclesContext } from '../../context/vehicle/CreateVehiclesContext';
import { IVehicle } from '../../interfaces/Vehicle/IVehicle';
import { useFetchVehicles } from '../../hooks/Vehicle/useFetchVehicles';

interface Filters {
    type: string;
    status: string;
    assignment: string;
}

export function VehiclesProvider({ children }: { children: ReactNode }) {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { fetchVehicles: fetchRawVehicles } = useFetchVehicles();

    const fetchVehicles = useCallback(async (filters: Filters, page: number = 1) => {
        try {
            setLoading(true);
            setError('');
            const { vehicles, currentPage, totalPages } = await fetchRawVehicles(filters, page);
            setVehicles(vehicles);
            setCurrentPage(currentPage);
            setTotalPages(totalPages);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des véhicules.');
        } finally {
            setLoading(false);
        }
    }, [fetchRawVehicles]);

    return (
        <VehiclesContext.Provider value={{ vehicles, loading, error, currentPage, totalPages, fetchVehicles }}>
            {children}
        </VehiclesContext.Provider>
    );
}
