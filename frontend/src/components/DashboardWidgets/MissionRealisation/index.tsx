import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts';
import { useMissionRealizationContext } from '../../../context/Dashboard/Missions/MissionRealisation/useMissionRealizationContext';

const MissionRealisation = () => {
    const { monthlyMissionStats, loading } = useMissionRealizationContext();

    if (loading) return <div className="text-center p-4">Chargement du graphique...</div>;

    const chartData = monthlyMissionStats.map(stat => ({
        month: stat.month,
        planned: stat.planned,
        realized: stat.realized,
        background: stat.planned - stat.realized,
    }));

    return (
        <div className="bg-[#EAEFED] rounded-lg p-6 shadow h-full flex flex-col">
            <h2 className="text-lg font-bold mb-6">Réalisation Du Planning Missions</h2>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#4B5563' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip />

                        {/* Realized part comes first (bottom) */}
                        <Bar
                            dataKey="realized"
                            stackId="a"
                            fill="#2563EB"
                            name="Réalisées"
                            barSize={40}
                            radius={[0, 0, 0, 0]}
                        />

                        {/* Unrealized (background) part comes second (top) */}
                        <Bar
                            dataKey="background"
                            stackId="a"
                            fill="#ffffff"
                            name="Non Réalisées"
                            barSize={40}
                            radius={[8, 8, 0, 0]}
                        >
                            <LabelList
                                dataKey="planned"
                                position="top"
                                style={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MissionRealisation;
