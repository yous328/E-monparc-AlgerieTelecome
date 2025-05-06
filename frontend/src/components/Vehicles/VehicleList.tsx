import { useState, useEffect } from 'react';
import { VehicleCard } from './VehicleCard';
import { useVehicles } from '../../context/vehicle/useVehicles';

const itemsPerPage = 8;

interface VehicleListProps {
    filters: {
        type: string;
        status: string;
        assignment: string;
    };
}

export function VehicleList({ filters }: VehicleListProps) {
    const { vehicles, loading, error, fetchVehicles } = useVehicles();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
        fetchVehicles(filters);
    }, [filters, fetchVehicles]);

    const totalPages = Math.ceil(vehicles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentVehicles = vehicles.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <div className="text-center text-blue-500">Chargement des véhicules...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (vehicles.length === 0) return <div className="text-center text-gray-500">Aucun véhicule trouvé.</div>;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentVehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
            <div className="flex justify-end mt-6 space-x-2">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 disabled:opacity-50"
                >
                    Précédent
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(currentPage - p) <= 1)
                    .map(p => (
                        <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-4 py-1 border border-gray-300 rounded-md ${p === currentPage
                                ? 'text-white bg-gray-700'
                                : 'text-gray-700 bg-white hover:bg-gray-100'}`}
                        >
                            {p}
                        </button>
                    ))}
                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100 disabled:opacity-50"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
