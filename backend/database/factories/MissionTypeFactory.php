<?php

namespace Database\Factories;

use App\Models\MissionType;
use Illuminate\Database\Eloquent\Factories\Factory;

class MissionTypeFactory extends Factory
{
    protected $model = MissionType::class;

    public function definition(): array
    {
        return [
            'category' => $this->faker->randomElement(['Internal', 'External']),
            'complexity' => $this->faker->randomElement(['Heavy', 'Light']),
        ];
    }
}
