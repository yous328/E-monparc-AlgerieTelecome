
import ReactApexChart from 'react-apexcharts';

interface ConsumptionCircularProps {
    average: number;
    current: number;
}

export const ConsumptionCircular = ({ average, current }: ConsumptionCircularProps) => {
    const total = 10000;

    const avgPercent = Math.round((average / total) * 100);
    const currentPercent = Math.round((current / total) * 100);

    const series = [avgPercent, currentPercent];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 300,
        },
        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: 360,
                hollow: {
                    size: '55%',
                },
                track: {
                    background: '#F2F2F2',
                    strokeWidth: '100%',
                },
                dataLabels: {
                    show: false,
                }
            },
        },
        
        colors: ['#304ff2', '#3eb7f8'],
        stroke: {
            lineCap: 'round',
        },
        labels: ['Cons Moy', 'Cons Act'],
    };

    return (
        <div className="bg-[#EAEFED] px-4 py-2 rounded">
            

            <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={250}
            />

            <div className="flex justify-around mt-4 text-xs text-gray-700">
                <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#304ff2]"></span>
                    <strong>{average.toFixed(0)}</strong> da (Cons Moy)
                </span>
                <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#3eb7f8]"></span>
                    <strong>{current.toFixed(0)}</strong> da (Cons Act)
                </span>
            </div>
        </div>
    );
};
