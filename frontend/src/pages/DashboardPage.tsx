import { Layout } from '../layouts/MainLayout';
import { KpiCardsGroup } from '../components/DashboardWidgets/KpiCards/KpiCardsGroup';
import { MissionTypesChart } from '../components/DashboardWidgets/MissionTypes';
import MissionRealisation from '../components/DashboardWidgets/MissionRealisation';
import { MissionInProgressTable } from '../components/DashboardWidgets/MissionTable/MissionTable';
import { useKpiCards } from '../context/Dashboard/KpiCards/useKpiCards';

export function DashboardPage() {
    const { loading } = useKpiCards();

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    Loading Dashboard...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* KPI Cards (Vehicles, Drivers, Missions) */}
            <KpiCardsGroup />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <MissionTypesChart />
                <MissionRealisation />
            </div>

            {/* Mission Table */}
            <div className="mt-8">
                <MissionInProgressTable />
            </div>
        </Layout>
    );
}
