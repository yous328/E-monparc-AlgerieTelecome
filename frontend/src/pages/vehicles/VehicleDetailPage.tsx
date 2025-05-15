// src/pages/vehicles/VehicleDetailPage.tsx

import { Layout } from '../../layouts/MainLayout';
import { useFetchVehicleDetail } from '../../hooks/Vehicle/useFetchVehicleDetail';

import { VehicleSummaryCard } from '../../components/Vehicles/vehicleDtails/VehicleSummaryCard';
import { KilometrageLineChart } from '../../components/Vehicles/vehicleDtails/KilometrageLineChart';
import { MissionBarChart } from '../../components/Vehicles/vehicleDtails/MissionBarChart';
import { UsageHistoryTable } from '../../components/Vehicles/vehicleDtails/UsageHistoryTable';
import { TechnicalChecklist } from '../../components/Vehicles/vehicleDtails/TechnicalChecklist';
import { DirectionsCar } from '@mui/icons-material';

interface KilometragePoint {
    day: number;
    month: string;
    distance: number;
    isHighlighted?: boolean;
}

export default function VehicleDetailPage() {
    const { vehicle, loading, error } = useFetchVehicleDetail();

    if (loading) return <div className="p-6">Chargement...</div>;
    if (error) return <div className="p-6 text-red-600">Erreur: {error}</div>;
    if (!vehicle) return null;

    const flatKilometrageData: KilometragePoint[] = vehicle.monthly_kilometrage.flatMap((month) =>
        Object.entries(month.days).map(([day, distance]) => ({
            day: parseInt(day),
            month: month.month,
            distance: Number(distance),
        }))
    );

    console.log('vehicle: ', vehicle);

    return (
        <Layout>
            <div className="min-h-screen">
                {/* Breadcrumb Header */}
                <div className="px-6 pt-4 text-sm text-gray-500 font-medium flex items-center">
                    <DirectionsCar className="text-blue-600 mr-2" fontSize="small" />
                    <span className="text-blue-600">Gestion Des Véhicules</span> 
                    <span className="mx-1">&gt;</span>
                    <span>Détail Véhicules</span>
                </div>

                {/* Main Grid Layout */}
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                        {/* Left Column (60%) */}
                        <div className="lg:col-span-6 flex flex-col gap-4">
                            <VehicleSummaryCard vehicle={vehicle} />
                            <UsageHistoryTable data={vehicle.usage_history ?? []} />
                        </div>

                        {/* Right Column (40%) */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <KilometrageLineChart data={flatKilometrageData} />
                            <MissionBarChart data={vehicle.mission_stats ?? []} />
                            <TechnicalChecklist data={vehicle.technical_status ?? {}} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
