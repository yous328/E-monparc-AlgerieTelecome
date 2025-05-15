import { ITechnicalStatus } from '../../../interfaces/Vehicle/ITechnicalStatus';
import { MoreVertical } from 'lucide-react';

interface Props {
    data: ITechnicalStatus;
}

export const TechnicalChecklist = ({ data }: Props) => {
    const leftItems = [
        { label: 'Vidange', value: data.vidange },
        { label: 'Batterie', value: data.batterie },
        { label: 'Bougies', value: data.bougies },
        { label: 'Gaz clim', value: data.gaz_clim },
    ];

    const rightItems = [
        { label: 'chaîne', value: data.chaine },
        { label: 'Penneau', value: data.pneus },
        { label: 'Filtres', value: data.filtres },
        { label: 'Plaquettes frein', value: data.plaquettes_frein },
    ];

    const renderItem = (
        label: string,
        item: ITechnicalStatus[keyof ITechnicalStatus],
        rtl = false,
        progressColor: string
    ) => (
        <div key={label} className={rtl ? 'text-right' : ''}>
            <div className={`mb-1 text-xs font-medium flex items-center ${rtl ? 'justify-end flex-row-reverse' : ''}`}>
                <span className="text-gray-500">{label}</span>
                <span className="text-gray-800 text-[9px] font-medium ml-auto mr-2">
                    <span className="mr-1">À</span>
                    {item.next_due.toLocaleString()} km
                </span>
                <span className="text-gray-800 text-[9px] font-medium">
                    {item.done_at.toLocaleString()} km
                </span>
            </div>

            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full"
                    style={{
                        backgroundColor: progressColor,
                        width: `${Math.min((item.done_at / item.next_due) * 100, 100)}%`,
                    }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Technique</h3>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                    <MoreVertical size={16} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-5 text-xs text-gray-600">
                <div className="space-y-3">
                    {leftItems.map((item) => renderItem(item.label, item.value, false, '#3c57c6'))}
                </div>
                <div className="space-y-3">
                    {rightItems.map((item) => renderItem(item.label, item.value, true, '#6cacf9'))}
                </div>
            </div>
        </div>
    );
};
