<?php

namespace Database\Factories;

use App\Models\VehicleInsurance;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleInsuranceFactory extends Factory
{
    protected $model = VehicleInsurance::class;

    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 year', 'now');
        $endDate = (clone $startDate)->modify('+1 year');

        return [
            'insurance_start_date' => $startDate,
            'insurance_end_date' => $endDate,
            'insurance_type' => $this->faker->randomElement([
                'ResponsabiliteCivileAutomobile(RCA)',
                'TousRisques',
                'DommagesCollisions',
            ]),
        ];
    }
}
