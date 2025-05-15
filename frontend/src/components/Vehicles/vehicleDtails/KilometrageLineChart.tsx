import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    DotProps,
} from 'recharts';
import { useState, useMemo } from 'react';
import { MoreVertical } from 'lucide-react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface KilometragePoint {
    day: number;
    month: string;
    distance: number;
}

interface KilometrageLineChartProps {
    data: KilometragePoint[];
}

interface TooltipProps {
    active?: boolean;
    payload?: { value: number; payload: KilometragePoint }[];
}

// Helper: Days in a month
const getDaysInMonth = (monthName: string, year = new Date().getFullYear()): number => {
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
};

export const KilometrageLineChart = ({ data }: KilometrageLineChartProps) => {
    const months = useMemo(() => {
        const unique = new Set<string>();
        data.forEach((d) => unique.add(d.month));
        return Array.from(unique);
    }, [data]);

    const [selectedMonth, setSelectedMonth] = useState<string>(months[0] ?? '');
    const [hoveredDay, setHoveredDay] = useState<number | null>(null);
    const daysInSelectedMonth = getDaysInMonth(selectedMonth);

    const filteredData = useMemo(() => {
        return data
            .filter((d) => d.month === selectedMonth && d.day >= 1 && d.day <= daysInSelectedMonth)
            .sort((a, b) => a.day - b.day);
    }, [data, selectedMonth, daysInSelectedMonth]);

    const CustomTooltip = ({ active, payload }: TooltipProps) => {
        if (active && payload?.length) {
            const p = payload[0].payload;
            return (
                <div className="bg-white p-2 text-xs shadow-md rounded-md">
                    <p>{`${p.day} ${p.month}: ${p.distance} km`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm text-gray-700">Kilométrage réaliser</h3>

                <div className="flex items-center gap-2">
                    {/* Month Selector */}
                    <div className="relative">
                        <select
                            className="appearance-none text-xs px-3 py-1 pr-8 rounded-md bg-[#2563EB] text-white font-medium shadow-sm focus:outline-none"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <ArrowDropDownIcon className="absolute right-1 top-1/2 -translate-y-1/2 text-white pointer-events-none" style={{ fontSize: '1.2rem' }} />
                    </div>
                    
                    {/* More Options */}
                    <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            <div className="h-44 sm:h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={filteredData}
                        margin={{ top: 5, right: 10, bottom: 20, left: 10 }}
                        onMouseMove={(state) => {
                            const point = state?.activePayload?.[0]?.payload;
                            setHoveredDay(point?.day ?? null);
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                    >
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 9, fill: '#6B7280' }}
                            interval={2}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Line
                            type="monotone"
                            dataKey="distance"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            activeDot={{ r: 5 }}
                            dot={(props: DotProps & { payload: KilometragePoint }) => {
                                const { cx, cy, payload } = props;
                                const isActive = payload.day === hoveredDay && payload.distance > 0;

                                if (isActive && cx != null && cy != null) {
                                    return (
                                        <g key={`${payload.month}-${payload.day}`}>
                                            <circle cx={cx} cy={cy} r={6} fill="#3B82F6" />
                                            <circle cx={cx} cy={cy} r={4} fill="#FFFFFF" />
                                            <rect
                                                x={cx - 8}
                                                y={cy + 5}
                                                width={16}
                                                height={38}
                                                fill="#3B82F6"
                                                fillOpacity={0.2}
                                                rx={4}
                                            />
                                        </g>
                                    );
                                }

                                return (
                                    <circle
                                        key={`hidden-${payload.month}-${payload.day}`}
                                        cx={-1000}
                                        cy={-1000}
                                        r={0}
                                        fill="transparent"
                                    />
                                );
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
