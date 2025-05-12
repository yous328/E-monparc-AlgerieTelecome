import { ITechnicalStatus } from '../../../interfaces/Vehicle/ITechnicalStatus';

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
        { label: 'Chaîne', value: data.chaine },
        { label: 'Penneau', value: data.pneus },
        { label: 'Filtres', value: data.filtres },
        { label: 'Frein', value: data.plaquettes_frein },
    ];

    const renderItem = (
        label: string,
        item: ITechnicalStatus[keyof ITechnicalStatus],
        rtl = false,
        progressColor: string
    ) => (
        <div key={label} className={rtl ? 'text-right' : ''}>
            <div
                className={`mb-1 text-sm font-medium flex items-center ${rtl ? 'justify-end flex-row-reverse' : ''
                    }`}
            >
                <span className="text-gray-500 text-[11px]">{label}</span>
                <span
                    className="text-black text-[9px] font-medium"
                    style={{ [rtl ? 'marginRight' : 'marginLeft']: '60px' }}
                >
                    {item.done_at.toLocaleString()} km
                </span>
            </div>

            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
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
        <div className="bg-[#EAEFED] p-4 rounded-md shadow">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Technique</h3>
                <div className="text-gray-400 cursor-pointer">⋮</div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-[11px] text-gray-600">
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
