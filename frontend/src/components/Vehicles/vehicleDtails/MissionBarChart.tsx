import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
} from 'recharts';

interface MissionBarChartProps {
    data: { month: string; mission: number }[];
}

export const MissionBarChart = ({ data }: MissionBarChartProps) => {
    const maxValue = Math.max(...data.map((d) => d.mission));

    return (
        <div className="bg-[#EAEFED] p-4 rounded-md shadow">
            <div className="mb-1">
                <h3 className="font-semibold text-sm text-gray-800">Missions par Mois</h3>
            </div>

            <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 10, fill: '#6B7280' }}
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
                            }}
                            labelStyle={{ color: '#2563EB', fontWeight: 600 }}
                            formatter={(value: number) => [`${value}`, 'Missions']}
                        />
                        <Bar dataKey="mission" radius={[6, 6, 0, 0]} minPointSize={5}>
                            <LabelList
                                dataKey="mission"
                                position="top"
                                formatter={(value: number) => value}
                                style={{ fontSize: 10, fill: 'gray' }}
                            />
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
