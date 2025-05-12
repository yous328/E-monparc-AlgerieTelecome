<?php

namespace Database\Factories;

use App\Models\Mission;
use App\Models\Vehicle;
use App\Models\Driver;
use App\Models\Employee;
use App\Models\MissionType;
use App\Models\MissionObjective;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MissionFactory extends Factory
{
    protected $model = Mission::class;

    public function definition(): array
    {
        $startDate = now()->addDays(rand(0, 7));
        $isLong = rand(0, 1);
        $duration = $isLong ? rand(2, 3) : 1;

        $vehicle = Vehicle::inRandomOrder()->first() ?? Vehicle::factory()->create();
        $driver = Driver::inRandomOrder()->first() ?? Driver::factory()->create();
        $employee = Employee::inRandomOrder()->first();
        $missionType = MissionType::inRandomOrder()->first() ?? MissionType::factory()->create();
        $missionObjective = MissionObjective::inRandomOrder()->first() ?? MissionObjective::factory()->create();
        $admin = User::where('role', 'Admin')->inRandomOrder()->first() ?? User::factory()->create(['role' => 'Admin']);

        return [
            'vehicleID' => $vehicle->vehicleID,
            'driverID' => $driver->driverID,
            'accompanyingEmployeeID' => rand(0, 1) && $employee ? $employee->employeeID : null,
            'missionTypeID' => $missionType->missionTypeID,
            'estimated_end_date' => $startDate->copy()->addDays($duration),
            'departure_location' => $this->faker->randomElement(['Alger', 'Tlemcen', 'Oran', 'Sétif', 'Bejaia']),
            'destination' => $this->faker->randomElement(['Annaba', 'Batna', 'Constantine', 'Blida']),
            'mission_date' => $startDate,
            'mission_time' => $this->faker->time('H:i:s'),
            'missionObjectiveID' => $missionObjective->missionObjectiveID,
            'description' => $this->faker->sentence(),
            'distance_km' => $this->faker->randomFloat(2, 50, 1000),
            'created_by' => $admin->id,
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'canceled', 'completed', 'not_started_yet']),
        ];
                
    }
}
