<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\VehicleUsageHistory;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleUsageHistoryFactory extends Factory
{
    protected $model = VehicleUsageHistory::class;

    public function definition(): array
    {
        return [
            'vehicleID' => Vehicle::factory(),
            'driver_name' => Driver::factory(),
            'driver_phone' => $this->faker->phoneNumber,
            'usage_date' => $this->faker->date(),
            'route' => $this->faker->city() . ' → ' . $this->faker->city(),
            'distance_km' => $this->faker->randomFloat(1, 10, 500),
            'average_speed' => $this->faker->randomFloat(1, 30, 120),
        ];
    }
}
