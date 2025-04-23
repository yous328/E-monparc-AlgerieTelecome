<?php

namespace App\Services\Missions;

use App\Models\Driver;
use App\Models\Employee;
use App\Models\Mission;
use App\Models\MissionPlan;
use App\Models\Vehicle;
use Illuminate\Support\Carbon;

class MissionSchedulerService
{
    public function createScheduledMission(array $data)
    {
        // 1. Create the mission
        $mission = Mission::create($data);

        // 2. Update vehicle status to 'Occupied'
        $vehicle = $mission->vehicle;
        $vehicle->status = 'On Mission';
        $vehicle->save();

        // 3. Update driver status to 'On Mission'
        $driver = $mission->driver;
        $driver->status = 'On Mission';
        $driver->save();

        // 4. If there's an accompanying employee, mark as unavailable
        if ($mission->accompanyingEmployee) {
            $employee = $mission->accompanyingEmployee;
            $employee->status = 'On Mission'; // or 'Unavailable'
            $employee->save();
        }

        // 5. Calculate mission duration
        $startDate = $mission->mission_date;
        $endDate = $mission->estimated_end_date ?? $startDate;

        $duration = $this->calculateMissionDuration($startDate, $endDate);
        $type = $duration > 1 ? 'long' : 'short';

        // 6. Create mission plan
        $plan = MissionPlan::create([
            'missionID' => $mission->missionID,
            'driverID' => $mission->driverID,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'mission_type' => $type,
            'complexity' => $mission->complexity,
        ]);

        // 7. Schedule recovery days (for driver)
        $this->scheduleDriverRestDays($mission->driver, $endDate, $type);

        return $mission->load(['vehicle', 'driver', 'missionType', 'missionObjective']);
    }

    protected function calculateMissionDuration($start, $end): int
    {
        return Carbon::parse($start)->diffInDays(Carbon::parse($end)) + 1;
    }

    protected function scheduleDriverRestDays(Driver $driver, $endDate, $type): void
    {
        $driver->status = 'Resting';
        $driver->save();

        // Future logic: insert into rest_periods table with logic per driver type
    }

    protected function scheduleVehicleAvailability(Vehicle $vehicle, $isAvailable = false): void
    {
        $vehicle->status = $isAvailable ? 'Available' : 'On Mission';
        $vehicle->save();
    }

    protected function scheduleEmployeeAvailability(?Employee $employee, $isAvailable = false): void
    {
        if ($employee) {
            $employee->status = $isAvailable ? 'Available' : 'On Mission';
            $employee->save();
        }
    }
}
