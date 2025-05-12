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
    const COLORS = ['#044EEE', '#DFECF4'];

    return (
        <div className="relative bg-[#EAEFED] p-4 w-full" style={{ height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={75}
                        outerRadius={100}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Static Labels positioned manually */}
            <div className="absolute inset-0 pointer-events-none text-[10px] text-gray-500">
                {/* 1m - bottom left */}
                <span className="absolute bottom-[18px] left-[0px]">1m</span>

                {/* 2m - lower left */}
                <span className="absolute bottom-[55px] left-[12px]">2m</span>

                {/* 3m - upper left */}
                <span className="absolute top-[45px] left-[30px]">3m</span>

                {/* 20m - top center-left */}
                <span className="absolute top-[45px] left-[195px]">20m</span>

                {/* 30m - top center-right */}
                <span className="absolute top-[80px] right-[3px]">30m</span>

                {/* 50m - lower right */}
                <span className="absolute bottom-[23px] right-[-5px]">50m</span>
            </div>


            {/* Center label */}
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px] font-bold text-gray-700">
                État de carburant
            </div>
        </div>
    );
};
