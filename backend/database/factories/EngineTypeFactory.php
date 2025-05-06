<?php

namespace Database\Factories;

use App\Models\EngineType;
use App\Models\VehicleBrand;
use App\Models\FuelType;
use Illuminate\Database\Eloquent\Factories\Factory;

class EngineTypeFactory extends Factory
{
    protected $model = EngineType::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'capacity' => $this->faker->randomElement(['1.0L', '1.6L', '2.0L', '2.5L', 'Hybrid']),
            'brandID' => VehicleBrand::inRandomOrder()->value('brandID') ?? VehicleBrand::factory(),
            'fuelTypeID' => FuelType::inRandomOrder()->value('fuelTypeID') ?? FuelType::factory(),
        ];
    }
}
