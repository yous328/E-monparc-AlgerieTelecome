import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useMissionTypesContext } from '../../../context/Dashboard/Missions/MissionType/useMissionTypesContext';
import { MoreVertical } from 'lucide-react';

const COLORS = ['#3B82F6', '#60A5FA', '#38BDF8', '#A5F3FC'];

export function MissionTypesChart() {
  const { missionTypeStats, loading } = useMissionTypesContext();

  if (loading || !missionTypeStats) {
    return (
      <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading Mission Type Stats...</div>
      </div>
    );
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
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false
      },
      background: 'transparent',
    },
    colors: COLORS,
    plotOptions: {
      radialBar: {
        track: {
          background: 'rgba(255,255,255,0.5)',
          strokeWidth: '97%',
          margin: 5,
        },
        dataLabels: {
          name: { 
            fontSize: '14px',
            fontWeight: 500,
            offsetY: -10,
            color: '#4B5563'
          },
          value: { 
            fontSize: '14px',
            fontWeight: 600,
            formatter: (val) => `${Math.round(val)}%`,
            color: '#1F2937'
          },
          total: {
            show: false
          }
        },
        hollow: {
          size: '35%'
        }
      },
    },
    stroke: {
      lineCap: 'round'
    },
    labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 200
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '12px',
              },
              value: {
                fontSize: '12px',
              },
            }
          }
        }
      }
    }]
  };

  return (
    <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-bold text-gray-800">Types de Missions</h2>
        <button className="text-gray-500 hover:bg-gray-100/50 p-1 rounded-full">
          <MoreVertical size={18} />
        </button>
      </div>
  
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between flex-1">
        {/* Left: Legend (2x2 grid) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4 w-full md:w-auto">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Right: Chart */}
        <div className="flex-1 w-full md:w-auto flex justify-center items-center">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={220}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
