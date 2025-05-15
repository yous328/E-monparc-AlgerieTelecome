import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { KpiCard } from '../DrawKpiCard/KpiCard';
import { useKpiCards } from '../../../../context/Dashboard/KpiCards/useKpiCards';

export function VehiclesCard() {
    const { kpiData } = useKpiCards();

    if (!kpiData) return null;

    const { total, available, occupied, in_breakdown } = kpiData.vehicles;

    return (
        <KpiCard
            title="Véhicules"
            icon={<FontAwesomeIcon icon={faCar} className="text-blue-500" size="2x" />}
            value={total}
            unit="Véhicules"
            segments={[
                { label: 'Occupé', value: occupied, color: '#3399FF' },
                { label: 'Disponible', value: available, color: '#66CCFF' },
                { label: 'E-panne', value: in_breakdown, color: '#000066' }
            ]}  
            bgColor="#EAEFED"          
        />
    );
}
