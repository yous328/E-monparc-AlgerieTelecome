// src/components/DashboardWidgets/KpiCards/KpiCard.tsx
import { IKpiCardProps } from '../../../../interfaces/Dashboard/KpiCards/IKpiCardProps';
import { KpiPieChart } from './KpiPieChart';

export function KpiCard({ title, icon, value, unit, segments, bgColor = '#EAEFED' }: IKpiCardProps) {
    return (
        <div className="rounded-lg p-4 shadow-sm w-full h-full flex flex-col" style={{ backgroundColor: bgColor }}>
            {/* Title top-left and bold */}
            <div className="text-base font-bold text-left text-blue-900 mb-3">{title}</div>

            {/* Main content: Icon + Chart row, centered horizontally */}
            <div className="flex items-center justify-center gap-12 flex-1">
                {/* Icon */}
                <div className="text-4xl text-blue-500">{icon}</div>
                
                {/* Chart */}
                <div className="w-[110px] h-[110px]">
                    <KpiPieChart data={segments} centerText={value} unit={unit} />
                </div>
            </div>

            {/* Colored legend with colored dots and labels */}
            <div className="flex flex-wrap justify-center gap-3 mt-3">
                {segments.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-gray-700">{entry.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
