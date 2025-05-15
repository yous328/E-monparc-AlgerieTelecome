import { MoreVertical } from 'lucide-react';

interface DriverUsage {
    driver_name: string;
    phone: string;
    date: string;
    from: string;
    to: string;
    distance_km: string;
    average_speed: string;
}

interface UsageTableProps {
    data: DriverUsage[];
}

export const UsageHistoryTable = ({ data }: UsageTableProps) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">
                    Chauffeur ayant Utiliser véhicule
                </h3>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                    <MoreVertical size={16} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-xs font-medium text-gray-600">
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index} className="border-b border-gray-100">
                                <td className="py-3">{entry.driver_name}</td>
                                <td className="py-3">{entry.phone}</td>
                                <td className="py-3">{entry.date}</td>
                                <td className="py-3">{entry.from}-{entry.to}</td>
                                <td className="py-3">{entry.distance_km} km</td>
                                <td className="py-3">{entry.average_speed} km/h</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
