import { VehiclesCard } from './KpiTypes/Vehicles';
import { DriversCard } from './KpiTypes/Drivers';
import { MissionsCard } from './KpiTypes/Missions';

export function KpiCardsGroup() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <VehiclesCard />
            <DriversCard />
            <MissionsCard />
        </div>
    );
}
