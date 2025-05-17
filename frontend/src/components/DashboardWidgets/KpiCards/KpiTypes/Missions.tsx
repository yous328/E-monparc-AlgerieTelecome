import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { KpiCard } from '../DrawKpiCard/KpiCard';
import { useKpiCards } from '../../../../context/Dashboard/KpiCards/useKpiCards';
import { calculatePercentage } from '../../../../utils/calculatePercentage';

export function MissionsCard() {
    const { kpiData } = useKpiCards();
    if (!kpiData) return null;

    const { total, in_progress, cancelled, planned } = kpiData.missions;

    return (
        <KpiCard
            title="Missions"
            icon={<FontAwesomeIcon icon={faMapLocation} className="text-blue-700" size="2x" />}
            value={total}
            unit="Missions"
            segments={[
                { label: 'Annulée', value: calculatePercentage(cancelled, total), color: '#3399FF' },
                { label: 'E-cour', value: calculatePercentage(in_progress, total), color: '#66CCFF' },
                { label: 'Programmé', value: calculatePercentage(planned, total), color: '#000066' }
            ]}
            bgColor="#EAEFED"
        />
    );
}
