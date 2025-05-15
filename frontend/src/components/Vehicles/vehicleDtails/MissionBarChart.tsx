import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { MoreVertical } from 'lucide-react';

interface MissionBarChartProps {
    data: { month: string; mission: number }[];
}

export const MissionBarChart = ({ data }: MissionBarChartProps) => {
    const maxValue = Math.max(...data.map((d) => d.mission));

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-gray-800">Missions par Mois</h3>
                <div className="text-sm text-gray-500">
                    <span className="text-xs text-gray-500">28 weeks, 4 days pregnant</span>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                    <MoreVertical size={16} />
                </button>
            </div>

            <div className="h-44 sm:h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 9, fill: '#6B7280' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: '#fff',
                                fontSize: '12px',
                                borderRadius: '4px',
                                border: 'none',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                            labelStyle={{ color: '#2563EB', fontWeight: 600 }}
                            formatter={(value: number) => [`${value}`, 'Missions']}
                        />
                        <Bar dataKey="mission" radius={[4, 4, 0, 0]} barSize={18} minPointSize={5}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.mission === maxValue ? '#2563EB' : '#FFFFFF'}
                                    stroke="#CBD5E0"
                                    strokeWidth={1}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
