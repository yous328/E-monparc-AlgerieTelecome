import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts';
import { useMissionRealizationContext } from '../../../context/Dashboard/Missions/MissionRealisation/useMissionRealizationContext';
import { MoreVertical } from 'lucide-react';

const MissionRealisation = () => {
    const { monthlyMissionStats, loading } = useMissionRealizationContext();

    if (loading) {
        return (
            <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Chargement du graphique...</div>
            </div>
        );
    }

    const chartData = monthlyMissionStats.map(stat => ({
        month: stat.month,
        planned: stat.planned,
        realized: stat.realized,
        background: stat.planned - stat.realized,
    }));

    return (
        <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-base md:text-lg font-bold text-gray-800">Réalisation Du Planning Missions</h2>
                <button className="text-gray-500 hover:bg-gray-100/50 p-1 rounded-full">
                    <MoreVertical size={18} />
                </button>
            </div>

            <div className="h-56 md:h-64 w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 15, right: 10, left: 0, bottom: 10 }}
                    >
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fontWeight: 'bold', fill: '#4B5563' }}
                            axisLine={false}
                            tickLine={false}
                            dy={8}
                        />
                        <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.2)' }}
                            contentStyle={{ 
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                fontSize: '12px'
                            }}
                        />

                        {/* Realized part comes first (bottom) */}
                        <Bar
                            dataKey="realized"
                            stackId="a"
                            fill="#2563EB"
                            name="Réalisées"
                            barSize={30}
                            radius={[0, 0, 0, 0]}
                        />

                        {/* Unrealized (background) part comes second (top) */}
                        <Bar
                            dataKey="background"
                            stackId="a"
                            fill="#ffffff"
                            name="Non Réalisées"
                            barSize={30}
                            radius={[6, 6, 0, 0]}
                            stroke="#E5E7EB"
                            strokeWidth={1}
                        >
                            <LabelList
                                dataKey="planned"
                                position="top"
                                style={{ fill: '#374151', fontSize: 11, fontWeight: 600 }}
                                formatter={(value: number) => value}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MissionRealisation;
