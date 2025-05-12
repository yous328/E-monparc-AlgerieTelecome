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
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <select
                value={filters.type}
                onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
                className="px-12 py-2 rounded border bg-[#edf1f0] text-sm text-gray-700 shadow-sm"
            >
                <option value="">Filtrer par Type</option>
                <option value="van">Van</option>
                <option value="camion">Camion</option>
                <option value="utilitaire">Utilitaire</option>
            </select>

            <select
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="px-12 py-2 rounded border bg-[#edf1f0]  text-sm text-gray-700 shadow-sm"
            >
                <option value="">Filtrer par Statut</option>
                <option value="Disponible">Disponible</option>
                <option value="Occupé">En Mission</option>
                <option value="En Panne">En Panne</option>
            </select>

            <select
                value={filters.assignment}
                onChange={(e) => setFilters((prev) => ({ ...prev, assignment: e.target.value }))}
                className="px-8 py-2 rounded border bg-[#edf1f0] text-sm text-gray-700 shadow-sm"
            >
                <option value="">Filtrer par Affectation</option>
                <option value="affecté">Affecté</option>
                <option value="non_affecté">Non Affecté</option>
            </select>

            <div className="ml-auto">
                <button className="px-4 py-2 bg-[#edf1f0] border text-black rounded shadow-md hover:bg-blue-50 font-semibold text-sm">
                    + Ajouter Nouveau Véhicule
                </button>
            </div>
        </div>
    );
}
