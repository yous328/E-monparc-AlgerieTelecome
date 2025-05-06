<?php

namespace Database\Factories;

use App\Models\VehicleTechnicalStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleTechnicalStatusFactory extends Factory
{
    protected $model = VehicleTechnicalStatus::class;

    public function definition(): array
    {
        return [
            'vidange_km' => $this->faker->numberBetween(1000, 15000),
            'batterie_km' => $this->faker->numberBetween(1000, 15000),
            'bougies_km' => $this->faker->numberBetween(1000, 15000),
            'gaz_clim_km' => $this->faker->numberBetween(1000, 15000),
            'chaine_km' => $this->faker->numberBetween(1000, 15000),
            'panneaux_km' => $this->faker->numberBetween(1000, 15000),
            'plaquettes_frein_km' => $this->faker->numberBetween(1000, 15000),
            'filtres_km' => $this->faker->numberBetween(1000, 15000),
        ];
    }
}