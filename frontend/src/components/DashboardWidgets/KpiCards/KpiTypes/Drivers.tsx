import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';
import { KpiCard } from '../DrawKpiCard/KpiCard';
import { useKpiCards } from '../../../../context/Dashboard/KpiCards/useKpiCards';
import { calculatePercentage } from '../../../../utils/calculatePercentage';

export function DriversCard() {
    const { kpiData } = useKpiCards();
    if (!kpiData) return null;

    const { total, available, occupied, unavailable } = kpiData.drivers;

    return (
        <KpiCard
            title="Chauffeurs"
            icon={<FontAwesomeIcon icon={faWalking} className="text-blue-500" size="2x" />}
            value={total}
            unit="Chauffeurs"
            segments={[
                { label: 'Occupé', value: calculatePercentage(occupied, total), color: '#3399FF' },
                { label: 'Disponible', value: calculatePercentage(available, total), color: '#66CCFF' },
                { label: 'Indisponible', value: calculatePercentage(unavailable, total), color: '#000066' }
            ]}
            bgColor="#EAEFED"
        />
    );
}
