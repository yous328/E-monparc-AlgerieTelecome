import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useMissionTypesContext } from '../../../context/Dashboard/Missions/MissionType/useMissionTypesContext';

const COLORS = ['#3B82F6', '#60A5FA', '#38BDF8', '#A5F3FC'];

export function MissionTypesChart() {
  const { missionTypeStats, loading } = useMissionTypesContext();

  if (loading || !missionTypeStats) {
    return <div>Loading Mission Type Stats...</div>;
  }

  const data = [
    { name: 'Interne', value: missionTypeStats.internal },
    { name: 'Externe', value: missionTypeStats.external },
    { name: 'Lourd', value: missionTypeStats.heavy },
    { name: 'Léger', value: missionTypeStats.light },
  ];

  const series = data.map((item) => item.value);
  const labels = data.map((item) => item.name);

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      height: 350,
    },
    colors: COLORS,
    plotOptions: {
      radialBar: {
        track: {
          background: '#E5E7EB',
        },
        dataLabels: {
          name: { fontSize: '20px' },
          value: { fontSize: '16px' },
          
        },
      },
    },
    labels,
  };

  return (
    <div className="bg-[#EAEFED] rounded-lg p-6 shadow h-full flex flex-col">
      <h2 className="text-lg font-bold mb-6">Types de Missions</h2>
  
      <div className="flex gap-4 items-center justify-between flex-wrap md:flex-nowrap">
        {/* Left: Legend (2x2 grid) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 min-w-[200px]">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div>
                <p className="text-sm text-gray-700 font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Right: Chart */}
        <div className="flex-1 min-w-[230px] flex justify-center">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
