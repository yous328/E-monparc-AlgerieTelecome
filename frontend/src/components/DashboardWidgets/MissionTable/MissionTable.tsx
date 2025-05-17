import { useMissionTableContext } from '../../../context/Dashboard/Missions/MissionTable/useMissionTableContext';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MissionInProgressTable() {
    const { missionsData, loading } = useMissionTableContext();
    const [selectedMissions, setSelectedMissions] = useState<number[]>([]);
    const navigate = useNavigate();

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedMissions(missionsData.map((_, index) => index));
        } else {
            setSelectedMissions([]);
        }
    };

    const toggleSelectMission = (index: number) => {
        if (selectedMissions.includes(index)) {
            setSelectedMissions(selectedMissions.filter(i => i !== index));
        } else {
            setSelectedMissions([...selectedMissions, index]);
        }
    };

    const handleAddMission = () => {
        navigate('/missions/add');
    };

    if (loading) {
        return (
            <div className="bg-[#EAEFED] rounded-lg p-4 md:p-6 shadow-md flex items-center justify-center h-32">
                <div className="animate-pulse text-gray-600">Chargement en cours...</div>
            </div>
        );
    }

    return (
        <div className="bg-[#EAEFED] rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
                <h2 className="text-base md:text-lg font-bold text-gray-800">Mission En Cours</h2>
                <button 
                    className="flex items-center gap-2 text-xs sm:text-sm bg-white border border-blue-500 text-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors shadow-sm"
                    onClick={handleAddMission}
                >
                    <Plus size={16} />
                    <span>Ajouter Une Mission</span>
                </button>
            </div>

            <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle p-4 md:p-0">
                    <table className="min-w-full text-xs md:text-sm text-left text-gray-700">
                        <thead className="bg-white rounded-md">
                        <tr className="text-gray-600 font-semibold">
                                <th className="p-2 md:p-3 whitespace-nowrap rounded-l-md">
                                    <input 
                                        type="checkbox" 
                                        className="rounded text-blue-500 focus:ring-blue-500" 
                                        onChange={toggleSelectAll} 
                                        checked={selectedMissions.length === missionsData.length && missionsData.length > 0}
                                    />
                                </th>
                                <th className="p-2 md:p-3 whitespace-nowrap">Véhicule</th>
                                <th className="p-2 md:p-3 whitespace-nowrap">Chauffeur</th>
                                <th className="p-2 md:p-3 whitespace-nowrap">Type / Mission</th>
                                <th className="p-2 md:p-3 whitespace-nowrap">Départ</th>
                                <th className="p-2 md:p-3 whitespace-nowrap">Arrivé</th>
                                <th className="p-2 md:p-3 whitespace-nowrap">Localisation</th>
                                <th className="p-2 md:p-3 text-right whitespace-nowrap rounded-r-md">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#F1F5F4]">
                        {missionsData.map((mission, index) => (
                                <tr key={index} className="border-t border-gray-100 hover:bg-[#E9F0ED] transition-colors">
                                    <td className="p-2 md:p-3">
                                        <input 
                                            type="checkbox" 
                                            className="rounded text-blue-500 focus:ring-blue-500" 
                                            checked={selectedMissions.includes(index)}
                                            onChange={() => toggleSelectMission(index)}
                                        />
                                </td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">{mission.vehicle}</td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">{mission.driver}</td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">{mission.type}</td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">{mission.departure}</td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">{mission.arrival}</td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">{mission.localization}</td>
                                    <td className="p-2 md:p-3 text-right w-28 md:w-36">
                                        <div className="relative w-full bg-white h-2 md:h-3 rounded-full overflow-hidden shadow-inner">
                                        <div
                                                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                                            style={{ width: `${mission.progress}%` }}
                                        >
                                        </div>
                                            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] text-gray-600 font-medium">
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
        </div>
    );
}
