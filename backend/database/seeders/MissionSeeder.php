<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mission;
use App\Models\MissionType;

class MissionSeeder extends Seeder
{
    public function run(): void
    {
        $total = 50;

        // Step 1: Seed all required combinations of MissionType
        $requiredTypes = [
            ['Internal', 'Heavy'],
            ['Internal', 'Light'],
            ['External', 'Heavy'],
            ['External', 'Light'],
        ];

        foreach ($requiredTypes as [$category, $complexity]) {
            MissionType::firstOrCreate([
                'category' => $category,
                'complexity' => $complexity,
            ]);
        }

        $missionTypes = MissionType::all();

        // Step 2: Define distribution targets
        $categoryMap = array_merge(
            array_fill(0, round($total * 0.45), 'Internal'),
            array_fill(0, round($total * 0.32), 'External')
        );

        $complexityMap = array_merge(
            array_fill(0, round($total * 0.28), 'Heavy'),
            array_fill(0, round($total * 0.87), 'Light')
        );

        while (count($categoryMap) < $total) {
            $categoryMap[] = fake()->randomElement(['Internal', 'External']);
        }

        while (count($complexityMap) < $total) {
            $complexityMap[] = fake()->randomElement(['Heavy', 'Light']);
        }

        shuffle($categoryMap);
        shuffle($complexityMap);

        foreach (range(0, $total - 1) as $i) {
            $category = $categoryMap[$i];
            $complexity = $complexityMap[$i];

            $type = $missionTypes->firstWhere(function ($t) use ($category, $complexity) {
                return $t->category === $category && $t->complexity === $complexity;
            });

            if ($type) {
                Mission::factory()->create([
                    'missionTypeID' => $type->missionTypeID,
                ]);
            }
        }
    }
}
