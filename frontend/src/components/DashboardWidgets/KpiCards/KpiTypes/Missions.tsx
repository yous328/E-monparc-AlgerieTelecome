import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
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
            icon={<FontAwesomeIcon icon={faMapMarkedAlt} size='2x' />}
            value={total}
            unit="Missions"
            segments={[
                { label: 'Annulée', value: calculatePercentage(cancelled, total), color: '#3399FF' },
                { label: 'En cours', value: calculatePercentage(in_progress, total), color: '#66CCFF' },
                { label: 'Planifiée', value: calculatePercentage(planned, total), color: '#000066' }
            ]}
        />
    );
}
