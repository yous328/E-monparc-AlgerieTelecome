import { useNavigate } from "react-router-dom";
import React from "react";
import { useVehicleTypes } from "../../../hooks/Vehicle/useVehicleTypes";

interface VehiclesFiltersProps {
    filters: {
        type: string;
        status: string;
        assignment: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        type: string;
        status: string;
        assignment: string;
    }>>;
}

export function VehiclesFilters({ filters, setFilters }: VehiclesFiltersProps) {
    const navigate = useNavigate();
    const { types, loading } = useVehicleTypes();

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="px-12 py-2 rounded border bg-[#edf1f0] text-sm text-gray-700 shadow-sm"
                aria-label="Filtrer par Type"
                disabled={loading}
            >
                <option value="">Filtrer par Type</option>
                {types.map(type => (
                    <option key={type.vehicleTypeID} value={type.name.toLowerCase()}>
                        {type.name}
                    </option>
                ))}
            </select>

            <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="px-12 py-2 rounded border bg-[#edf1f0] text-sm text-gray-700 shadow-sm"
                aria-label="Filtrer par Statut"
            >
                <option value="">Filtrer par Statut</option>
                <option value="Available">Disponible</option>
                <option value="OnMission">En Mission</option>
                <option value="InBreakdown">En Panne</option>
                <option value="Unavailable">Indisponible</option>
            </select>

            <select
                value={filters.assignment}
                onChange={(e) => handleFilterChange("assignment", e.target.value)}
                className="px-8 py-2 rounded border bg-[#edf1f0] text-sm text-gray-700 shadow-sm"
                aria-label="Filtrer par Affectation"
            >
                <option value="">Filtrer par Affectation</option>
                <option value="assigned">Affecté</option>
                <option value="unassigned">Non Affecté</option>
            </select>

            <div className="ml-auto">
                <button
                    onClick={() => navigate("/vehicles/add")}
                    className="px-4 py-2 bg-[#edf1f0] border text-black rounded shadow-md hover:bg-blue-50 font-semibold text-sm"
                >
                    + Ajouter Nouveau Véhicule
                </button>
            </div>
        </div>
    );
}
