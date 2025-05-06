import { useState } from 'react';
import { Layout } from '../layouts/MainLayout';
import { VehiclesFilters } from '../components/Vehicles/VehicleFilters';
import { VehicleList } from '../components/Vehicles/VehicleList';
import { VehiclesProvider } from '../context/vehicle/VehiclesProvider';

export function VehiclesPage() {

    const [filters, setFilters] = useState({
        type: '',
        status: '',
        assignment: '',
    });

    return (
        <Layout>
            <VehiclesProvider>
                <div className="p-6">
                    {/* Page Header */}
                    <h2 className="text-2xl font-semibold text-blue-900 flex items-center gap-2 mb-6">
                        Gestion Des Véhicules
                    </h2>

                    {/* Filter Section */}
                    <VehiclesFilters filters={filters} setFilters={setFilters} />

                    {/* Vehicle Cards with Pagination */}
                    <VehicleList filters={filters} />
                </div>
            </VehiclesProvider>
        </Layout>
    );
}
