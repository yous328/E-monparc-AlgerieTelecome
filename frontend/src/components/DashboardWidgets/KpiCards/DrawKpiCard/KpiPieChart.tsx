// frontend/src/components/DashboardWidgets/KpiCards/KpiPieChart.tsx
import { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Segment {
    label: string;
    value: number;
    color: string;
}

interface Props {
    data: Segment[];
    centerText?: string | number;
    unit?: string;
}

export const KpiPieChart: FC<Props> = ({ data, centerText, unit }) => {
    // Add a small gap between segments
    const chartData = data.map(item => ({ ...item }));
    
    // Calculate total for percentage calculation
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-[120px] max-h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                            data={chartData}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                            startAngle={90}
                            endAngle={-270}
                            innerRadius="70%"
                            outerRadius="100%"
                            paddingAngle={2}
                            cornerRadius={3}
                            strokeWidth={0}
                    >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    stroke="none"
                                />
                        ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>

                {/* Center text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-lg font-bold text-gray-800">{centerText}</div>
                    <div className="text-[10px] text-gray-500">{unit}</div>
                </div>
            </div>
        </div>
    );
};
