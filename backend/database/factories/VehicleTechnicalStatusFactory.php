<?php

namespace Database\Factories;

use App\Models\VehicleTechnicalStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleTechnicalStatusFactory extends Factory
{
    protected $model = VehicleTechnicalStatus::class;

    public function definition(): array
    {
        $generate = fn() => [
            'done_at' => $this->faker->numberBetween(100000, 200000),
            'next_due' => $this->faker->numberBetween(200001, 300000), // ensure next_due > done_at
        ];

        $vidange = $generate();
        $batterie = $generate();
        $bougies = $generate();
        $gaz_clim = $generate();
        $chaine = $generate();
        $pneus = $generate();
        $filtres = $generate();
        $plaquettes_frein = $generate();

        return [
            'vidange_done_at' => $vidange['done_at'],
            'vidange_next_due' => $vidange['next_due'],

            'batterie_done_at' => $batterie['done_at'],
            'batterie_next_due' => $batterie['next_due'],

            'bougies_done_at' => $bougies['done_at'],
            'bougies_next_due' => $bougies['next_due'],

            'gaz_clim_done_at' => $gaz_clim['done_at'],
            'gaz_clim_next_due' => $gaz_clim['next_due'],

            'chaine_done_at' => $chaine['done_at'],
            'chaine_next_due' => $chaine['next_due'],

            'pneus_done_at' => $pneus['done_at'],
            'pneus_next_due' => $pneus['next_due'],

            'filtres_done_at' => $filtres['done_at'],
            'filtres_next_due' => $filtres['next_due'],

            'plaquettes_frein_done_at' => $plaquettes_frein['done_at'],
            'plaquettes_frein_next_due' => $plaquettes_frein['next_due'],
        ];
    }
}
