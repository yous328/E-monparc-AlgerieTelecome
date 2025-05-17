import ReactApexChart from 'react-apexcharts';

interface ConsumptionCircularProps {
    average: number;
    current: number;
    averagePercent: number;
    currentPercent: number;
}

export const ConsumptionCircular = ({
    average,
    current,
    averagePercent,
    currentPercent,
}: ConsumptionCircularProps) => {
    // Validate and sanitize percentage values
    const safeAveragePercent = isNaN(averagePercent) ? 0 : 
                              averagePercent < 0 ? 0 : 
                              averagePercent > 100 ? 100 : 
                              averagePercent;
    
    const safeCurrentPercent = isNaN(currentPercent) ? 0 : 
                              currentPercent < 0 ? 0 : 
                              currentPercent > 100 ? 100 : 
                              currentPercent;
    
    // Validate and format display values
    const safeAverage = isNaN(average) ? 0 : average;
    const safeCurrent = isNaN(current) ? 0 : current;
    
    const series = [safeAveragePercent, safeCurrentPercent];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 240,
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
                },
            },
        },
        colors: ['#304ff2', '#3eb7f8'],
        stroke: {
            lineCap: 'round',
        },
        labels: ['Cons Moy', 'Cons Act'],
    };

    // Check if we have valid data to display
    const hasValidData = !series.every(val => val === 0 || isNaN(val));

    return (
        <div className="px-2 py-1 rounded">
            {hasValidData ? (
                <ReactApexChart
                    options={options}
                    series={series}
                    type="radialBar"
                    height={220}
                />
            ) : (
                <div className="flex justify-center items-center h-[200px]">
                    <p className="text-sm text-gray-500">Données de consommation non disponibles</p>
                </div>
            )}

            <div className="flex justify-around mt-2 text-xs text-gray-700">
                <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#304ff2]"></span>
                    <strong>{Number(safeAverage).toFixed(0)}</strong> da (Cons Moy)
                </span>
                <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#3eb7f8]"></span>
                    <strong>{Number(safeCurrent).toFixed(0)}</strong> da (Cons Act)
                </span>
            </div>
        </div>
    );
};
