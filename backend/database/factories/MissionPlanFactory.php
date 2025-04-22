<?php

namespace Database\Factories;

use App\Models\MissionPlan;
use App\Models\Mission;
use App\Models\Driver;
use Illuminate\Database\Eloquent\Factories\Factory;

class MissionPlanFactory extends Factory
{
    protected $model = MissionPlan::class;

    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('+1 days', '+10 days');
        $endDate = (clone $startDate)->modify('+1 day');

        return [
            'missionID' => Mission::inRandomOrder()->value('missionID') ?? Mission::factory()->create()->missionID,
            'driverID' => Driver::inRandomOrder()->value('driverID') ?? Driver::factory()->create()->driverID,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'mission_type' => $this->faker->randomElement(['short', 'long']),
            'complexity' => $this->faker->randomElement(['simple', 'medium', 'complex']),
        ];
    }
}
