import { useMissionTableContext } from '../../../context/Dashboard/Missions/MissionTable/useMissionTableContext';

export function MissionInProgressTable() {
    const { missionsData, loading } = useMissionTableContext();

    if (loading) {
        return <div className="text-center py-4">Chargement en cours...</div>;
    }

    return (
        <div className="bg-[#EAEFED] rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Mission En Cours</h2>
                <button className="text-sm border bg-white border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-50">
                    Ajouter Une Mission
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-white rounded">
                        <tr className="text-gray-600 font-semibold">
                            <th className="p-3"><input type="checkbox" /></th>
                            <th className="p-3">Véhicule</th>
                            <th className="p-3">Chauffeur</th>
                            <th className="p-3">Type / Mission</th>
                            <th className="p-3">Départ</th>
                            <th className="p-3">Arrivé</th>
                            <th className="p-3">Localisation</th>
                            <th className="p-3 text-right">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#F1F5F4]">
                        {missionsData.map((mission, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-3">{mission.vehicle}</td>
                                <td className="p-3">{mission.driver}</td>
                                <td className="p-3">{mission.type}</td>
                                <td className="p-3">{mission.departure}</td>
                                <td className="p-3">{mission.arrival}</td>
                                <td className="p-3">{mission.localization}</td>
                                <td className="p-3 text-right w-36">
                                    <div className="relative w-full bg-white h-3 rounded-full overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-3 bg-blue-600 rounded-full"
                                            style={{ width: `${mission.progress}%` }}
                                        >
                                        </div>
                                        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-gray-600">
                                                {mission.progress}%
                                            </span>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
