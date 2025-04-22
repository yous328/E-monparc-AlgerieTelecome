<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\VehicleMaintenance;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleMaintenanceFactory extends Factory
{
    protected $model = VehicleMaintenance::class;

    public function definition(): array
    {
        return [
            'vehicleID' => Vehicle::inRandomOrder()->value('vehicleID'),

            'oil_km' => $this->faker->numberBetween(5000, 10000),
            'oil_date' => $this->faker->date(),
            'oil_interval' => 10000,

            'battery_km' => $this->faker->numberBetween(10000, 15000),
            'battery_date' => $this->faker->date(),
            'battery_interval' => 15000,

            'spark_plugs_km' => $this->faker->numberBetween(15000, 20000),
            'spark_plugs_date' => $this->faker->date(),
            'spark_plugs_interval' => 20000,

            'tires_km' => $this->faker->numberBetween(20000, 25000),
            'tires_date' => $this->faker->date(),
            'tires_interval' => 25000,
        ];
    }
}
