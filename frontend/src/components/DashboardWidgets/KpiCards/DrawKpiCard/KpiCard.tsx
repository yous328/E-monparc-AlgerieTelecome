// src/components/DashboardWidgets/KpiCards/KpiCard.tsx
import { IKpiCardProps } from '../../../../interfaces/Dashboard/KpiCards/IKpiCardProps';
import { KpiPieChart } from './KpiPieChart';

export function KpiCard({ title, icon, value, unit, segments }: IKpiCardProps) {
    return (
        <div className="bg-[#EAEFED] rounded-lg p-4 shadow w-full h-auto flex flex-col gap-3">
            {/* Title top-left and bold */}
            <div className="text-sm font-bold text-left text-blue-900">{title}</div>

            {/* Chart + Icon row */}
            <div className="flex items-center justify-center gap-10">
                <div className="text-4xl text-blue-900">{icon}</div>
                <div className="w-[140px] h-[140px]">
                    <KpiPieChart data={segments} centerText={value} unit={unit} />
                </div>
            </div>

            {/* Colored legend below */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
                {segments.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-gray-600">{entry.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
