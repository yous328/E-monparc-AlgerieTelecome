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
                <div className="flex justify-center items-center h-full py-20">
                    <div className="animate-pulse text-gray-600">Loading Dashboard...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="px-4 py-6 md:px-6 max-w-screen-2xl mx-auto bg-gray-50">
                {/* KPI Cards (Vehicles, Drivers, Missions) */}
                <KpiCardsGroup />

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
                    <MissionTypesChart />
                    <MissionRealisation />
                </div>

                {/* Mission Table */}
                <div className="mt-6 md:mt-8">
                    <MissionInProgressTable />
                </div>
            </div>
        </Layout>
    );
}
