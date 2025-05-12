// src/pages/vehicles/VehicleDetailPage.tsx

import { Layout } from '../../layouts/MainLayout';
import { useFetchVehicleDetail } from '../../hooks/Vehicle/useFetchVehicleDetail';

import { VehicleSummaryCard } from '../../components/Vehicles/vehicleDtails/VehicleSummaryCard';
import { KilometrageLineChart } from '../../components/Vehicles/vehicleDtails/KilometrageLineChart';
import { MissionBarChart } from '../../components/Vehicles/vehicleDtails/MissionBarChart';
import { UsageHistoryTable } from '../../components/Vehicles/vehicleDtails/UsageHistoryTable';
import { TechnicalChecklist } from '../../components/Vehicles/vehicleDtails/TechnicalChecklist';

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

    return (
        <Layout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Breadcrumb Header */}
                <div className="text-sm text-gray-500 mb-4 font-medium">
                    <span className="text-blue-600">Gestion Des Véhicules</span> &gt;{' '}
                    <span>Détail Véhicules</span>
                </div>

                {/* Main 2x2 Grid (60% / 40%) */}
                <div className="grid grid-cols-10 gap-4">
                    {/* Left Column (60%) */}
                    <div className="col-span-6 flex flex-col gap-4">
                        <VehicleSummaryCard vehicle={vehicle} />
                        <UsageHistoryTable data={vehicle.usage_history ?? []} />
                    </div>

                    {/* Right Column (40%) */}
                    <div className="col-span-4 flex flex-col gap-4">
                        <KilometrageLineChart data={flatKilometrageData} />
                        <MissionBarChart data={vehicle.mission_stats ?? []} />
                        <TechnicalChecklist data={vehicle.technical_status ?? {}} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
