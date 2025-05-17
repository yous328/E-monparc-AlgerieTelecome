import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts';
import { useMissionRealizationContext } from '../../../context/Dashboard/Missions/MissionRealisation/useMissionRealizationContext';
import { MoreHorizontal } from 'lucide-react';

const MissionRealisation = () => {
    const { monthlyMissionStats, loading } = useMissionRealizationContext();

    if (loading) {
        return (
            <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Chargement du graphique...</div>
            </div>
        );
    }

    // Transform data for the stacked bar chart
    const chartData = monthlyMissionStats.map(stat => ({
        month: stat.month,
        completed: stat.realized, // Blue portion (completed missions)
        remaining: stat.planned - stat.realized, // White portion (non-completed missions)
        total: stat.planned // Total for reference/tooltip
    }));

    return (
        <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold text-gray-800">Réalisation Du Planning Missions</h2>
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div className="h-56 md:h-64 w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 30, right: 10, left: 10, bottom: 5 }}
                        barCategoryGap={50}
                    >
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <Tooltip 
                            cursor={false}
                            formatter={(value: number, name: string) => {
                                if (name === 'completed') return [`${value} Missions Complétées`, ''];
                                if (name === 'remaining') return [`${value} Autres Missions`, ''];
                                return [value, ''];
                            }}
                            labelFormatter={(label) => {
                                const item = chartData.find(d => d.month === label);
                                return `${label}: ${item?.total || 0} Missions`;
                            }}
                        />

                        {/* Blue portion at the bottom */}
                        <Bar
                            dataKey="completed"
                            stackId="stack"
                            fill="#4169E1"
                            radius={[0, 0, 0, 0]} 
                            barSize={30}
                            name="completed"
                        />
                        
                        {/* White portion on top with rounded corners */}
                        <Bar
                            dataKey="remaining"
                            stackId="stack"
                            fill="#FFFFFF"
                            radius={[8, 8, 0, 0]}
                            barSize={30}
                            name="remaining"
                        >
                            <LabelList
                                dataKey="total"
                                position="top"
                                style={{ 
                                    fill: '#2563EB', 
                                    fontSize: 12, 
                                    fontWeight: 600,
                                }}
                                offset={5}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MissionRealisation;
