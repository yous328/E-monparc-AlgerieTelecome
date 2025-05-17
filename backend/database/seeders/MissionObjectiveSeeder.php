<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MissionObjective;

class MissionObjectiveSeeder extends Seeder
{
    public function run(): void
    {
        $objectives = [
            'Maintenance Réseau',
            'Visite Client',
            'Livraison d\'Équipement',
            'Support Technique',
            'Inspection de Site',
            'Formation',
            'Réparation',
            'Installation',
            'Mise à jour',
            'Audit'
        ];

        foreach ($objectives as $objective) {
            MissionObjective::create([
                'name' => $objective
            ]);
        }
    }
} 