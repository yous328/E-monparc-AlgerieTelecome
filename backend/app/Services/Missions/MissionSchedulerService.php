<?php

namespace App\Services\Missions;

use App\Models\Driver;
use App\Models\Employee;
use App\Models\Mission;
use App\Models\MissionPlan;
use App\Models\Vehicle;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class MissionSchedulerService
{
    public function createScheduledMission(array $data)
    {
        return DB::transaction(function () use ($data) {
            // 1. Create the mission
            $mission = Mission::create($data);

            // 2. Calculate mission duration
            $startDate = $mission->mission_date;
            $endDate = $mission->estimated_end_date ?? $startDate;
            $duration = $this->calculateMissionDuration($startDate, $endDate);
            $type = $duration > 1 ? 'long' : 'short';

            // 3. Create the mission plan immediately
            MissionPlan::create([
                'missionID' => $mission->missionID,
                'driverID' => $mission->driverID,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'mission_type' => $type,
                'complexity' => $mission->complexity,
            ]);

            // 4. Update vehicle, driver, and accompanying employee statuses
            $this->scheduleVehicleAvailability($mission->vehicle, false);
            $this->scheduleDriverAvailability($mission->driver, false);

            if ($mission->accompanyingEmployee) {
                $this->scheduleEmployeeAvailability($mission->accompanyingEmployee, false);
            }

            // 5. Schedule driver rest days after the mission ends
            $this->scheduleDriverRestDays($mission->driver, $endDate, $type);

            // 6. Return the loaded mission with relationships
            return $mission->load(['vehicle', 'driver', 'missionType', 'missionObjective']);
        });
    }

    protected function calculateMissionDuration($start, $end): int
    {
        return Carbon::parse($start)->diffInDays(Carbon::parse($end)) + 1;
    }

    protected function scheduleDriverRestDays(Driver $driver, $endDate, $type): void
    {
        $driver->status = 'Resting';
        $driver->save();

        // 🧠 Future logic: insert into rest_periods table based on driver type and mission duration
    }

    protected function scheduleVehicleAvailability(Vehicle $vehicle, bool $isAvailable = false): void
    {
        $vehicle->status = $isAvailable ? 'Available' : 'On Mission';
        $vehicle->save();
    }

    protected function scheduleDriverAvailability(Driver $driver, bool $isAvailable = false): void
    {
        $driver->status = $isAvailable ? 'Available' : 'On Mission';
        $driver->save();
    }

    protected function scheduleEmployeeAvailability(?Employee $employee, bool $isAvailable = false): void
    {
        if ($employee) {
            $employee->status = $isAvailable ? 'Available' : 'On Mission';
            $employee->save();
        }
    }
}
