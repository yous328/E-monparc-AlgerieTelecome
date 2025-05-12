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
        <div className="bg-[#EAEFED] rounded-md shadow p-4">
            <h3 className="font-semibold text-sm text-gray-800 mb-3">
                Chauffeur ayant Utiliser véhicule
            </h3>

            <div className="overflow-x-auto">
                <table className="min-w-full text-[11px] font-bold text-gray-600">
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="py-2">{entry.driver_name}</td>
                                <td className="py-2">{entry.phone}</td>
                                <td className="py-2">{entry.date}</td>
                                <td className="py-2">{`${entry.from}-${entry.to}`}</td>
                                <td className="py-2">{`${entry.distance_km} km`}</td>
                                <td className="py-2">{`${entry.average_speed} km/h`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
