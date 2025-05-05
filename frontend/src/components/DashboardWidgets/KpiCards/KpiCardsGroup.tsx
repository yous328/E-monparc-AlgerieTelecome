import { VehiclesCard } from './KpiTypes/Vehicles';
import { DriversCard } from './KpiTypes/Drivers';
import { MissionsCard } from './KpiTypes/Missions';

export function KpiCardsGroup() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VehiclesCard />
            <DriversCard />
            <MissionsCard />
        </div>
    );
}
