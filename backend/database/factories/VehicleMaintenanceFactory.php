<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\VehicleMaintenance;
use App\Models\MaintenanceType;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleMaintenanceFactory extends Factory
{
    protected $model = VehicleMaintenance::class;

    public function definition(): array
    {
        return [
            'vehicleID' => Vehicle::inRandomOrder()->value('vehicleID'),
            'maintenanceTypeID' => MaintenanceType::inRandomOrder()->value('maintenanceTypeID') ?? MaintenanceType::factory()->create()->maintenanceTypeID,
            'kilometrage' => $this->faker->numberBetween(1000, 100000),
            'date' => $this->faker->date(),
            'interval_km' => $this->faker->numberBetween(5000, 20000),
        ];
    }
}
