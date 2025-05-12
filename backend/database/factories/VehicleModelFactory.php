<?php

namespace Database\Factories;

use App\Models\VehicleModel;
use App\Models\VehicleBrand;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleModelFactory extends Factory
{
    protected $model = VehicleModel::class;

    public function definition(): array
    {
        return [
            'model_name' => $this->faker->randomElement([
                'Clio', 'Megane', 'Kangoo', 'Talisman', 'Duster', 'Logan', 'Sandero'
            ]),
            'brandID' => VehicleBrand::factory(),
        ];
    }
}
