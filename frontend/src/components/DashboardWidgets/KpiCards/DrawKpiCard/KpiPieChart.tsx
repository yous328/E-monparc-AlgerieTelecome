// frontend/src/components/DashboardWidgets/KpiCards/KpiPieChart.tsx
import { FC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

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
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Smaller Pie Chart */}
            <div className="relative w-[120px] h-[120px]">
                <PieChart width={120} height={120}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        startAngle={270}
                        endAngle={-40}
                        innerRadius={38}
                        outerRadius={48}
                        paddingAngle={0}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>

                {/* Center text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-sm font-bold text-gray-800">{centerText}</div>
                    <div className="text-[10px] text-gray-500">{unit}</div>
                </div>
            </div>
        </div>
    );
};
