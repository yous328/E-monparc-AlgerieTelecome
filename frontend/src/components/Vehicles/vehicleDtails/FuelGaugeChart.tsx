// src/components/Vehicles/vehicleDtails/FuelGaugeChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FuelGaugeChartProps {
    value: number;
}

export const FuelGaugeChart = ({ value }: FuelGaugeChartProps) => {
    const clamped = Math.min(100, Math.max(0, value));
    const data = [
        { name: 'Fuel', value: clamped },
        { name: 'Remaining', value: 100 - clamped },
    ];
    const COLORS = ['#0B5CF7', '#E6EEF6']; // Blue and light gray colors for the gauge

    return (
        <div className="relative w-full" style={{ height: 135 }}>
            <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="105%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={70}
                            outerRadius={90}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Static labels exactly positioned to match the image */}
            <div className="absolute inset-0 pointer-events-none text-xs text-gray-500">
                {/* Left side labels */}
                <span className="absolute" style={{ left: '12%', top: '65%' }}>1m</span>
                <span className="absolute" style={{ left: '20%', top: '40%' }}>2m</span>
                <span className="absolute" style={{ left: '36%', top: '22%' }}>3m</span>
                
                {/* Right side labels */}
                <span className="absolute" style={{ right: '36%', top: '22%' }}>20m</span>
                <span className="absolute" style={{ right: '20%', top: '40%' }}>30m</span> 
                <span className="absolute" style={{ right: '12%', top: '65%' }}>50m</span>
            </div>

            {/* Center label positioned inside the gauge arc */}
            <div className="absolute left-1/2" style={{ top: '65%', transform: 'translateX(-50%)' }}>
                <span className="text-sm font-medium text-gray-800">État de carburant</span>
            </div>
        </div>
    );
};
